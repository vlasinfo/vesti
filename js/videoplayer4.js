/**
 * this is script for video player lib
 */

/* head.js v0.99 */
(function(f,w){function m(){}function g(a,b){if(a){"object"===typeof a&&(a=[].slice.call(a));for(var c=0,d=a.length;c<d;c++)b.call(a,a[c],c)}}function v(a,b){var c=Object.prototype.toString.call(b).slice(8,-1);return b!==w&&null!==b&&c===a}function k(a){return v("Function",a)}function h(a){a=a||m;a._done||(a(),a._done=1)}function n(a){var b={};if("object"===typeof a)for(var c in a)a[c]&&(b={name:c,url:a[c]});else b=a.split("/"),b=b[b.length-1],c=b.indexOf("?"),b={name:-1!==c?b.substring(0,c):b,url:a};
    return(a=p[b.name])&&a.url===b.url?a:p[b.name]=b}function q(a){var a=a||p,b;for(b in a)if(a.hasOwnProperty(b)&&a[b].state!==r)return!1;return!0}function s(a,b){b=b||m;a.state===r?b():a.state===x?d.ready(a.name,b):a.state===y?a.onpreload.push(function(){s(a,b)}):(a.state=x,z(a,function(){a.state=r;b();g(l[a.name],function(a){h(a)});j&&q()&&g(l.ALL,function(a){h(a)})}))}function z(a,b){var b=b||m,c;/\.css[^\.]*$/.test(a.url)?(c=e.createElement("link"),c.type="text/"+(a.type||"css"),c.rel="stylesheet",
    c.href=a.url):(c=e.createElement("script"),c.type="text/"+(a.type||"javascript"),c.src=a.url);c.onload=c.onreadystatechange=function(a){a=a||f.event;if("load"===a.type||/loaded|complete/.test(c.readyState)&&(!e.documentMode||9>e.documentMode))c.onload=c.onreadystatechange=c.onerror=null,b()};c.onerror=function(){c.onload=c.onreadystatechange=c.onerror=null;b()};c.async=!1;c.defer=!1;var d=e.head||e.getElementsByTagName("head")[0];d.insertBefore(c,d.lastChild)}function i(){e.body?j||(j=!0,g(A,function(a){h(a)})):
    (f.clearTimeout(d.readyTimeout),d.readyTimeout=f.setTimeout(i,50))}function t(){e.addEventListener?(e.removeEventListener("DOMContentLoaded",t,!1),i()):"complete"===e.readyState&&(e.detachEvent("onreadystatechange",t),i())}var e=f.document,A=[],B=[],l={},p={},E="async"in e.createElement("script")||"MozAppearance"in e.documentElement.style||f.opera,C,j,D=f.head_conf&&f.head_conf.head||"head",d=f[D]=f[D]||function(){d.ready.apply(null,arguments)},y=1,x=3,r=4;d.load=E?function(){var a=arguments,b=a[a.length-
1],c={};k(b)||(b=null);g(a,function(d,e){d!==b&&(d=n(d),c[d.name]=d,s(d,b&&e===a.length-2?function(){q(c)&&h(b)}:null))});return d}:function(){var a=arguments,b=[].slice.call(a,1),c=b[0];if(!C)return B.push(function(){d.load.apply(null,a)}),d;c?(g(b,function(a){if(!k(a)){var b=n(a);b.state===w&&(b.state=y,b.onpreload=[],z({url:b.url,type:"cache"},function(){b.state=2;g(b.onpreload,function(a){a.call()})}))}}),s(n(a[0]),k(c)?c:function(){d.load.apply(null,b)})):s(n(a[0]));return d};d.js=d.load;d.test=
    function(a,b,c,e){a="object"===typeof a?a:{test:a,success:b?v("Array",b)?b:[b]:!1,failure:c?v("Array",c)?c:[c]:!1,callback:e||m};(b=!!a.test)&&a.success?(a.success.push(a.callback),d.load.apply(null,a.success)):!b&&a.failure?(a.failure.push(a.callback),d.load.apply(null,a.failure)):e();return d};d.ready=function(a,b){if(a===e)return j?h(b):A.push(b),d;k(a)&&(b=a,a="ALL");if("string"!==typeof a||!k(b))return d;var c=p[a];if(c&&c.state===r||"ALL"===a&&q()&&j)return h(b),d;(c=l[a])?c.push(b):l[a]=[b];
    return d};d.ready(e,function(){q()&&g(l.ALL,function(a){h(a)});d.feature&&d.feature("domloaded",!0)});if("complete"===e.readyState)i();else if(e.addEventListener)e.addEventListener("DOMContentLoaded",t,!1),f.addEventListener("load",i,!1);else{e.attachEvent("onreadystatechange",t);f.attachEvent("onload",i);var u=!1;try{u=null==f.frameElement&&e.documentElement}catch(F){}u&&u.doScroll&&function b(){if(!j){try{u.doScroll("left")}catch(c){f.clearTimeout(d.readyTimeout);d.readyTimeout=f.setTimeout(b,50);
    return}i()}}()}setTimeout(function(){C=!0;g(B,function(b){b()})},300)})(window);

if(typeof console == "undefined") {
    var console = console || {};
    console.log = console.log || function(a, b){
        };
    console.warn = console.warn || function(a, b){
        };
    console.error = console.error || function(a, b){
        };
    console.info = console.info || function(a, b){
        };
    console.debug = console.debug || console.log;
}

window["idCoreOnReady"] = function(id){
    window["IDCore"]["onFlashReady"](id);
};

window["tnsOnStatResult"] = function(e){
    console.log("result:" + e.result + " pid:" + e.pid + " e.id: " + e.id);
    if(e.result != "success") {
    }
};

var TUtility = TUtility || {};
TUtility.random = function(){
    var d = new Date().valueOf().toString();
    return parseInt(d.substr(d.length - 8, d.length))
        + Math.round(Math.random() * Math.pow(10, 9));
};
TUtility.getUrl = function(host, sslhost, path){
    var url = "";
    if(location.protocol == "https:"){
        url = location.protocol + "//" + sslhost;
    }else{
        url = "http://" + host;
    }
    return url + path;
};
TUtility.delegate = function(fn, scope){
    return function(){
        return fn.apply((scope || window), Array.prototype.slice
            .call(arguments));
    };
};
TUtility.time = function(){
    return new Date().getTime();
};
TUtility.cors = function(errorHandler){
    var cors;
    try {
        if(window.XDomainRequest) {
            cors = new window.XDomainRequest();
            if(errorHandler){
                cors.onerror = function(){
                    errorHandler.call(null, cors);
                };
            }
        } else {
            cors = new XMLHttpRequest();
            if(errorHandler){
                cors.onreadystatechange = function (e) {
                    if (cors.readyState == 4) {
                        if(cors.status == 200){
                        }else{
                            errorHandler.call(null, cors);
                        }
                    }
                };
            }
        }
    } catch(e) {
        console.error("cors:" + e);
    }
    return cors;
};
TUtility.isMobile = function(){
    return /Mobi|Mini|Symbian|SAMSUNG|Nokia|BlackBerry|Series|Bada|SymbOS|PLAYSTATION/g
        .test(navigator.userAgent.toString());
};

TUtility.escape = function(str){
    return encodeURIComponent(str);
};
TUtility.addParam = function(url, param, value){
    var newurl = url;
    var delimiter = "&";
    if(newurl.indexOf("?") == -1) {
        delimiter = "?";
    }
    if(param == 'vw' || param == 'vh') {
        value = escape(value);
    }
    newurl += delimiter + param + "=" + value;
    return newurl;
};
TUtility.createUUID = function(){
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for( var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[12] = "4";
    s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);
    return s.join("");
};

TUtility.setCookie = function(name, value, expires, path, domain, secure){
    document.cookie = name + "=" + escape(value)
        + ((expires) ? "; expires=" + expires : "")
        + ((path) ? "; path=" + path : "")
        + ((domain) ? "; domain=" + domain : "")
        + ((secure) ? "; secure" : "");
};

TUtility.getCookie = function(name){
    var cookie = " " + document.cookie;
    var search = " " + name + "=";
    var setStr = null;
    var offset = 0;
    var end = 0;
    if(cookie.length > 0) {
        offset = cookie.indexOf(search);
        if(offset != -1) {
            offset += search.length;
            end = cookie.indexOf(";", offset)
            if(end == -1) {
                end = cookie.length;
            }
            setStr = unescape(cookie.substring(offset, end));
        }
    }
    return (setStr);
};

TUtility.hasLocalStorage = function(){
    try {
        return "localStorage" in window && window["localStorage"] !== null;
    } catch(e) {
        return false;
    }
}();

TUtility.hasFlash = function(){
    if(typeof navigator.plugins == "undefined" || navigator.plugins.length == 0) {
        try {
            return !!(new ActiveXObject("ShockwaveFlash.ShockwaveFlash"));
        } catch(er) {
            return false;
        }
    } else {
        return navigator.plugins["Shockwave Flash"];
    }
}();

