;(function ($) {
    var visited = [];
    var buffer  = [];

    function isVisible(element) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(element).offset().top;
        var elemBottom = elemTop + $(element).height();

        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop)) || ((elemBottom >= docViewBottom) && (elemTop <= docViewTop));
    }

    function checkVisibility(element, id) {
        if (!~visited.indexOf(id) && isVisible(element)) {
            visited.push(id);
            buffer.push(id);
        }
    }

    function trackImpressions() {

        if (!buffer.length) return;

        var ids = buffer;
        buffer = []; // Cleanup buffer

        var request = jQuery.ajaxSettings.xhr();
        var params = "id[]=" + ids.join("&id[]=");

        request.open("GET", App.baseUrl + "/statistics/counter/ad?" + params, false);
        request.setRequestHeader("Connection", "close");
        request.send();
    }

    $.fn.updateHTML = function (htmlText, replaceElement, onComplete) {
        var scripts = [],
            openTag, closeTag,
            source, script,
            defaultWrite = document.write;

        while (openTag = /<script[^>]*>/i.exec(htmlText)) {
            closeTag = /<\/script>/i.exec(htmlText);
            source   = /src="(.+?)"/i.exec(openTag[0]);
            script   = {
                innerHTML : htmlText.slice(openTag.index + openTag[0].length, closeTag.index)
            };

            if (source) {
                script.src = source[1];
            }

            if (script.innerHTML) {
                script.innerHTML = script.innerHTML.replace(/^[\s\n\r\t]*<!\-\-\/\/\-\-><!\[CDATA\[\/\/><!\-\-/, '');
                script.innerHTML = script.innerHTML.replace(/\/\/\-\-><!]]>[\s\n\r\t]*$/, '');
                script.innerHTML = script.innerHTML.replace(/^[\s\n\r\t]*<!\-\-/, '');
                script.innerHTML = script.innerHTML.replace(/(\/\/)?\-\->[\s\n\r\t]*$/, '');
            }

            if (openTag[0].indexOf("IN/Share") == -1) {
                scripts.push(script);
                htmlText = htmlText.slice(0, openTag.index) + htmlText.slice(closeTag.index + closeTag[0].length);
            } else {
                htmlText = htmlText.slice(0, openTag.index) + '{{LINKEDIN}}' + htmlText.slice(closeTag.index + closeTag[0].length);
            }
        }

        htmlText = htmlText.replace('{{LINKEDIN}}', '<script type="IN/Share" data-counter="top"></script>');

        function load(n) {
            document.write = function () {
                var html      = "",
                    container = $(scripts[n].container),
                    wrapper   = container.find('*[class^="b-ad"]');

                if (wrapper.length) {
                    container = wrapper;
                }

                for (var i = 0; i < arguments.length; i++) {
                    html += (arguments[i] || "").toString();
                }

                if (html) {
                    container.prepend(html);
                }
            }

            if (!scripts[n]) {
                document.write = defaultWrite;
                $.isFunction(onComplete) && onComplete();

                return;
            }

            var s = scripts[n];

            if (s.src) {
                $.getScript(s.src, function () {
                    load(n+1);
                });
            } else {
                try {
                    $.globalEval(s.innerHTML);
                    if (s.innerHTML.indexOf("twitter") != -1) {
                        if (window.twttr) {
                            twttr.widgets.load();
                        } else {
                            var twttrScript = document.getElementById('twitter-wjs');

                            if (twttrScript) {
                                twttrScript.onload = function () {
                                    twttr.widgets.load();
                                }
                            }
                        }
                    }
                } catch (e) {}

                load(n+1);
            }
        }

        var dom  = $(htmlText);

        if (replaceElement) {
            $(this).replaceWith(dom);
        } else {
            $(this).html(dom);
        }

        dom.find('.b-flash-container').each(function () {
            var me = $(this);

            if (!swfobject.hasFlashPlayerVersion('9.0.115')) {
                me.replaceWith('<div class="b-flash-download">Обновите проигрыватель Adobe Flash Player, чтобы просмотреть это содержимое. <br/> <a href="http://get.adobe.com/flashplayer/">Загрузить с сайта Adobe</a>.</div>');
            } else {
                var url   = $(this).attr('swf:link'),
                    width  = me.attr('swf:width'),
                    height = me.attr('swf:height');

                swfobject.embedSWF(
                    me.attr('swf:movie'),
                    me.attr('id'),
                    width,
                    height,
                    '9.0.115',
                    null,
                    $.parseJSON(me.attr('swf:vars')),
                    { wmode : 'opaque' },
                    {},
                    function(event) {
                        var target = $(event.ref);

                        if (event.success && url) {
                            target.before('<a class="b-flash-link" style="left: ' + target.offset().left + 'px; width: ' + width + 'px; height: ' + height + 'px;" href="' + url + '"></a>');
                        }
                    }
                );
            }
        });

        for (var i = 0; i < scripts.length; i++) {
            if (!scripts[i].container) {
                scripts[i].container = dom;
            }
        }

        load(0);

        return dom;
    }

    $.fn.adRotate = function (onComplete) {
        var adRotated = $(this);

        function doAdRotate(num) {

            if (num >= adRotated.length) {
                $.isFunction(onComplete) && onComplete();

                return;
            }

            var el = adRotated.eq(num);

            var ids = $(el).data('ids') || [];

            var banners = [];

            for (var i in ids) {
                var id = ids[i].id;
                var weight = ids[i].weight;

                if (!weight) {
                    weight = 1;
                }

                for (var j=0; j < 10 * weight; j++) {
                    banners.push(id);
                }
            }

            var n = Math.floor(Math.random() * banners.length);

            id = banners[n];

            var url = '/adv/' + id;

            $.ajax({
                url: url,
                type: "GET",
                timeout: 60 * 1000,
                success: function (response) {
                    var dom = $(el).updateHTML(response, true, function() {
                        $(window).trigger('ad_loaded',[dom]);
                        doAdRotate(num+1);
                    });
                }
            });
        }

        doAdRotate(0);
    }

    $(function () {
        $(window).on('ad_loaded', function(event, dom){
            $("[data-type=ad]", dom).each(function(){
                var $self = $(this);
                var id = $self.data("id");

                $(window).on("scroll resize", function(){
                    checkVisibility($self, id)
                });

                checkVisibility($self, id);
            });
        });

        window.setInterval(trackImpressions, 2000);
        window.onbeforeunload = trackImpressions;

        trackImpressions();
    });

})(jQuery);