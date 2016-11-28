;
"use strict";

/// <summary>Renders 16:9 iframe with specified url</summary>
/// <param name="url">The &lt;iframe>url of the iframe</param>
/// <param name="linkUrl">url for fallback link, provide in case it should be different than iframe url</param>
/// <remarks>Used by External Content feature linked to key Multimedia.ExternalMultimedia.ProviderRulesJSON. It searches for first occurence of element with specified class. After processing it will rename it to something-rendered, so next call can process another element</remarks>
var renderExternalContent = function (url, linkUrl) {
    var placeholder = $dom.get(".external-content-placeholder")[0];
    var ifr = document.createElement("iframe");
    ifr.setAttribute("src", url);
    ifr.style.width = "100%";
    ifr.style.height = Math.round(placeholder.offsetWidth * 9 / 16) + 3 + "px";
    ifr.setAttribute("frameborder", "0");
    ifr.setAttribute("scrolling", "no");
    ifr.style.overflow = "hidden";
    ifr.setAttribute("allowfullscreen", "allowfullscreen");

    var href = linkUrl ? linkUrl : url
    var link = document.createElement("a");
    link.setAttribute("href", href);
    link.setAttribute("target", "_blank");
    link.innerHTML = href;

    // ifr.appendChild(link);
    placeholder.appendChild(ifr);
    $dom.addClass(placeholder, "external-content-rendered");
    $dom.removeClass(placeholder, "external-content-placeholder");
}

//
// main namespace for all RFE sweet things
var RFE = {};

/**
 * Its a provider of "pushed state below" see. replaceURLNoReload
 */
window.onpopstate = function (event) {
    if (event.state) { //skip on load: http://stackoverflow.com/questions/15896434/window-onpopstate-on-page-load
        location.href = location.href;
    };
};

/**
 * Result current media query shortcut ("XS"/"SM"/"ME"/"LG")
 */
RFE.getResponsiveState = function getResponsiveState(url) {
    if ($dom.style($dom.get('.visible-xs-block')[0], "display") === "block") {
        return "xs";
    } else if ($dom.style($dom.get('.visible-sm-block')[0], "display") === "block") {
        return "sm";
    } else if ($dom.style($dom.get('.visible-md-block')[0], "display") === "block") {
        return "md";
    } else if ($dom.style($dom.get('.visible-lg-block')[0], "display") === "block") {
        return "lg";
    };
}

/**
 * Change whole URL if possible without reloading
 */
RFE.replaceURLNoReload = function replaceURLNoReload(url) {

    if (history && history.pushState) {
        history.pushState({}, "b", url);
    }
}

/**
 * Get position on the page
 */
RFE.getOffsetFromBody = function getOffset(object, offset) {
    if (!offset) {
        offset = {x: 0, y: 0};
    }

    if (object) {
        offset.x += object.offsetLeft;
        offset.y += object.offsetTop;

        getOffset(object.offsetParent, offset);
    }

    return offset;
}

//
// Detect mobile browsers -- http://www.abeautifulsite.net/detecting-mobile-devices-with-javascript/
RFE.isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (RFE.isMobile.Android() || RFE.isMobile.BlackBerry() || RFE.isMobile.iOS() || RFE.isMobile.Opera() || RFE.isMobile.Windows());
    }
};

RFE.getStyle = function (el, styleProp) {
    if (el.currentStyle)
        var y = el.currentStyle[styleProp];
    else if (window.getComputedStyle)
        var y = document.defaultView.getComputedStyle(el, null).getPropertyValue(styleProp);
    return y;
}

RFE.getURL = function () {
    return document.location;
}

/**
 * Retuns Object(key-value) of URL params
 */
RFE.getURLParams = function() {

    var url = window.location.href;
    if (url.indexOf("?") > -1) {
        url = url.replace("?nocache=1", "");
        var paramsStr = url.substring(url.indexOf("?") + 1);
        var params = {};

        var arr = paramsStr.split("&");
        for (var i = 0; i < arr.length; i++) {
            var paramStr = arr[i];
            if (paramStr.indexOf("=") > -1) {
                var key = paramStr.substring(0, paramStr.indexOf("="));
                var value = paramStr.substring(paramStr.indexOf("=") + 1);
                params[key] = value;
            }
        }
        return params;
    }
    return {};
}

