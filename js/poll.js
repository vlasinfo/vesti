;(function ($) {

    var pollVoteFormSubmitHandler = function (event) {
        event.preventDefault();

        var form = $(this);
        var limit = $(this).attr('answers:limit');
        var selectedCount = form.find("input[name^='answer']:checked").length;
        var options = form.data('options');

        if (selectedCount > 0 && limit > 0 && selectedCount > limit) {
            form.closest(".b-poll-container").find('.text-vote').after('<div class="poll-error">' + 'Максимальное количество ответов: ' + limit + '</div>');
            return false;
        }

        if (selectedCount > 0 && !form.attr("disabled")) {
            var action  = form.attr('action'),
                pollId  = /polls\/(\d+)/.exec(action)[1];

            form.attr("disabled", true);
            form.css("opacity", 0.5);
            form.closest(".b-poll-container").find('.poll-error').remove();

            $.ajax(
                '/poll/poll/vote?content_id=' + pollId + '&' + form.serialize(),
                {
                    dataType : 'html',
                    type     : 'POST',
                    success  : function (response) {
                        if (response.indexOf('poll-error') != -1) {
                            form.closest(".b-poll-container").find('.text-vote').after(response);
                        } else {
                            form.closest(".b-poll-container").replaceWith(response);
                            getVotes(options, false);
                        }
                    },
                    complete  : function () {
                        form.attr("disabled", false);
                        form.css("opacity", 1);
                    }
                }
            );

            return false;
        }

        form.find(".error").show(true);

        return false;
    };

    var pollVoteCommentFormSubmitHandler = function () {
        var form = $(this);

        if ($.trim(form.find("textarea[name='comment']").val()).length > 0) {
            return true;
        }

        form.find(".b-form-messages").show(true);
        form.find("textarea[name='comment']").closest(".b-form-row").addClass("b-form-row-invalid");

        return false;
    };

    var bindPollFormHandlers = function () {
        $(".b-vote form").unbind("submit").submit(pollVoteFormSubmitHandler);
        $(".b-poll-vote-comment-form").unbind("submit").submit(pollVoteCommentFormSubmitHandler);
    };

    var getVotePending = false;
    var getVoteCallbacks = [];

    var getVotes = function (options, callback) {
        var cookieName = options["cookie"];
        var cookieData = $.cookie(cookieName);

        if ((callback !== false) && (typeof cookieData != "undefined")) {
            callback(cookieData.split(","));
        } else {
            $.isFunction(callback) && getVoteCallbacks.push(callback);

            if (getVotePending) return;
            getVotePending = true;

            $.ajax({
                url: options["restore_url"],
                dataType: 'json',
                success: function (response) {
                    response || (response = {});

                    var votes, expires;

                    if (response.success) {
                        votes = response.data["hashes"];
                        expires = new Date(response.data["expires"] * 1000);
                    } else {
                        votes = [];
                        expires = new Date();
                        expires.setDate(expires.getDate() + 365);
                    }

                    $.cookie(cookieName, votes.join(","), { expires: expires, path: "/", domain: App.cookieDomain });

                    $.each(getVoteCallbacks, function (idx, callback) {
                        callback(votes);
                    });

                    getVoteCallbacks = [];
                    getVotePending = false;
                }
            });
        }
    };

    var rotatePolls = function(polls, votes, callback) {
        var found = false, url;

        $.each(polls, function (idx, poll) {
            if (!~$.inArray(poll["hash"], votes)) {
                url = poll["view_url"];
                found = true;
                return false;
            }
        });

        if (!found) {
            url = polls[0]["result_url"];
        }

        $.ajax({
            url: url,
            dataType: 'html',
            success: callback
        });
    };

    var ui = $.fn.frontendUi;

    ui.bind('init', function (event, context, isRuntime) {
        bindPollFormHandlers();

        $(context).find("input.b-poll-rotator-ajax, input.b-poll-ajax").each(function () {
            var self = $(this), options;

            try {
                options = JSON.parse(self.val());
            } catch (e) {
            }

            if (!options) {
                $(self).remove();
                return;
            }

            var pollsData = options["polls"];

            if (!pollsData || pollsData.length == 0) {
                return;
            }

            getVotes(options, function (votes) {
                rotatePolls(pollsData, votes, function (html) {
                    var block = $(html),
                        form  = block.find('form'),
                        data  = $.extend(
                            true, {
                                cookie      : "poll_votes",
                                restore_url : "/poll/poll/get-vote-hashes"
                            },
                            options
                        );

                    delete data['polls'];
                    $(self).replaceWith(block);
                    form.data('options', data);
                    bindPollFormHandlers();
                });
            });
        });
    });

    $(function () {
        $('body').on("click", ".b-vote form input[name='answer']", function () {
            $(this).closest(".b-vote form").find(".error").hide(true);
        });
    });

})(jQuery);