TUtility.isIE = function(){
    return /MSIE/.test(navigator.userAgent);
}();

TUtility.isIE7 = function(){
    return /MSIE\ 7/.test(navigator.userAgent);
}();

TUtility.deleteCookie = function(name){
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};
TUtility.getBody = function(){
    var body;
    try {
        body = document.getElementsByTagName("body")[0];
    } catch(e) {
    }
    if(typeof body == "undefined" || body == null) {
        if(typeof document.body != "undefined") {
            body = document.body;
            if(!body) {
                // console.warn("body is not availible");
            }
        }
    }
    return body;
};
TUtility.isCookieEnabled = function(){
    var cookieEnabled = (navigator.cookieEnabled) ? true : false;

    if(typeof navigator.cookieEnabled == "undefined" && !cookieEnabled) {
        document.cookie = "testcookie";
        cookieEnabled = (document.cookie.indexOf("testcookie") != -1) ? true
            : false;
        TUtility.deleteCookie("testcookie");
    }
    return (cookieEnabled);
}();
TUtility.isNotEmpty = function(str){
    return undefined !== str && null != str && str.replace(/\s/g, "") != "";
};
TUtility.getPath = function(str, root){
    var path = str;
    if(path.toLowerCase().indexOf("/") == 0) {
        if(root) {
            path = root + path;
        } else {
            var location = window.location.protocol.toString() + "//"
                + window.location.hostname.toString()
                + window.location.port.toString();
            if(location != "") {
                path = location + path;
            }
        }
    }
    return TUtility.escape(path);
};
TUtility.round = function(n){
    return Math.floor(n * 100) / 100;
};
TUtility.makeArray = function(items){
    try {
        return Array.prototype.slice.call(items);
    } catch(ex) {
        var i = 0, len = items.length, result = Array(len);
        while(i < len) {
            result[i] = items[i];
            i++;
        }
        return result;

    }
};

TUtility.idScope = function(){
    var scope = "l";
    if(TUtility.hasFlash){
        scope = "b";
    }else if(window.postMessage && (TUtility.hasLocalStorage  || TUtility.isCookieEnabled)){
        scope = "d";
    }else if(TUtility.hasLocalStorage == false && TUtility.isCookieEnabled == false){
        scope = "g";
    }
    try {
        if(window.chrome){
            for(var i in navigator.plugins){
                if(/PepperFlashPlayer/gi.test(navigator.plugins[i].filename)){
                    scope = "c";
                    break;
                }
            }
        }
    }catch(e){
        console.warn("chrome : PepperFlashPlayer - has some error");
    }
    return scope;
}();

window["IDCore"] = window["IDCore"] || (function(){

        var isReady = false;
        var protocol = "http:";

        if(location.protocol == "https:"){
            protocol = location.protocol;
        }else{
            protocol = "http:";
        }

        var host = window.addonCMeter && addonCMeter.host || protocol + "//source.mmi.bemobile.ua";
        var version = "1.83-r68654";
        var short_version = version.replace(/-r\d+$/, "");
        var juke_host = 'juke.mmi.bemobile.ua/bug/pic.gif';

        try {
            if(CONFIG && CONFIG.juke_host){
                juke_host = CONFIG.juke_host;
            }
        }catch(e){
// console.warn(e);
        }

        var cookie = {};
        cookie["id"] = "vplayer_user_id";
        cookie["wasInitialized"] = "tns_was_initialized";
        cookie["wasMigrated"] = "tns_was_migrated";
        cookie["flag"] = "flag";
        var wasInitialized = false;
        var holder = "div_holder";
        var buffer = new Array();

        var uid = "";
        var refs = new Array();

        function cds(){
            head.js(host + "/id-core/" + version + "/cds.js", function(){
                try {
                    var remoteStorage = new CrossDomainStorage(host, "/id-core/"
                        + version + "/id.html");
                    remoteStorage["requestValue"](cookie["id"], function(key, id){
                        onLocalReady(id);
                    });
                } catch(e) {
                    console.error("cds.js:" + e);
                    uid = TUtility.createUUID();
                    onLocalReady(uid);
                }
            });
        }

        function setMigrate(){
            var expirationDate = new Date();
            expirationDate.setFullYear(expirationDate.getFullYear() + 1);
            TUtility.setCookie(cookie["wasMigrated"], true, expirationDate
                .toGMTString(), "/", "");
            // when everything is okay
            onLocalReady(uid);
        }

        function migrate(){
            if(TUtility.getCookie(cookie["wasMigrated"])) {
                return false;
            }
            if(TUtility.isCookieEnabled) {
                var initialized = TUtility.getCookie(cookie["wasInitialized"]);
                if(initialized) {
                    uid = TUtility.getCookie(cookie["id"]);

                    if(TUtility.hasLocalStorage) {
                        head.js(host + "/id-core/" + version + "/cds.js",
                            function(){
                                try {
                                    var remoteStorage = new CrossDomainStorage(
                                        host, "/id-core/" + version
                                        + "/id.html");
                                    remoteStorage["requestValue"](cookie["id"]
                                        + ":" + uid, function(key, id){
                                        if(id != uid) {
                                            console.error("id: " + id + " != "
                                                + uid);
                                        } else {
                                            setMigrate();
                                        }
                                    });
                                } catch(e) {
                                    console.error("migrate:" + e);
                                }
                            });
                        TUtility.deleteCookie(cookie["id"]);
                        TUtility.deleteCookie(cookie["wasInitialized"]);
                    } else if(TUtility.hasFlash) {
                        window["tns_uid"] = uid;
                        head.js(host + "/id-core/" + version + "/flash.js",
                            function(){
                                setMigrate();
                                // delete window["tns_uid"];
                            });
                    }
                    return true;
                }
            }
            return false;
        }

        function init(){
            wasInitialized = true;
            if(migrate()) {
                return;
            }
            if(TUtility.hasLocalStorage) {
                uid = localStorage.getItem(cookie["id"]);
                if(uid) {
                    onLocalReady(uid);
                } else {
                    if(window.postMessage && !window.JSON && window.localStorage) {
                        head.js(host + "/json2.min.js", function(){
                            if(TUtility.getBody()) {
                                cds();
                            } else {
                                head.ready(function(){
                                    cds();
                                });
                            }
                        });
                    } else if(window.postMessage && window.JSON
                        && window.localStorage) {
                        if(TUtility.getBody()) {
                            cds();
                        } else {
                            head.ready(function(){
                                cds();
                            });
                        }
                    } else {
                        onLocalReady(TUtility.createUUID());
                    }
                }
            } else {
                if(TUtility.hasFlash) {
                    if(TUtility.getBody()) {
                        head.js(host + "/id-core/" + version + "/flash.js");
                    } else {
                        head.ready(function(){
                            head.js(host + "/id-core/" + version + "/flash.js");
                        });
                    }
                } else {
                    uid = TUtility.getCookie(cookie["id"]);
                    if(!uid) {
                        uid = TUtility.createUUID();
                    }
                    onLocalReady(uid);
                }
            }
        }

        function flushOnReady(){
            var i;
            for(i in buffer) {
                if(buffer.hasOwnProperty(i)) {
                    var url = buffer[i]["url"];
                    var params = buffer[i]["params"];
                    var time = buffer[i]["time"];
                    var type = buffer[i]["type"];
                    var onError = buffer[i]["onError"];

                    if(/^POST$/ig.test(type)) {
                        sendPost(url, params, time, onError);
                    } else {
                        sendGet(url, params, time, type, onError);
                    }
                }
            }
            buffer = Array();
            var ref;
            for(ref in refs) {
                if(refs.hasOwnProperty(ref)) {
                    refs[ref].call(this, uid);
                }
            }
            refs = new Array();
        }

        function onLocalReady(id){
            saveId(id);
            isReady = true;
            flushOnReady();
            if(TUtility.hasLocalStorage){
                if(!localStorage.getItem(cookie["flag"])) {
                    (new Image).src = protocol + "//" + juke_host + "?uid=" + id + "&time=" + new Date().valueOf();
                    localStorage.setItem(cookie["flag"], "true");
                }
            } else if(TUtility.isCookieEnabled) {
                if(!TUtility.getCookie(cookie["flag"])){
                    var expirationDate = new Date();
                    expirationDate.setFullYear(expirationDate.getFullYear() + 1);
                    TUtility.setCookie(cookie["flag"], "true", expirationDate.toGMTString(), "/", "");
                    (new Image).src = protocol + "//" + juke_host + "?uid=" + id + "&time=" + new Date().valueOf();
                }
            }
        }

        function saveId(id){
            uid = id;
            if(TUtility.hasLocalStorage) {
                localStorage.setItem(cookie["id"], id);
            } else if(TUtility.isCookieEnabled) {
                var expirationDate = new Date();
                expirationDate.setFullYear(expirationDate.getFullYear() + 1);

                TUtility.setCookie(cookie["id"], id, expirationDate.toGMTString(),
                    "/", "");
                TUtility.setCookie(cookie["wasInitialized"], true, expirationDate
                    .toGMTString(), "/", "");
            }
        }

        function addParams(url, params){
            var i, key;
            if(params instanceof Array) {
                for(i in params) {
                    url = TUtility.addParam(url, params[i]["key"],
                        params[i]["value"]);
                }
            } else {
                for(key in params) {
                    url = TUtility.addParam(url, key, params[key]);
                }
            }
            return url;
        }

        function onFlashReady(id){
            try {
                var div = document.getElementById(holder);
                div.parentNode.removeChild(div);
            } catch(e) {

            }
            swfobjectlite = null;
            onLocalReady(id);
        }

        function getVersion(){
            return short_version;
        }

        function sendPost(url, params, time, onError){
            try {
                var cors = TUtility.cors(onError);

                cors.open("POST", url, true);

                if(!params) {
                    params = {};
                }
                if(params instanceof Array) {
                    params.push({
                        "key" : "cookie",
                        "value" : uid
                    });
                    params.push({
                        "key" : "time",
                        "value" : time ? time : new Date().valueOf()
                    });
                } else {
                    params["cookie"] = uid;
                    params["time"] = time ? time : new Date().valueOf();
                }

                if(TUtility.isIE) {
                    cors.contentType = "text/plain";
                } else {
                    cors.setRequestHeader("Content-type",
                        "application/x-www-form-urlencoded;charset=UTF-8");
                }

                var postParams = addParams("?", params).replace(/^\?/, "");

                cors.send(postParams);
            }catch(e){
                console.error(e);
            }
        }

        function sendGet(url, params, time, type, onError){
            if(!params) {
                params = {};
            }
            url = TUtility.addParam(url, "cookie", uid);
            url = TUtility
                .addParam(url, "time", time ? time : new Date().valueOf());

            url = addParams(url, params);

            try {
                if((type && type == "JSONP") || window.opera || TUtility.isIE7) {
                    var script = document.createElement("script");
                    script.setAttribute("src", url);
                    document.getElementsByTagName("head")[0].appendChild(script);
                } else {
                    var cors = TUtility.cors(onError);

                    cors.open("GET", url, true);

                    if(TUtility.isIE == false) {
                        cors.setRequestHeader("Accept", "application/json");
                    }

                    cors.send();
                }
            } catch(e) {
                console.error(e);
            }
        }

        return {
            "init" : function(){
                if(wasInitialized == false) {
                    if(TUtility.isCookieEnabled && !TUtility.getCookie(cookie["wasMigrated"])){
                        if(TUtility.getBody()){
                            init();
                        }else{
                            head.ready(function(){
                                init();
                            });
                        }
                    }else{
                        init();
                    }
                } else if(isReady) {
                    flushOnReady();
                }
            },
            "send" : function(url, params, type, onError){
                if(!params){
                    params = {};
                }
                params["vt"] = TUtility.idScope;
                var now = new Date().valueOf();
                if(isReady) {
                    if(/^POST$/ig.test(type)) {
                        sendPost(url, params, now, onError);
                    } else {
                        sendGet(url, params, now, type, onError);
                    }
                } else {
                    buffer.push({
                        "url" : url,
                        "params" : params,
                        "type" : type,
                        "time" : now,
                        "onError": onError
                    });
                }
            },
            "onFlashReady" : function(id){
                onFlashReady(id);
            },
            "addOnReadyListener" : function(ref){
                refs.push(ref);
            },
            "isReady" : function(){
                return isReady;
            },
            "getId" : function(){
                return uid;
            },
            "version" : function(){
                return getVersion();
            }
        };
    })();