/**
 * Check if the site is RTL (returns true) or LTR (returns false)
 */
RFE.isRTL = function (el, styleProp) {
    return document.getElementsByTagName("HTML")[0].getAttribute("dir") === "rtl";
}

//
// Detect the type of RTL scroll mode - like a master here: https://github.com/othree/jquery.rtl-scroll-type
//
//3 Types of scrollLeft (scrollWidth = 100)
//
//Browser       Type        Most Left	Most Right	Initial
//WebKit        default     0           100         100
//Firefox/Opera	negative    -100        0           0
//IE            reverse     100         0           0
//

RFE.getRTLScrollType = function () {
    var definer = $dom.create('div');
    definer.dir = "rtl";
    $dom.style(definer, {
        "font-size": "14px",
        "width": "1px",
        "height": "1px",
        "position": "absolute",
        "top": "-1000px",
        "overflow": "scroll"
    });
    definer.innerHTML = "A";
    document.body.appendChild(definer);

    //style="">A</div>').appendTo('body')[0],

    var type = 'reverse';

    if (definer.scrollLeft > 0) {
        type = 'default';
    } else {
        definer.scrollLeft = 1;
        if (definer.scrollLeft === 0) {
            type = 'negative';
        }
    }

    definer.parentNode.removeChild(definer);
    return type;
}

// 
// Attach Event IE8 safe variant
// 
RFE.attachEvent = function (element, name, fn) {
    if (element.addEventListener) {
        element.addEventListener(name, fn, false); //allways bubbling 
    } else {
        element.attachEvent("on" + name, fn);
    }
}

// Prevent default compatible with ie.
RFE.preventDefault = function (e) {
    e = e || event;
    e.preventDefault ? e.preventDefault() : e.returnValue = false;
    e.stopPropagation ? e.stopPropagation() : e.returnValue = false;
}

// Check that response is valid.
RFE.isResponseValid = function (response) {
    return response && (typeof response === "object" || response instanceof Array);
}

// adapted from matchMedia polyfill
// by Scott Jehl and Paul Irish
// gist.github.com/786768
RFE.testMediaQuery = function () {

    try {
        var mq = window.matchMedia("(min-width: 500px)");
    } catch (e) {
    }

    var matchMedia = window.matchMedia || window.msMatchMedia;
    if (matchMedia) {
        return matchMedia(mq) && matchMedia(mq).matches || false;
    }

    return false;
}

/**
 * Add ECMA262-5 Array methods if not supported natively
 */
RFE.indexOf = function (arr, find, i /*opt*/) {
    if (i === undefined) i = 0;
    if (i < 0) i += arr.length;
    if (i < 0) i = 0;
    for (var n = arr.length; i < n; i++)
        if (i in arr && arr[i] === find)
            return i;
    return -1;
};

/**
 * Get elements by attribute.
 * @param {String} attribute Attribute name.
 * @param {HTMLElement} parent Element to search in - optional.
 * @param {String|Function} value Optional value which the lement have to contain.
 *   When function is passed, it's get called for each element with parameters: the attribute
 *   content and the element. When the function returns true, the element is added to the return
 *   array.
 * @returns {Array} Array of matched elements.
 */
RFE.getElementsByAttribute = function (attribute, parent, value) {
    if (typeof parent === "string" || typeof parent === "function") {
        value = parent;
        parent = null;
    }

    if (!parent) {
        parent = document;
    }

    var search = [];
    var elems = parent.getElementsByTagName("*");

    for (var i = 0; i < elems.length; i++) {
        if (!elems[i].hasAttribute(attribute)) {
            continue;
        }

        if (typeof value === "function") {
            if (!value(elems[i].getAttribute(attribute), elems[i])) {
                continue;
            }
        }
        else if (typeof value !== "undefined" && elems[i].getAttribute(attribute) != value) {
            continue;
        }

        search.push(elems[i]);
    }

    return search;
};

/**
 * Find all form data elements.
 * @param {HTMLElement} form Form or other element containing form data elements.
 * @returns {Array} Array of found elements.
 */
RFE.getFormElements = function (form) {
    var search = [];
    var elems = form.getElementsByTagName("*");

    for (var i = 0; i < elems.length; i++) {
        var tag = elems[i].tagName.toLowerCase();
        if (tag !== "input" && tag !== "select" && tag !== "textarea") {
            continue;
        }

        search.push(elems[i]);
    }

    return search;
};


