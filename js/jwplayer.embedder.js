(function ($) {
    $.fn.attrList = function (pattern) {
        var map = {},
            attributes = this[0].attributes,
            aLength = attributes.length;

        for (var a = 0; a < aLength; a++) {
            var name = attributes[a].name,
                matched = true;

            if (pattern) {
                if (!(pattern instanceof RegExp)) {
                    pattern = new RegExp("^" + pattern);
                }
                matched = pattern.test(name);
            }

            if (matched) {
                map[name] = attributes[a].value;
            }
        }

        return map;
    };


    var playersCounter = 0,
        basePath       = typeof App === "undefined" ? "" : App.basePath;

    $.fn.embedJwPlayer = function () {
        if ($(this).hasClass('b-media-container')) {
            var params = {
                    flashplayer     : basePath + "/static/lib/jwplayer/jwplayer.flash.swf",
                    html5player     : basePath + "/static/lib/jwplayer/jwplayer.html5.js",
                    provider        : "video",
                    "player": {
                        "modes": {
                            "linear": {
                                "controls": { "manage": false }
                            }
                        }
                    }
                },
                nodeParams = $(this).attrList(/^jw\:/),
                param, value, сssClass;

            for (param in nodeParams) {
                if ((param  || "").indexOf("jw:") === 0) {
                    value = nodeParams[param];

                    try {
                        value = JSON.parse(value);
                    }
                    catch (e) {
                    }

                    if (param.toLowerCase() == 'jw:cssclass') {
                        сssClass = value;
                    } else {
                        params[param.replace(/^jw\:/, '')] = value;
                    }
                }
            }

            $(this).attr("id", "media-embed-" + (++playersCounter));

            var playerId = $(this).attr('id'),
                isAudio  = $(this).hasClass('b-audio-body');

            jwplayer(playerId).setup(params);
            jwplayer(playerId).onReady(function () {
                var player    = this;
                var container = (
                        function(element, fallback) {
                            return element.length
                                ? element
                                : fallback
                        }
                    )(
                        $('#' + player.id + '_wrapper'),
                        $(player.container)
                    );

                if (сssClass) {
                    container
                        .find('object, embed, iframe')
                        .add(container)
                        .addClass(сssClass)
                        .css({
                            width: '',
                            height: '',
                            position: ''
                        });
                }

                if (isAudio) {
                    var volumeId  = player.id + '_volume_h',
                        volumeTop = (Math.floor((player.config.height -6) / 2) + 1),
                        volumeBg  = player.config.skin.replace(/\/[\w\d]+\.xml$/, '/controlbar/timeBuffer.png'),
                        volumeFg  = player.config.skin.replace(/\/[\w\d]+\.xml$/, '/controlbar/timeProgress.png'),
                        volume    = $(
                            '<div id="' + volumeId + '" style="top: ' + volumeTop + 'px; background: url(\'' + volumeBg + '\') scroll repeat-x 0 -9px; cursor: pointer; position: absolute; width: 50px; height: 6px; z-index: 10; right: 22px;">' +
                                '<div style="width: ' + player.getVolume() + '%; background: url(\'' + volumeFg + '\') scroll repeat-x 0 -9px; height: 6px; cursor: pointer;"></div>' +
                            '</div>'
                        );

                    container.find(".jwlogo").css('z-index', 9);
                    container.append(volume);

                    volume.click(function (e) {
                        var level = 2 * Math.abs(e.clientX - volume.offset().left);

                        volume.find('> div').css('width', level + '%');
                        player.setVolume(level);
                    });

                    player.onMute(function (e) {
                        if (e.mute) {
                            volume.find('> div').css('width', 0);
                        } else {
                            volume.find('> div').css('width', player.getVolume() + '%');
                        }
                    });
                }
            });
        }
    };

})(jQuery);