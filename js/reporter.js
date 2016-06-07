(function ($) {

    var loadUserData = function (callback) {
        var userData = { is_authenticated : false, session_id : null };

        if (window.Intelli) {
            if (Intelli.User.getSessionId()) {
                userData.is_authenticated = Intelli.User.getIsAuthenticated();
                userData.session_id = Intelli.User.getSessionId();
            } else {
                var data = {};
                data = Intelli.User.prepareData(data);

                var uri = Intelli.User.getGreetingWidgetUri();
                uri = Intelli.User.addCallbackToUri(uri);

                $.getJSON(uri, data, function(result){
                    if (result.success) {
                        userData.is_authenticated = result.is_authenticated;
                        userData.session_id = result.session_id;
                    }

                    if ($.isFunction(callback)) {
                        callback(userData);
                    }
                });

                return;
            }
        }

        if ($.isFunction(callback)) {
            callback(userData);
        }
    }

    var placeholderSupport = ('placeholder' in document.createElement('input'));

    var userData, imagesCount, imagesContainer, postForm, postFormAction, fileField, postFrame, postFrameName;

    var applyPlaceholdersSupport = function () {
        $('input, textarea', $('.b-become-reporter')).each(function () {
            if ($(this).attr('placeholder')) {
                $(this).data('placeholder', $(this).attr('placeholder'));
                $(this).val($(this).data('placeholder'));
                $(this).removeAttr('placeholder');
                $(this).focus(function () {
                    if ($(this).val() == $(this).data('placeholder')) {
                        $(this).val('');
                    }
                });
                $(this).blur(function () {
                    if ($(this).val() == '') {
                        $(this).val($(this).data('placeholder'));
                    }
                });
            }
        });
    }

    var initUploader = function () {
        imagesContainer = $('.b-become-reporter .stuff-images-container');
        imagesCount     = imagesContainer.find('> .stuff-image').length;

        if (imagesContainer.length) {
            postForm        = imagesContainer.parents('form:first');
            postFormAction  = $(postForm).attr('action');
            fileField       = $('.b-become-reporter input[type="file"]');

            postForm.after('<iframe id="stuff-image-iframe" name="stuff-image-iframe" style="display: none; width: 0px; height: 0px;" noframeborder="noframeborder" src="javascript:void(0)"></iframe>');

            postFrame     = $('#stuff-image-iframe');
            postFrameName = postFrame.attr('name');
        }
    }

    var updateTitlePhoto = function () {
        var assetId = "",
            images  = imagesContainer.find('.stuff-image');

        if (images.length) {
            assetId = $(images.get(0)).find('input[name*="image"]').val();
        }

        $('.b-become-reporter .stuff-photo-container input[name*="assetId"]').val(assetId);
    }

    var addImage = function (result) {
        if (result.success) {
            imagesContainer.append($('#tmpl-stuff-image').tmpl($.extend({ index : imagesCount++ }, result.data)));
            updateTitlePhoto();
        }
    }

    var updateIndexes = function () {
        imagesContainer.find('.stuff-image').each(function (index, row) {
            $(row).find('input').each(function () {
                $(this).attr('name', $(this).attr('name').replace(/\[\d+\]/, '[' + index + ']'))
            });
            $(row).find('input[name*="position"]').val(index + 1);
        });
    }

    var showStuffForm = function (result) {
        if (result.success) {
            $('.b-become-reporter').replaceWith($.parseHTML(result.data));
            initUploader();
            if (!placeholderSupport) {
                applyPlaceholdersSupport();
            }
        }
    }

    var loadStuffForm = function () {
        $.ajax({
            url      : '/reporter/stuff/show',
            type     : 'POST',
            dataType : 'json',
            data     : userData,
            success  : showStuffForm
        });
    }

    var initStuffForm = function () {
        if ($('.b-become-reporter-ajax').length) {
            if ($.cookie('auth-logged')) {
                loadUserData(function (data) {
                    userData = data;
                    showStuffForm({
                        success : true,
                        data    : $('.b-become-reporter-ajax').data('send-form')['send-form']
                    });
                    $('.b-become-reporter').find('[name="stuff[intelli_user_content_authoring][user_session_id]"]').val(userData.session_id);
                });
            } else {
                $('.b-become-reporter-ajax a.auth-link').each(function () {
                    $(this).attr('href', $(this).attr('href') + "?returnUrl=" + encodeURIComponent(document.location.href));
                });
            }
        }
    }

    $('body').on('click', '.b-become-reporter .stuff-image-remove', function () {
        $(this).parents('.stuff-image:first').remove();
        updateIndexes();
        updateTitlePhoto();

        return false;
    });

    $('body').on('change', '.b-become-reporter input[type="file"]', function () {
        fileField.parent().addClass('stuff-image-loading');
        postForm.attr('action', '/reporter/stuff/upload');
        postForm.attr('target', postFrameName);
        postForm.attr('enctype', 'multipart/form-data');

        postForm.get(0).submit();

        postFrame.load(function () {
            postForm.removeAttr('target');
            postForm.removeAttr('enctype');
            postForm.attr('action', postFormAction);
            postFrame.unbind();
            fileField.parent().removeClass('stuff-image-loading');

            var result = { success: false };

            try {
                result = $.parseJSON(postFrame.contents().find('body').text());
            } catch (e) {};

            addImage(result);
        });
    });

    $('body').on('submit', '.b-become-reporter form', function (e) {
        if ($(this).attr('action') == postFormAction) {

            $('.b-become-reporter').addClass('b-become-reporter-sending');

            $.ajax({
                url      : '/reporter/stuff/send',
                type     : 'POST',
                dataType : 'json',
                data     : $(this).formToArray(),
                success  : showStuffForm
            });

            e.preventDefault();

            return false;

        }
    });

    $('body').on('click', '.b-become-reporter .send-more', function (e) {
        $('.b-become-reporter').addClass('b-become-reporter-sending');

        loadStuffForm();

        return false;

    });

    var ui = $.fn.frontendUi,
        isAuthInitialized = false;

    $(document).bind('auth-init', function() {
        isAuthInitialized = true;
    });

    ui.bind('init', function (event, context, isRuntime) {
        if (isRuntime) {
            isAuthInitialized ? initStuffForm() : $(document).bind('auth-init', initStuffForm);
        }
    });

})(jQuery);