/**
 * DOM aditional methods.
 */

/**
 * Production steps of ECMA-262, Edition 5, 15.4.4.18
 */
if (!Array.prototype.forEach) Array.prototype.forEach = function (callback, thisArg) {
    if (!this) throw "forEach can't be called on null.";
    if (typeof callback !== "function") throw "callback for forEach have to be a function.";

    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
        if (!this[i]) continue;
        callback.call(thisArg, this[i], i, this);
    }
};


/**
 * Asynchronously load script from remote location.
 * @param {String} src Script URL.
 * @param {Function} onload Optinal onload callbeck.
 */
window.loadScript = function (src, onload) {
    if (typeof src !== "string") throw "loadScript: src have to be a string.";

    var script = document.createElement("script");
    if (typeof onload === "function")
        script.onload = onload;

    document.head.appendChild(script);

    script.setAttribute("type", "text/javascript");
    script.setAttribute("src", src);
}

/**
 * Create the first element in given HTML string.
 * @param {String} html HTML to create.
 * @returns {HTMLElement} Created element.
 */
window.createHTML = function (html) {
    var div = document.createElement("DIV");
    div.innerHTML = html;
    var el = div.firstChild;
    while (el) {
        if (el.nodeType === 1)
            return el;
        el = el.nextSibling;
    }
    return null;
};

/**
 * Activate JavaScripts in given element.
 */
HTMLElement.prototype.activateScripts = function () {
    var scripts = this.querySelectorAll("script");
    for (var i = 0; i < scripts.length; i++) {
        var script = document.createElement("script");
        var sc = scripts[i];

        if (sc.type) {
            script.setAttribute("type", sc.type);
        }

        if (sc.src) {
            script.setAttribute("src", sc.src);
        }
        else {
            script.text = sc.text;
        }

        var p = sc.parentNode;
        p.insertBefore(script, sc);
        p.removeChild(sc);
    }
};

/**
 * Collect current form data, which should be sent.
 * @returns {Object} Form data.
 */
HTMLFormElement.prototype.getActionData = function (useFormData) {
    if (useFormData) {
        return new FormData(this);
    }

    var elems = this.querySelectorAll("input, select, textarea");
    var data = {};

    for (var i = 0; i < elems.length; i++) {
        var el = elems[i];
        var val = null;

        if (!el.name || el.disabled)
            continue;

        switch (el.tagName.toLowerCase()) {
            case "input":
                switch (el.type) {
                    /*case "file":
                     val = el.files[0];
                     break;*/
                    case "hidden":
                        val = data[el.name] ? data[el.name] : el.value;
                        break;
                    case "radio":
                    case "checkbox":
                        if (!el.checked) continue;
                    default:
                        val = el.value;
                }
                break;

            case "select":
                var item = el.options[el.selectedIndex];
                if (!item) continue;
                val = item.value || item.text;
                break;

            case "textarea":
                val = el.value;
                break;
        }

        data[el.name] = val;
    }

    /*if (useFormData) {
     var fd = new FormData();
     for (i in data) {
     if (data.hasOwnProperty(i)) {
     fd.append(i, data[i]);
     }
     }
     return fd;
     }*/

    return data;
};



/**
 * Simple AJAX functions. TODO
 */

function handleResponse(xhr, cbready, mode) {
    if (typeof cbready !== "function")
        throw "ajax" + mode + ": cbready must be a function!";

    xhr.onreadystatechange = function () {
        if (this.readyState !== 4) return;
        if (this.status === 200)
            cbready(parseResponse(this));
        else
            cbready(null);
    };
}

function parseResponse(xhr) {
    var ct = xhr.getResponseHeader("Content-Type");
    if (ct && (/application\/json/).test(ct)) {
        try {
            return JSON.parse(xhr.responseText);
        }
        catch(err) {
            return xhr.responseText;
        }
    }
    else
        return xhr.responseText;
}