window["IDCore"]["init"]();

window["playerOnResult"] = function(data){
    if(data && data.status == "1") {
        try {
            if(TUtility.isNotEmpty(data.link) && TUtility.isNotEmpty(data.hint)) {
                var player = document.getElementById(data.pid);
                player.onAnswer(data.link, data.hint);
            }
        } catch(e) {
            console.warn("can't send status ANSWER to player", e);
        }
    }
};

window["tnsOnLibResult"] = function(data){
    if(data && data.result != "success") {
        console.error("tnsOnLibResult: error" + data);
    }
};

var TnsStatuses = TnsStatuses || {};
TnsStatuses["READY"] = "READY";
TnsStatuses["PLAY"] = "PLAY";
TnsStatuses["PAUSE"] = "PAUSE";
TnsStatuses["BUFFER"] = "BUFFER";
TnsStatuses["BUFFERFULL"] = "BUFFER_FULL";
TnsStatuses["COMPLETE"] = "COMPLETE";
TnsStatuses["STOP"] = "STOP";
TnsStatuses["SEEK"] = "SEEK";
TnsStatuses["ERROR"] = "ERROR";
TnsStatuses["POSTER"] = "POSTER";
TnsStatuses["ONLINE"] = "ONLINE";
TnsStatuses["CLOSE"] = "CLOSE";
TnsStatuses["FACEBOOK"] = "FACEBOOK";
TnsStatuses["ANSWER"] = "ANSWER";
TnsStatuses["DELPASS"] = "DELPASS";

TnsStatuses["ADS_SKIP"] = "ADS_SKIP";
TnsStatuses["ADS_EMPTY"] = "ADS_EMPTY";
TnsStatuses["ADS_CLICK"] = "ADS_CLICK";
TnsStatuses["ADS_DELPAS"] = "ADS_DELPAS";
TnsStatuses["ADS_SNDOFF"] = "ADS_SNDOFF";
TnsStatuses["ADS_PASSED"] = "ADS_PASSED";
TnsStatuses["ADS_ERROR"] = "ADS_ERROR";
TnsStatuses["ADS_CLOSE"] = "ADS_CLOSE";

TnsStatuses["ADS_PLAY"] = "ADS_PLAY";
TnsStatuses["ADS_PAUSE"] = "ADS_PAUSE";
TnsStatuses["ADS_COMPLETE"] = "ADS_COMPLETE";

TnsStatuses["ADM_PLAY"] = "ADM_PLAY";
TnsStatuses["ADM_PAUSE"] = "ADM_PAUSE";
TnsStatuses["ADM_COMPLETE"] = "ADM_COMPLETE";

TnsStatuses["ADF_PLAY"] = "ADF_PLAY";
TnsStatuses["ADF_PAUSE"] = "ADF_PAUSE";
TnsStatuses["ADF_COMPLETE"] = "ADF_COMPLETE";

TnsStatuses["ADI_PLAY"] = "ADI_PLAY";
TnsStatuses["ADI_PAUSE"] = "ADI_PAUSE";
TnsStatuses["ADI_COMPLETE"] = "ADI_COMPLETE";

TnsStatuses["ADS_FQ"] = "ADS_FQ";
TnsStatuses["ADS_SQ"] = "ADS_SQ";
TnsStatuses["ADS_TQ"] = "ADS_TQ";
TnsStatuses["ADS_5S"] = "ADS_5S";

var TimerEvent = function(type, timer){
    this.type = type;
    this.target = timer;
};
TimerEvent.TIMER = 'TimerEvent.TIMER';
TimerEvent.TIMER_COMPLETE = 'TimerEvent.TIMER_COMPLETE';

var Timer = function(delay, repeatCount){
    this.init(delay, repeatCount);
};
Timer.prototype = {
    init : function(delay, repeatCount){
        this.delay = delay;
        this.repeatCount = repeatCount || 0;

        this.interval = null;
        this.running = false;
        this.currentCount = 0;
        this.listeners = [];
    },
    addEventListener : function(type, listener){
        this.listeners[this.listeners.length] = {
            type : type,
            fn : listener
        };
    },
    removeEventListener : function(type, listener){
        for( var i in this.listeners) {
            if(this.listeners[i].type == type && String(this.listeners[i].fn) == String(listener.fn)) {
                this.listeners[i] = null;
            }
        }
    },
    reset : function(){
        this.stop(true);
    },
    start : function(){
        if(this.running) {
            return;
        }
        this.running = true;

        var self = this;
        this.interval = setInterval(function(){
            self.iterate();
        }, this.delay);
    },
    stop : function(clearCount){
        this.running = false;

        if(clearCount) {
            this.currentCount = 0;
        }
        if(this.interval) {
            clearInterval(this.interval);
        }
    },
    iterate : function(){
        this.currentCount++;
        if(!this.repeatCount || this.currentCount <= this.repeatCount) {
            this.dispatchEvent(TimerEvent.TIMER);
            if(this.currentCount == this.repeatCount) {
                this.dispatchEvent(TimerEvent.TIMER_COMPLETE);
            }
        } else {
            this.stop();
        }
    },
    dispatchEvent : function(type){
        for( var i in this.listeners) {
            if(this.listeners[i] && this.listeners[i].type == type) {
                this.listeners[i].fn(new TimerEvent(type, this));
            }
        }
    }
};

