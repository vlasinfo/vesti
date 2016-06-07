;(function($){
	
	$.metadata.setType("attr", "intelli:dynamic");

    function renderDynamicFeatures(context) {

        var features = {},
            elements = [];

        $(context).find(".content-entity").each(function(){
            var self = $(this),
                classes = self.attr("class").split(" "),
                metadata, contentType, contentId,
                feature;

            $.each(classes, function(idx, cls){
                if (cls.indexOf("content-entity:") === 0) {
                    metadata = cls.split(":");
                    if (metadata.length == 3) {
                        contentType = metadata[1];
                        contentId = metadata[2];

                        var nestedEntitiesFeatures = $(".content-entity .dynamic-feature", self),
                            directFeatures = $(".dynamic-feature", self).not(nestedEntitiesFeatures);

                        directFeatures.each(function(){
                            metadata = $(this).metadata();

                            if (metadata.type && metadata.type !== "edit") {
                                    feature = metadata.type;

                                    metadata.id = $(this).uniqueId().attr('id');
                                    metadata.contentType = contentType;
                                    metadata.contentId = contentId;

                                    if (!features[feature]) {
                                        features[feature] = [];
                                    }

                                    // Cleanup internal parameters
                                    delete metadata.type, metadata.method;

                                    elements.push(this);
                                    features[feature].push(metadata);
                                }
                        });
                    }
                }
            });
        });

        if (!$.isEmptyObject(features)) {
            $.ajax({
                url: App.baseUrl + "/content/dynamic/render-dynamic-features",
                type: "GET",
                timeout: 60 * 1000,
                dataType: "json",
                data: { data : features },
                success: function (response) {
                    if (response.success) {
                        var metadata, html;

                        $.each(elements, function(idx, element) {
                            element = $(element);
                            metadata = element.metadata();
                            html = response.data[element.attr('id')] || "";

                            if (html.length > 0) {
                                if (metadata.successCls) {
                                    if (metadata.successClsSelector) {
                                        element.closest(metadata.successClsSelector).addClass(metadata.successCls);
                                    } else {
                                        element.addClass(metadata.successCls);
                                    }
                                }
                                if (metadata.method == "append") {
                                    element.append(html);
                                } else {
                                    element.replaceWith(html);
                                }
                            } else {
                                if (metadata.method == "append") {
                                    if (metadata.removeEmpty) {
                                        if (metadata.removeSelector) {
                                            element.closest(metadata.removeSelector).remove();
                                        }
                                        element.remove();
                                    } else {
                                        if (metadata.emptyCls) {
                                            if (metadata.emptyClsSelector) {
                                                element.closest(metadata.emptyClsSelector).addClass(metadata.emptyCls);
                                            } else {
                                                element.addClass(metadata.emptyCls);
                                            }
                                        }
                                        if (metadata.emptyHtml) {
                                            element.append(metadata.emptyHtml);
                                        }
                                    }
                                } else {
                                    if (metadata.removeSelector) {
                                        element.closest(metadata.removeSelector).remove();
                                    }
                                    element.remove();
                                }
                            }
                        });
                    }
                }
            });
        }

    }

    function renderEditLink(context) {
        if ($.cookie('STYPE') == 'admin') {

            var ePlace = $(context).find('.dynamic-feature.dynamic-feature-edit');

            if (ePlace.length) {
                var contentEntity = ePlace.closest('.content-entity'),
                    classes = contentEntity.attr("class").split(" "),
                    metadata, contentType, contentId;

                $.each(classes, function(idx, cls){
                    if (cls.indexOf("content-entity:") === 0) {
                        metadata = cls.split(":");
                        if (metadata.length == 3) {
                            contentType = metadata[1];
                            contentId = metadata[2];

                            var data = { contentId : contentId, contentType: contentType };

                            $.ajax({
                                type          : 'GET',
                                url           : location.protocol + '//' + 'editor.' + (App && App.baseHost ? App.baseHost : 'vesti-ukr.com') + (location.port ? ':' + location.port : '') + "/content/dynamic/edit",
                                timeout       : 60 * 1000,
                                jsonpCallback : 'callback',
                                contentType   : "application/json",
                                dataType      : 'jsonp',
                                data          : data,
                                success       : function (response) {
                                    if (response.success) {
                                        var html = response.data || "";
                                        ePlace.append(html);
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    }

    var ui = $.fn.frontendUi;

    ui.bind('init', function (event, context, isRuntime) {
        renderDynamicFeatures(context);

        if (isRuntime) {
            renderEditLink(context);
        }

    });

})(jQuery);