function parseData(data) {


    if (typeof FormData !== "undefined" && data instanceof FormData) {
        return data;
    }

    function parseDataNode(name, object, encoded) {
        var ename = encoded ? name : encodeURIComponent(name);
        var param = "";

        function couple(string, encode) {
            return ename + "=" + (encode ? encodeURIComponent(string) : string);
        }

        // %5B .. [
        // %5D .. ]
        switch (typeof object) {
            case "boolean":
                param = couple(object ? "1" : "0");
                break;
            case "undefined":
                param = couple("0");
                break;
            case "number":
                param = couple(object);
                break;
            case "string":
                param = couple(object, true);
                break;
            case "object":
                if (!object)
                    param = couple("0");
                else {
                    var objects = [];
                    if (Array.isArray(object)) {
                        for (var i = 0; i < object.length; i++)
                            objects.push(parseDataNode(ename + "%5B" + i + "%5D", object[i], true));
                    }
                    else {
                        for (var i in object) {
                            if (object.hasOwnProperty(i))
                                object.push(parseDataNode(ename + "%5B" + encodeURIComponent(i) + "%5D", object[i], true));
                        }
                    }

                    param = object.join('&');
                }
        }

        return param;
    }

    var cnt = 0, toSend = "";
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            if (cnt++ > 0) toSend += "&";
            toSend += parseDataNode(i, data[i]);
        }
    }

    return toSend;
}

/**
 * Create GET ajax request.
 * @param {String} url Request URL.
 * @param {Object} data Optional data which are serialized at the end of the URL. This parameter can be omitted.
 * @param {Function|Boolean} cbready When passed true, the request is made
 *   synchronously. Otherwise an instance of Function is required. The parameter of
 *   the response is null when the response status is different than 200 OK, when
 *   the response has Content-Type set to application/json the content is parsed and
 *   returned as Object. Otherwise the text content is set.
 * @returns {XMLHttpRequest|Object|String} When the cbready is set as an instance of Function,
 *   XMLHttpRequest is returned. Otherwise the response is parsed the same way as the argument
 *   of the Function which could be passed.
 */
window.ajaxGet = function (url, data, cbready) {
    if (cbready === undefined) {
        cbready = data;
        data = null;
    }
    else {
        var strdata = parseData(data);
        if (strdata.length > 0) {
            url += (url.indexOf("?") >= 0) ? "&" : "?";
            url += strdata;
        }
    }

    var sync = true;
    if (cbready !== true) sync = false;

    var xhr = new XMLHttpRequest();
    xhr.open("GET", url.split('#')[0], !sync);

    if (!sync) handleResponse(xhr, cbready, "Get");
    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xhr.send();

    return sync ? parseResponse(xhr) : xhr;
}

/**
 * Create POST ajax request.
 * @param {String} url Request URL.
 * @param {Object} data Data to POST.
 * @param {Function|Boolean} cbready When passed true, the request is made
 *   synchronously. Otherwise an instance of Function is required. The parameter of
 *   the response is null when the response status is different than 200 OK, when
 *   the response has Content-Type set to application/json the content is parsed and
 *   returned as Object. Otherwise the text content is set.
 * @param {Function} cbstart When set this call is called before XHR is sent.
 * @returns {XMLHttpRequest|Object|String} When the cbready is set as an instance of Function,
 *   XMLHttpRequest is returned. Otherwise the response is parsed the same way as the argument
 *   of the Function which could be passed.
 */
window.ajaxPost = function (url, data, cbready, cbstart) {
    var sync = true;
    if (cbready !== true) sync = false;

    var xhr = new XMLHttpRequest();
    if (typeof cbstart === "function") {
        var ret = cbstart(xhr);
        if (ret === false) {
            return false;
        }
    }

    xhr.open("POST", url.split('#')[0], !sync);

    if (!sync) {
        handleResponse(xhr, cbready, "Post");
    }

    if ((typeof FormData !== "undefined")  &&  (!(data instanceof FormData))) {
        xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    }

    xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

    xhr.send(parseData(data));

    return sync ? parseResponse(xhr) : xhr;
}

/**
 * Create URI from root directory.
 * @param {String} uri Website URI.
 * @returns {String} Full URI.
 */
window.root = function (uri) {
    uri = uri || "";
    if (uri.length > 0 && uri.charAt(0) === "/")
        uri = uri.substr(1);
    return appBaseUrl + uri;
};

RFE.createCookie = function(name, value, days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "; expires=" + date.toGMTString();
    }
    else var expires = "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

RFE.readCookie = function(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

RFE.eraseCookie = function(name) {
    RFE.createCookie(name, "", -1);
}