var TnsVideoStatistic = function(pre){
    var version = "1.123-r65527".replace(/-r\d+$/, "");
    var prefix = "L";
    var delimiter = "|";
    var NOT_INITIALAZED = -1;
    var TIMER_DELAY = 30000;
    var width = NOT_INITIALAZED;
    var height = NOT_INITIALAZED;
    var _type = {};
    var listeners = [];
    _type["ondemand"] = "d";
    _type["live"] = "o";
    _type["radio"] = "r";

    if(pre) {
        prefix = pre;
    }

    var statisticURL = TUtility.getUrl("vplayer.mmi.bemobile.ua", "sslvplayer.mmi.bemobile.ua", "/vplayer/VPlayerEntry");

    var timerOnline = new Timer(1000, Number.MAX_VALUE);
    timerOnline.addEventListener(TimerEvent.TIMER, incrementOnline);

    var timerAds5sec = new Timer(5000, 1);
    timerAds5sec.addEventListener(TimerEvent.TIMER_COMPLETE, onAds5sec);

    var timerAdsNotifications = new Timer(200, Number.MAX_VALUE);
    timerAdsNotifications.addEventListener(TimerEvent.TIMER, onTimerNotification);

    var timerDelpass = new Timer(5000, 1);
    timerDelpass.addEventListener(TimerEvent.TIMER_COMPLETE, onDelpass);

    var timerPlay = new Timer(1000, Number.MAX_VALUE);
    timerPlay.addEventListener(TimerEvent.TIMER, incrementPlay);

    var timerBuffer = new Timer(1000, Number.MAX_VALUE);
    timerBuffer.addEventListener(TimerEvent.TIMER, incrementBuffer);

    var duplicateBuffer = new Timer(TIMER_DELAY, 1);
    duplicateBuffer.addEventListener(TimerEvent.TIMER_COMPLETE, onDuplicate);
    var duplicateTimerError = new Timer(TIMER_DELAY, 1);
    duplicateTimerError.addEventListener(TimerEvent.TIMER_COMPLETE, onDuplicate);

    var duplicateBufferFull = new Timer(TIMER_DELAY, 1);
    duplicateBufferFull.addEventListener(TimerEvent.TIMER_COMPLETE, onDuplicate);

    var session_id = NOT_INITIALAZED;
    var file = NOT_INITIALAZED;
    var stream = NOT_INITIALAZED;
    //	 var pt = NOT_INITIALAZED;
    var pt = "d";	//  _type["ondemand"]
    var mediaId = NOT_INITIALAZED;

    var position = NOT_INITIALAZED;
    var onlineTime = NOT_INITIALAZED;
    var playTime = NOT_INITIALAZED;
    var bufferTime = NOT_INITIALAZED;
    var droppedFrames = NOT_INITIALAZED;
    var bandwidth = NOT_INITIALAZED;

    var periodForSendOnlineStatus = 60;
    var intervalOnline = NOT_INITIALAZED;
    var player_id = TUtility.random();
    var isPlaying = false;
    var wasInitialized = false;
    var advId = NOT_INITIALAZED;
    var wasDelpase = false;
    var _adsDuration = NOT_INITIALAZED;
    var adsTime = 0;
    var lastState = null;
    var ads = {};
    var owId = "";
    var emb_url = '';
    var adsTime = 0;

    function newStream(data){
        wasInitialized = true;

        session_id = TUtility.random();

        if(data["width"]) {
            width = data["width"];
        }
        if(data["height"]) {
            height = data["height"];
        }

        if(data["stream"]) {
            pt = _type["live"];
            stream = TUtility.escape(data["stream"]["url"]);
            try {
                mediaId = data["stream"]["media"][0]["url"];
            } catch(e) {
                console.warn("media url:" + e);
            }
        } else {
            if(data["file"]) {
                pt = _type["ondemand"];
            }
            file = TUtility.getPath(data["file"]);
        }

        if(data["type"] == "radio") {
            // pt = _type["radio"];
            pt = _type["live"];
        }

        if(data["owId"]) {
            owId = data["owId"];
        }

        if(data["emb_url"]) {
            emb_url = data["emb_url"];
        }

        if(intervalOnline > 0) {
            clearInterval(intervalOnline);
        }

        timerOnline.reset();
        timerBuffer.reset();
        timerPlay.reset();
        duplicateTimerError.reset();
        wasDelpase = false;
        timerDelpass.reset();
        timerOnline.start();

        position = NOT_INITIALAZED;
        playTime = NOT_INITIALAZED;
        bufferTime = NOT_INITIALAZED;
        droppedFrames = NOT_INITIALAZED;
        bandwidth = NOT_INITIALAZED;
        isPlaying = false;

        intervalOnline = setInterval(sendOnline, periodForSendOnlineStatus * 1000);

        if(data["poster"]) {
            sendStat(TnsStatuses["POSTER"], data);
        }
    }

    function onTimerNotification(){
        if(_adsDuration > 0) {
            adsTime += 0.2;
            if(adsTime >= _adsDuration / 4 && adsStatus == 0) {
                sendStat(TnsStatuses.ADS_FQ);
                adsStatus++;
            } else if(adsTime >= _adsDuration / 2 && adsStatus == 1) {
                sendStat(TnsStatuses.ADS_SQ);
                adsStatus++;
            } else if((adsTime >= _adsDuration * (3 / 4)) && adsStatus == 2) {
                sendStat(TnsStatuses.ADS_TQ);
                adsStatus++;
            }
        }
    }

    function onDuplicate(){
        // TODO trace it
    }

    function incrementOnline(){
        if(onlineTime == NOT_INITIALAZED) {
            onlineTime = 0;
        }
        ++onlineTime;
    }

    function onDelpass(){
        if(wasDelpase == false) {
            sendStat(TnsStatuses["DELPASS"]);
            wasDelpase = true;
        }
    }

    function onAds5sec(){
        sendStat(TnsStatuses["ADS_5S"]);
    }

    function incrementPlay(){
        if(playTime == NOT_INITIALAZED) {
            playTime = 0;
        }
        ++playTime;
    }

    function incrementBuffer(){
        if(bufferTime == NOT_INITIALAZED) {
            bufferTime = 0;
        }
        ++bufferTime;
    }

    function getVersion(){
        return prefix + version + "/" + window["IDCore"]["version"]();
    }

    function sendStat(state, data){
        try {
            // console.log(" --- try to sendStat:" + state + " data: %o", data);
        } catch(e) {
        }

        if(!state || !wasInitialized) {
            return;
        }

        state = state.toUpperCase();

        if(lastState == TnsStatuses["READY"] && status == TnsStatuses["READY"]) {
            return;
        }

        if(state == TnsStatuses["BUFFER"]) {
            timerBuffer.start();
            if(duplicateBuffer.running) {
                return;
            }
            duplicateBuffer.start();
        } else if(state == TnsStatuses["BUFFERFULL"]) {
            timerBuffer.stop();
            if(duplicateBufferFull.running) {
                return;
            }
            duplicateBufferFull.start();
        } else if(state == TnsStatuses["ERROR"]) {
            if(duplicateTimerError.running) {
                return;
            }
            duplicateTimerError.start();
        }

        if(state == TnsStatuses["PLAY"]) {
            isPlaying = true;
            timerPlay.start();
            timerBuffer.stop();
            timerDelpass.start();
        } else if(state == TnsStatuses["PAUSE"] || state == TnsStatuses["STOP"] || state == TnsStatuses["COMPLETE"]
            || state == TnsStatuses["ERROR"]) {
            isPlaying = false;
            timerPlay.stop();
            timerDelpass.stop();
            timerBuffer.stop();
        }

        var params = {
            "state" : state,
            "value" : TUtility.escape(window.location.href),
            "version" : getVersion(),
            "pt" : pt,
            "player_id" : player_id,
            "session_id" : session_id,
            "sw" : screen.width,
            "sh" : screen.height,
            "scd" : screen.colorDepth,
            "js" : "1",
            "isLib" : "true"
        };

        if(owId) {
            params["owId"] = owId;
        }

        if(emb_url) {
            params["emb_url"] = emb_url;
        }

        if(TUtility.isIE == false) {
            params["spd"] = screen.pixelDepth;
        }

        if(pt == _type["ondemand"]) {
            if(state == TnsStatuses["SEEK"]) {
                if(data["offset"]) {
                    params["position"] = data["offset"];
                }
            } else if(position >= 0) {
                params["position"] = position;
            }
        }

        try {
            if(window.addonCMeter) {
                params["plid"] = window.addonCMeter.PLID;
            }
        } catch(e) {
            console.warn("plid", e);
        }

        if(data) {
            if(data["pid"]) {
                params["pid"] = data["pid"];
            }
            if(undefined != data["show_q"]) {
                params["show_q"] = data["show_q"];
            }
        }

        if(state == TnsStatuses["FACEBOOK"] && data && data["fb"]) {
            params["fb"] = data["fb"];
        }

        if(state == TnsStatuses["ANSWER"] && data && data["link"]) {
            params["value"] = params["value"] + delimiter + data["link"];
        }

        if(pt == _type["live"] && stream != NOT_INITIALAZED) {
            params["server"] = stream;
            if(mediaId != NOT_INITIALAZED) {
                params["file"] = mediaId;
            }
        } else if(pt == _type["ondemand"]) {
            params["file"] = file;
        } else if(pt == _type["radio"] || pt == _type["live"]) {
            if(file && file != NOT_INITIALAZED) {
                params["file"] = file;
            }
        }

        if(droppedFrames != NOT_INITIALAZED) {
            params["droppedframes"] = droppedFrames;
        }
        if(width != NOT_INITIALAZED) {
            params["vw"] = width;
        }
        if(height != NOT_INITIALAZED) {
            params["vh"] = height;
        }
        if(bandwidth != NOT_INITIALAZED) {
            params["bandwidth"] = bandwidth;
        }
        if(playTime != NOT_INITIALAZED) {
            params["playtime"] = playTime;
        }
        if(bufferTime != NOT_INITIALAZED) {
            params["buffertime"] = bufferTime;
        }
        if(onlineTime != NOT_INITIALAZED) {
            params["onlinetime"] = onlineTime;
        }

        if(/^AD[S|M|F|I]_/.test(state)) {
            if(/^AD[S|M|F|I]_PLAY$/i.test(state)) {
                if(data["ads_duration"] && data["ads_duration"] > 0) {
                    _adsDuration = data["ads_duration"];
                    adsTime = 0;
                    adsStatus = 0;
                    timerAdsNotifications.start();
                    if(lastState == null || /^AD[S|M|F|I]_PAUSE$/i.test(lastState) == true) {
                        adsTime = 0;
                        adsStatus = 0;
                    }
                } else {
                    _adsDuration = NOT_INITIALAZED;
                    timerAdsNotifications.stop();
                }
                timerAds5sec.start();
            }
            if(/^AD[S|M|F|I]_PAUSE$/i.test(state)) {
                timerAds5sec.stop();
                if(_adsDuration > 0) {
                    timerAdsNotifications.stop();
                }
            }
            if(/^AD[S|M|F|I]_EMPTY/i.test(state) || /^AD[S|M|F|I]_PLAY$/i.test(state) || /^AD[S|M|F|I]_ERROR$/i.test(state)) {
                advId++;
            }
            params["adv_id"] = advId;
            if(/^AD[S|M|F|I]_(PLAY|ERROR)$/i.test(state)) {
                if(data["ads_url"]) {
                    ads["ads_url"] = TUtility.escape(data["ads_url"]);
                } else {
                    delete ads["ads_url"];
                }
                if(data["ads_click_url"]) {
                    ads["ads_click_url"] = TUtility.escape(data["ads_click_url"]);
                } else {
                    delete ads["ads_click_url"];
                }
                if(data["ads_video_url"]) {
                    ads["ads_video_url"] = TUtility.escape(data["ads_video_url"]);
                } else {
                    delete ads["ads_video_url"];
                }
            }

            if(ads["ads_url"]) {
                params["ads_url"] = ads["ads_url"];
            }

            if(ads["ads_video_url"]) {
                params["ads_video_url"] = ads["ads_video_url"];
            }

            if(ads["ads_click_url"]) {
                params["ads_click"] = ads["ads_click_url"];
            }

            if(/^AD[S|M|F|I]_COMPLETE$/.test(state) || /^ADS_SKIP$/.test(state)) {
                ads = {};
                _adsDuration = NOT_INITIALAZED;
                timerAds5sec.reset();
                timerAdsNotifications.reset();
                adsTime = 0;
            }
        }

        if(/ERROR$/i.test(state) && data && data["cause"]) {
            params["value"] = params["value"] + delimiter + data["cause"];
            if(/^AD[S|M|F|I]_ERROR$/i.test(state)) {
                ads = {};
                _adsDuration = NOT_INITIALAZED;
                timerAds5sec.reset();
                timerAdsNotifications.reset();
                adsTime = 0;
            }
        }

        if(state == TnsStatuses["POSTER"]) {
            // vars.value += "|"+ PathUtils.getPath(Config.instance.poster);
            if(data["poster"]) {
                params["play_value"] = TUtility.getPath(data["poster"]);
                params["filename"] = pt == _type["live"] ? params["server"] : TUtility.getPath(params["file"]);
            }
        }

        var type = (state == TnsStatuses["PLAY"]) ? "JSONP" : "GET";

        for( var i in listeners) {
            if(listeners.hasOwnProperty(i)) {
                listeners[i].call(undefined, state, data);
            }
        }

        lastState = state;
        window["IDCore"]["send"](statisticURL, params, type);
    }

    function confirmExit(){
        if(wasInitialized) {
            sendStat(TnsStatuses.CLOSE);
        }
    }

    function sendOnline(){
        if(isPlaying) {
            sendStat(TnsStatuses.ONLINE);
        }
    }

    if(TUtility.isMobile()) {
        window.addEventListener("pagehide", confirmExit);
    } else if(window.attachEvent) {
        window.attachEvent("onbeforeunload", confirmExit);
    } else if(window.addEventListener) {
        window.addEventListener("beforeunload", confirmExit, false);
    } else {
        window.onbeforeunload = confirmExit;
    }

    var o = {
        "newStream" : function(data, poster, isLive){
            if(typeof data == "object") {
                newStream(data);
            } else {
                /* backward compatibility */
                var d = {};
                if(isLive) {
                    d["stream"] = data;
                } else {
                    d["file"] = data;
                }
                if(poster) {
                    d["poster"] = poster;
                }
                newStream(d);
            }
        },
        "setPosition" : function(pos){
            position = TUtility.round(pos);
        },
        "getPosition" : function(){
            return position;
        },
        "setStreamMediaId" : function(media){
            mediaId = media;
        },
        "addDroppedFrame" : function(frames){
            if(droppedFrames == NOT_INITIALAZED) {
                droppedFrames = 0;
            }
            droppedFrames += Math.abs(frames);
        },
        "setBandwidth" : function(rate){
            bandwidth = rate;
        },
        "getStreamMediaId" : function(){
            return mediaId;
        },
        "version" : function(){
            return getVersion();
        },
        "getType" : function(){
            var result = {
                id : pt
            };
            if(pt == _type["ondemand"]) {
                result["info"] = "ondemand";
            } else if(pt == _type["live"]) {
                result["info"] = "live";
            } else if(pt == _type["radio"]) {
                result["info"] = "radio";
            } else {
                result["info"] = "other";
            }
            return result;
        },
        /* backward compatibility */
        "position" : function(pos){
            position = TUtility.round(pos);
        },
        "seek" : function(offset){
            sendStat(TnsStatuses["SEEK"], {
                "offset" : TUtility.round(offset)
            });
        },
        "sendStat" : function(state, data, ads_video_url, ads_click_url, ads_duration){
            var d = data;
            if(/^AD[S|M|F|I]_PLAY$/.test(state) && typeof data === 'string') {
                d = {};
                d["ads_url"] = data;
                if(ads_video_url) {
                    d["ads_video_url"] = ads_video_url;
                }
                if(ads_click_url) {
                    d["ads_click_url"] = ads_click_url;
                }
                if(ads_duration) {
                    d["ads_duration"] = ads_duration;
                }
            }
            sendStat(state, d);
        },
        "addListener" : function(fnc){
            if(typeof fnc === "function") {
                listeners.push(fnc);
            }
        },
        "getURL" : function(url){
            var script = document.createElement("script");
            script.setAttribute("src", url);
            document.getElementsByTagName("head")[0].appendChild(script);
        },
        "validate" : function(){
            return true;
        }
    };
    /* backward compatibility */
    o["init"] = function(){
        // wasInitialized = true;
        pt = _type["ondemand"];
        if(o["onReady"]) {
            o["onReady"].call(o, window["IDCore"]["getId"]());
        }
    };
    return o;
};

/*	SWFObject v2.2 <http://code.google.com/p/swfobject/>
 is released under the MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
var swfobject22 = swfobject22 || function(){var D="undefined",r="object",S="Shockwave Flash",W="ShockwaveFlash.ShockwaveFlash",q="application/x-shockwave-flash",R="SWFObjectExprInst",x="onreadystatechange",O=window,j=document,t=navigator,T=false,U=[h],o=[],N=[],I=[],l,Q,E,B,J=false,a=false,n,G,m=true,M=function(){var aa=typeof j.getElementById!=D&&typeof j.getElementsByTagName!=D&&typeof j.createElement!=D,ah=t.userAgent.toLowerCase(),Y=t.platform.toLowerCase(),ae=Y?/win/.test(Y):/win/.test(ah),ac=Y?/mac/.test(Y):/mac/.test(ah),af=/webkit/.test(ah)?parseFloat(ah.replace(/^.*webkit\/(\d+(\.\d+)?).*$/,"$1")):false,X=!+"\v1",ag=[0,0,0],ab=null;if(typeof t.plugins!=D&&typeof t.plugins[S]==r){ab=t.plugins[S].description;if(ab&&!(typeof t.mimeTypes!=D&&t.mimeTypes[q]&&!t.mimeTypes[q].enabledPlugin)){T=true;X=false;ab=ab.replace(/^.*\s+(\S+\s+\S+$)/,"$1");ag[0]=parseInt(ab.replace(/^(.*)\..*$/,"$1"),10);ag[1]=parseInt(ab.replace(/^.*\.(.*)\s.*$/,"$1"),10);ag[2]=/[a-zA-Z]/.test(ab)?parseInt(ab.replace(/^.*[a-zA-Z]+(.*)$/,"$1"),10):0}}else{if(typeof O.ActiveXObject!=D){try{var ad=new ActiveXObject(W);if(ad){ab=ad.GetVariable("$version");if(ab){X=true;ab=ab.split(" ")[1].split(",");ag=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}}catch(Z){}}}return{w3:aa,pv:ag,wk:af,ie:X,win:ae,mac:ac}}(),k=function(){if(!M.w3){return}if((typeof j.readyState!=D&&j.readyState=="complete")||(typeof j.readyState==D&&(j.getElementsByTagName("body")[0]||j.body))){f()}if(!J){if(typeof j.addEventListener!=D){j.addEventListener("DOMContentLoaded",f,false)}if(M.ie&&M.win){j.attachEvent(x,function(){if(j.readyState=="complete"){j.detachEvent(x,arguments.callee);f()}});if(O==top){(function(){if(J){return}try{j.documentElement.doScroll("left")}catch(X){setTimeout(arguments.callee,0);return}f()})()}}if(M.wk){(function(){if(J){return}if(!/loaded|complete/.test(j.readyState)){setTimeout(arguments.callee,0);return}f()})()}s(f)}}();function f(){if(J){return}try{var Z=j.getElementsByTagName("body")[0].appendChild(C("span"));Z.parentNode.removeChild(Z)}catch(aa){return}J=true;var X=U.length;for(var Y=0;Y<X;Y++){U[Y]()}}function K(X){if(J){X()}else{U[U.length]=X}}function s(Y){if(typeof O.addEventListener!=D){O.addEventListener("load",Y,false)}else{if(typeof j.addEventListener!=D){j.addEventListener("load",Y,false)}else{if(typeof O.attachEvent!=D){i(O,"onload",Y)}else{if(typeof O.onload=="function"){var X=O.onload;O.onload=function(){X();Y()}}else{O.onload=Y}}}}}function h(){if(T){V()}else{H()}}function V(){var X=j.getElementsByTagName("body")[0];var aa=C(r);aa.setAttribute("type",q);var Z=X.appendChild(aa);if(Z){var Y=0;(function(){if(typeof Z.GetVariable!=D){var ab=Z.GetVariable("$version");if(ab){ab=ab.split(" ")[1].split(",");M.pv=[parseInt(ab[0],10),parseInt(ab[1],10),parseInt(ab[2],10)]}}else{if(Y<10){Y++;setTimeout(arguments.callee,10);return}}X.removeChild(aa);Z=null;H()})()}else{H()}}function H(){var ag=o.length;if(ag>0){for(var af=0;af<ag;af++){var Y=o[af].id;var ab=o[af].callbackFn;var aa={success:false,id:Y};if(M.pv[0]>0){var ae=c(Y);if(ae){if(F(o[af].swfVersion)&&!(M.wk&&M.wk<312)){w(Y,true);if(ab){aa.success=true;aa.ref=z(Y);ab(aa)}}else{if(o[af].expressInstall&&A()){var ai={};ai.data=o[af].expressInstall;ai.width=ae.getAttribute("width")||"0";ai.height=ae.getAttribute("height")||"0";if(ae.getAttribute("class")){ai.styleclass=ae.getAttribute("class")}if(ae.getAttribute("align")){ai.align=ae.getAttribute("align")}var ah={};var X=ae.getElementsByTagName("param");var ac=X.length;for(var ad=0;ad<ac;ad++){if(X[ad].getAttribute("name").toLowerCase()!="movie"){ah[X[ad].getAttribute("name")]=X[ad].getAttribute("value")}}P(ai,ah,Y,ab)}else{p(ae);if(ab){ab(aa)}}}}}else{w(Y,true);if(ab){var Z=z(Y);if(Z&&typeof Z.SetVariable!=D){aa.success=true;aa.ref=Z}ab(aa)}}}}}function z(aa){var X=null;var Y=c(aa);if(Y&&Y.nodeName=="OBJECT"){if(typeof Y.SetVariable!=D){X=Y}else{var Z=Y.getElementsByTagName(r)[0];if(Z){X=Z}}}return X}function A(){return !a&&F("6.0.65")&&(M.win||M.mac)&&!(M.wk&&M.wk<312)}function P(aa,ab,X,Z){a=true;E=Z||null;B={success:false,id:X};var ae=c(X);if(ae){if(ae.nodeName=="OBJECT"){l=g(ae);Q=null}else{l=ae;Q=X}aa.id=R;if(typeof aa.width==D||(!/%$/.test(aa.width)&&parseInt(aa.width,10)<310)){aa.width="310"}if(typeof aa.height==D||(!/%$/.test(aa.height)&&parseInt(aa.height,10)<137)){aa.height="137"}j.title=j.title.slice(0,47)+" - Flash Player Installation";var ad=M.ie&&M.win?"ActiveX":"PlugIn",ac="MMredirectURL="+O.location.toString().replace(/&/g,"%26")+"&MMplayerType="+ad+"&MMdoctitle="+j.title;if(typeof ab.flashvars!=D){ab.flashvars+="&"+ac}else{ab.flashvars=ac}if(M.ie&&M.win&&ae.readyState!=4){var Y=C("div");X+="SWFObjectNew";Y.setAttribute("id",X);ae.parentNode.insertBefore(Y,ae);ae.style.display="none";(function(){if(ae.readyState==4){ae.parentNode.removeChild(ae)}else{setTimeout(arguments.callee,10)}})()}u(aa,ab,X)}}function p(Y){if(M.ie&&M.win&&Y.readyState!=4){var X=C("div");Y.parentNode.insertBefore(X,Y);X.parentNode.replaceChild(g(Y),X);Y.style.display="none";(function(){if(Y.readyState==4){Y.parentNode.removeChild(Y)}else{setTimeout(arguments.callee,10)}})()}else{Y.parentNode.replaceChild(g(Y),Y)}}function g(ab){var aa=C("div");if(M.win&&M.ie){aa.innerHTML=ab.innerHTML}else{var Y=ab.getElementsByTagName(r)[0];if(Y){var ad=Y.childNodes;if(ad){var X=ad.length;for(var Z=0;Z<X;Z++){if(!(ad[Z].nodeType==1&&ad[Z].nodeName=="PARAM")&&!(ad[Z].nodeType==8)){aa.appendChild(ad[Z].cloneNode(true))}}}}}return aa}function u(ai,ag,Y){var X,aa=c(Y);if(M.wk&&M.wk<312){return X}if(aa){if(typeof ai.id==D){ai.id=Y}if(M.ie&&M.win){var ah="";for(var ae in ai){if(ai[ae]!=Object.prototype[ae]){if(ae.toLowerCase()=="data"){ag.movie=ai[ae]}else{if(ae.toLowerCase()=="styleclass"){ah+=' class="'+ai[ae]+'"'}else{if(ae.toLowerCase()!="classid"){ah+=" "+ae+'="'+ai[ae]+'"'}}}}}var af="";for(var ad in ag){if(ag[ad]!=Object.prototype[ad]){af+='<param name="'+ad+'" value="'+ag[ad]+'" />'}}aa.outerHTML='<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"'+ah+">"+af+"</object>";N[N.length]=ai.id;X=c(ai.id)}else{var Z=C(r);Z.setAttribute("type",q);for(var ac in ai){if(ai[ac]!=Object.prototype[ac]){if(ac.toLowerCase()=="styleclass"){Z.setAttribute("class",ai[ac])}else{if(ac.toLowerCase()!="classid"){Z.setAttribute(ac,ai[ac])}}}}for(var ab in ag){if(ag[ab]!=Object.prototype[ab]&&ab.toLowerCase()!="movie"){e(Z,ab,ag[ab])}}aa.parentNode.replaceChild(Z,aa);X=Z}}return X}function e(Z,X,Y){var aa=C("param");aa.setAttribute("name",X);aa.setAttribute("value",Y);Z.appendChild(aa)}function y(Y){var X=c(Y);if(X&&X.nodeName=="OBJECT"){if(M.ie&&M.win){X.style.display="none";(function(){if(X.readyState==4){b(Y)}else{setTimeout(arguments.callee,10)}})()}else{X.parentNode.removeChild(X)}}}function b(Z){var Y=c(Z);if(Y){for(var X in Y){if(typeof Y[X]=="function"){Y[X]=null}}Y.parentNode.removeChild(Y)}}function c(Z){var X=null;try{X=j.getElementById(Z)}catch(Y){}return X}function C(X){return j.createElement(X)}function i(Z,X,Y){Z.attachEvent(X,Y);I[I.length]=[Z,X,Y]}function F(Z){var Y=M.pv,X=Z.split(".");X[0]=parseInt(X[0],10);X[1]=parseInt(X[1],10)||0;X[2]=parseInt(X[2],10)||0;return(Y[0]>X[0]||(Y[0]==X[0]&&Y[1]>X[1])||(Y[0]==X[0]&&Y[1]==X[1]&&Y[2]>=X[2]))?true:false}function v(ac,Y,ad,ab){if(M.ie&&M.mac){return}var aa=j.getElementsByTagName("head")[0];if(!aa){return}var X=(ad&&typeof ad=="string")?ad:"screen";if(ab){n=null;G=null}if(!n||G!=X){var Z=C("style");Z.setAttribute("type","text/css");Z.setAttribute("media",X);n=aa.appendChild(Z);if(M.ie&&M.win&&typeof j.styleSheets!=D&&j.styleSheets.length>0){n=j.styleSheets[j.styleSheets.length-1]}G=X}if(M.ie&&M.win){if(n&&typeof n.addRule==r){n.addRule(ac,Y)}}else{if(n&&typeof j.createTextNode!=D){n.appendChild(j.createTextNode(ac+" {"+Y+"}"))}}}function w(Z,X){if(!m){return}var Y=X?"visible":"hidden";if(J&&c(Z)){c(Z).style.visibility=Y}else{v("#"+Z,"visibility:"+Y)}}function L(Y){var Z=/[\\\"<>\.;]/;var X=Z.exec(Y)!=null;return X&&typeof encodeURIComponent!=D?encodeURIComponent(Y):Y}var d=function(){if(M.ie&&M.win){window.attachEvent("onunload",function(){var ac=I.length;for(var ab=0;ab<ac;ab++){I[ab][0].detachEvent(I[ab][1],I[ab][2])}var Z=N.length;for(var aa=0;aa<Z;aa++){y(N[aa])}for(var Y in M){M[Y]=null}M=null;for(var X in swfobject22){swfobject22[X]=null}swfobject22=null})}}();return{registerObject:function(ab,X,aa,Z){if(M.w3&&ab&&X){var Y={};Y.id=ab;Y.swfVersion=X;Y.expressInstall=aa;Y.callbackFn=Z;o[o.length]=Y;w(ab,false)}else{if(Z){Z({success:false,id:ab})}}},getObjectById:function(X){if(M.w3){return z(X)}},embedSWF:function(ab,ah,ae,ag,Y,aa,Z,ad,af,ac){var X={success:false,id:ah};if(M.w3&&!(M.wk&&M.wk<312)&&ab&&ah&&ae&&ag&&Y){w(ah,false);K(function(){ae+="";ag+="";var aj={};if(af&&typeof af===r){for(var al in af){aj[al]=af[al]}}aj.data=ab;aj.width=ae;aj.height=ag;var am={};if(ad&&typeof ad===r){for(var ak in ad){am[ak]=ad[ak]}}if(Z&&typeof Z===r){for(var ai in Z){if(typeof am.flashvars!=D){am.flashvars+="&"+ai+"="+Z[ai]}else{am.flashvars=ai+"="+Z[ai]}}}if(F(Y)){var an=u(aj,am,ah);if(aj.id==ah){w(ah,true)}X.success=true;X.ref=an}else{if(aa&&A()){aj.data=aa;P(aj,am,ah,ac);return}else{w(ah,true)}}if(ac){ac(X)}})}else{if(ac){ac(X)}}},switchOffAutoHideShow:function(){m=false},ua:M,getFlashPlayerVersion:function(){return{major:M.pv[0],minor:M.pv[1],release:M.pv[2]}},hasFlashPlayerVersion:F,createSWF:function(Z,Y,X){if(M.w3){return u(Z,Y,X)}else{return undefined}},showExpressInstall:function(Z,aa,X,Y){if(M.w3&&A()){P(Z,aa,X,Y)}},removeSWF:function(X){if(M.w3){y(X)}},createCSS:function(aa,Z,Y,X){if(M.w3){v(aa,Z,Y,X)}},addDomLoadEvent:K,addLoadEvent:s,getQueryParamValue:function(aa){var Z=j.location.search||j.location.hash;if(Z){if(/\?/.test(Z)){Z=Z.split("?")[1]}if(aa==null){return L(Z)}var Y=Z.split("&");for(var X=0;X<Y.length;X++){if(Y[X].substring(0,Y[X].indexOf("="))==aa){return L(Y[X].substring((Y[X].indexOf("=")+1)))}}}return""},expressInstallCallback:function(){if(a){var X=c(R);if(X&&l){X.parentNode.replaceChild(l,X);if(Q){w(Q,true);if(M.ie&&M.win){l.style.display="block"}}if(E){E(B)}}a=false}}}}();

TUtility.utf8ToBase64 = function(str){
    return window.btoa(unescape(encodeURIComponent(str)));
}

TUtility.base64ToUtf8 = function(str){
    return decodeURIComponent(escape(window.atob(str)));
}

TUtility.isMobileOrNoFlash = function(){
    return TUtility.isMobile() || swfobject22.hasFlashPlayerVersion("10.2") == false
}();

/**
 * this is script for video player
 */
var TnsVideoPlayer = function(settings){
    var version = "4.281-r68155";
    var flashMinVersion = "10.2";
    var host = location.protocol + "//source.mmi.bemobile.ua";
    var deployFolder = "/video";

    var html5id = "video_" + TUtility.random();

    if(settings.oem) {
        if(window.JSON && window.atob) {
            settings = JSON.parse(TUtility.base64ToUtf8(settings.oem));
        } else {
            console.error("can't parse oem");
            return;
        }
    }

    var id = settings.id;
    var isPaused = true;
    var videoId;
    var error = "something went wrong";
    var stat = new TnsVideoStatistic(version.replace(/-r\d+$/, "") + "/");
    var owId = settings.owId;
    // for save it
    var _settings = settings;
    var isStream = false;

    function init(){
        var newStream = {};
        newStream["width"] = settings.width;
        newStream["height"] = settings.height;
        newStream["owId"] = settings.owId;

        if(settings["emb_url"]) {
            newStream["emb_url"] = settings["emb_url"];
        }

        var attributes = {};
        attributes["id"] = settings.id;
        attributes["align"] = "middle";
        attributes["name"] = settings.id;

        var params = {};
        params["menu"] = "false";
        params["quality"] = "best";
        params["scale"] = "noscale";
        params["salign"] = "tl";
        params["devicefont"] = "true";
        params["swliveconnect"] = "true";
        params["allowfullscreen"] = "true";
        params["allowscriptaccess"] = "always";
        params["allownetworking"] = "all";
        params["wmode"] = TUtility.isNotEmpty(settings.wmode) ? settings.wmode : "gpu";
        params["bgcolor"] = TUtility.isNotEmpty(settings.bgcolor) ? settings.bgcolor : "#CCCCCC";

        var flashvars = {};
        flashvars["debug"] = true;

        if(TUtility.isNotEmpty(settings.video.telecast) && TUtility.isNotEmpty(settings.video.telecast.channel)
            && TUtility.isNotEmpty(settings.video.telecast.start) && TUtility.isNotEmpty(settings.video.telecast.end)) {
            // {channel : "inter.stream", start : 201309120910, end :
            // 201309121200}
            var xhr = TUtility.cors();
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4) {
                    var file = xhr.responseText;
                    if(TUtility.isNotEmpty(file) || file == "incorrect date range") {
                        console.warn("can't get telecast:" + setting.video.telecast);
                    } else {
                        try {
                            if(settings.video.flash.file) {
                                settings.video.flash.file = file;
                            } else {
                                if(!settings.video.flash) {
                                    settings.video.flash = {}
                                }
                                settings.video.flash.file = file;
                            }
                        } catch(e) {
                            console.warn("can't set: setting.video.flash.file");
                        }
                        try {
                            if(settings.video.html5.file) {
                                settings.video.html5.file = file;
                            } else {
                                if(!settings.video.html5) {
                                    settings.video.html5 = {};
                                }
                                settings.video.html5.file = file;
                            }
                        } catch(e) {
                            console.warn("can't set: setting.video.html5.file");
                        }
                    }
                }
            }
            var getTelecastUrl = TUtility
                .addParam('http://tv.macc.com.ua/tv?oper=get_telecast', "channel", settings.video.telecast.channel);
            getTelecastUrl = TUtility.addParam(getTelecastUrl, "date_begin", setting.video.telecast.start);
            getTelecastUrl = TUtility.addParam(getTelecastUrl, "date_end", setting.video.telecast.end);
            xhr.open('GET', getTelecastUrl, false);
            xhr.send();
        }

        if(settings.video.poster) {
            flashvars["poster"] = settings.video.poster;
            newStream["poster"] = settings.video.poster;
        }
        flashvars["autostart"] = settings.autostart;

        try {
            if(TUtility.isNotEmpty(settings.video.html5.file) || TUtility.isNotEmpty(settings.video.flash.file)) {
                if(TUtility.isMobileOrNoFlash) {
                    videoId = settings.video.html5.file;
                } else {
                    videoId = settings.video.flash.file;
                }
                flashvars["file"] = TUtility.escape(videoId);
                newStream["file"] = videoId;
            } else if(TUtility.isNotEmpty(settings.video.flash.stream.url)) {
                isStream = true;
                if(TUtility.isMobileOrNoFlash) {
                    videoId = settings.video.html5.stream;
                } else {
                    videoId = settings.video.flash.stream.media[0].url;
                }
                flashvars["streamer"] = TUtility.escape(settings.video.flash.stream.url);
                flashvars["mediacontent"] = TUtility.escape(JSON.stringify(settings.video.flash.stream.media));
                newStream["stream"] = settings.video.flash.stream;
            }

            stat.newStream(newStream);
        } catch(e) {
            videoId = error;
            console.error("TnsVideoPlayer.init: " + error + " e: " + e);
        }

        flashvars["pt"] = stat.getType()["id"];

        if(TUtility.isMobileOrNoFlash) {
            var player = document.getElementById(settings.id);
            player.innerHTML = "";
            if(player !== null) {
                var video = document.createElement("video");
                video.setAttribute("class", "none");
                video.setAttribute("width", settings.width + "");
                video.setAttribute("height", settings.height + "");
                video.setAttribute("id", html5id);
                video.setAttribute("preload", "auto");
                video.setAttribute("controls", "controls");
                if(settings.autostart) {
                    video.setAttribute("autoplay", "autoplay");
                }
                if(videoId != error) {
                    video.setAttribute("src", videoId);
                    if(TUtility.isNotEmpty(settings.video.poster)) {
                        video.setAttribute("poster", settings.video.poster);
                    }
                }
                player.appendChild(video);
                // video.load();
            }
            if(document.addEventListener && videoId != error) {
                document.addEventListener("DOMContentLoaded", html5init, true);
            }
        } else {
            if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
                if(settings.video.flash.ads) {
                    flashvars["ads"] = TUtility.escape(JSON.stringify(settings.video.flash.ads));
                }
                flashvars["version"] = version.replace(/-r\d+$/, "");
                swfobject22.embedSWF(host + deployFolder + "/player-" + version + ".swf", settings.id, settings.width, settings.height,
                    flashMinVersion, host + deployFolder + "/expressInstall.swf", flashvars, params, attributes, onLoaded);
            } else {
                swfobject22.addDomLoadEvent(function(){
                    swfobject22.showExpressInstall({
                        data : host + deployFolder + "/expressInstall.swf",
                        width : settings.width,
                        height : settings.height
                    }, {
                        menu : false
                    }, settings.id, function(){
                        alert("Express Install was cancelled");
                    });
                });
            }
        }

        if(settings.info && settings.info.fb) {
            stat.sendStat(TnsStatuses.FACEBOOK, {
                fb : settings.info.fb
            });
        }
    }

    function onLoaded(e){
        console.log("onLoaded:" + e);
        if(e.success) {
            e.ref.lib = stat;
            e.ref.generateEmbedCode = generateEmbedCode;
        } else {
            alert("onLoaded: error " + e);
        }
    }

    function html5init(e){
        var myvid = document.getElementById(html5id);

        if(navigator.userAgent.match(/OS\ 5/) && document.location.href.indexOf("ios=5") == -1) {
            location.href = TUtility.addParam(location.href, "ios", 5);
            location.replace(videoId);
        }

        if(myvid != null) {
            myvid.addEventListener("loadstart", function(){
                stat.sendStat(TnsStatuses.READY);
            }, false);
            myvid.addEventListener("play", function(){
                isPaused = false;
                stat.sendStat(TnsStatuses.PLAY);
            }, false);
            myvid.addEventListener("timeupdate", function(){
                stat.setPosition(myvid.currentTime);
            }, false);
            myvid.addEventListener("error", function(){
                isPaused = true;
                stat.sendStat(TnsStatuses.ERROR);
            }, false);
            myvid.addEventListener("pause", function(){
                isPaused = true;
                stat.sendStat(TnsStatuses.PAUSE);
            }, false);
            myvid.addEventListener("seeked", function(){
                stat.sendStat(TnsStatuses.SEEK, {
                    offset : myvid.currentTime
                });
            }, false);
            myvid.addEventListener("ended", function(){
                isPaused = true;
                stat.sendStat(TnsStatuses.COMPLETE);
            }, false);
        }
    }

    function onPlay(o){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                myvid.play();
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                myvid.action("play");
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function onPause(){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                myvid.pause();
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                myvid.action("pause");
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function onMute(){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                myvid.muted = true;
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                myvid.action("mute");
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function onUnmute(){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                myvid.muted = false;
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                myvid.action("unmute");
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function isMuted(){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                return myvid.muted;
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                return myvid.action("ismuted");
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function onVolumeChange(value){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                if(value) {
                    myvid.volume = value / 100;
                } else {
                    return myvid.volume * 100;
                }
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                if(value) {
                    return myvid.action("volume", value);
                } else {
                    return myvid.action("volume");
                }
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function toggleMute(){
        var myvid;
        if(TUtility.isMobileOrNoFlash) {
            myvid = document.getElementById(html5id);
            if(myvid) {
                myvid.muted = !myvid.muted;
            } else {
                console.warn("can't get myvid");
            }
        } else if(swfobject22.hasFlashPlayerVersion(flashMinVersion)) {
            myvid = document.getElementById(settings.id);
            if(myvid) {
                if(myvid.action("ismuted")) {
                    myvid.action("unmute");
                } else {
                    myvid.action("mute");
                }
            } else {
                console.warn("can't get myvid");
            }
        }
    }

    function generateEmbedCode(){
        var code = "do not supported";
        if(window.btoa && window.JSON) {
            var pid = TUtility.random();
            // clonning
            var config = JSON.parse(JSON.stringify(_settings));
            config.id = "player" + pid;
            code = "<script type=\"text/javascript\" src=\"" + host + deployFolder + "/videoplayer4.js\"></script>";
            code += "<div id=\"player" + pid + "\"></div>";
            code += "<script type=\"text/javascript\">";
            code += "var tnsPlayer" + pid + " = new TnsVideoPlayer({ oem : '";
            code += TUtility.utf8ToBase64(JSON.stringify(config));
            code += "'});";
            code += "</script>";
        }
        return code;
    }

    if(sessionStorage
        && ("initializing" === sessionStorage.getItem("AddonCMeterMain") || "initializing" === sessionStorage.getItem("AddonCMeter"))) {
        window.addEventListener("message", function AddonReady(e){
            if("AddonCMeterReady" !== e.data) {
                return;
            }
            window.removeEventListener("message", AddonReady, false);
            cb_yes();
        }, false);
    } else {
        cb_yes();
    }
    function cb_yes(){
        if(window.JSON) {
            init();
        } else {
            // TODO add deployFolder
            head.js(host + "/json2.min.js", function(){
                init();
            });
        }
    }
    return {
        "validate" : true,
        "remove" : function(){
            stat = null;
            swfobject22.removeSWF(settings.id);
        },
        "play" : function(o){
            onPlay(o);
        },
        "pause" : function(){
            onPause();
        },
        "toggleMute" : function(){
            toggleMute();
        },
        "isMuted" : function(){
            return isMuted();
        },
        "unmute" : function(){
            onUnmute();
        },
        /* value from [0, 100] */
        "volume" : function(value){
            return onVolumeChange(value);
        },
        "mute" : function(){
            onMute();
        },
        "generateEmbedCode" : function(){
            return generateEmbedCode();
        },
        "addListener" : function(fnc){
            if(stat && stat.addListener) {
                stat.addListener(fnc);
            }
        }
    };
};

Array.prototype["_remove"] = function(from, to){
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
};

try {
    (function(){
        // bcz of begun.ru
        var originalgetElementsByTagName;
        if(TUtility.isIE7) {
            originalgetElementsByTagName = document["getElementsByTagName"];
        } else {
            try {
                originalgetElementsByTagName = HTMLDocument.prototype.getElementsByTagName;
            } catch(e) {
                try {
                    originalgetElementsByTagName = Document.prototype.getElementsByTagName;
                } catch(e) {
                    console.error("can't get getElementsByTagName " + e);
                }
            }
        }
        document["getElementsByTagName"] = function(tag){
            var elements;
            if(TUtility.isIE7) {
                elements = originalgetElementsByTagName(tag);
            } else {
                elements = originalgetElementsByTagName.apply(this, arguments);
            }
            elements = TUtility.makeArray(elements);
            for( var index in elements) {
                var node = elements[index];
                if(node && node["tagName"] && /^(object|embed)$/i.test(node["tagName"]) && node["lib"]) {
                    elements["_remove"](index);
                }
            }
            return elements;
        };
    }());
} catch(e) {
    console.error("override " + e);
}