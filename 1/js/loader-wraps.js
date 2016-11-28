/**
 * Process loaded javascript - it's a function
 */
function initInclude(resource, name) {

    if (!resource) {
        throw "Undefined Module " + name;
    }

    //apply JS
    if (/MSIE\s/.test(navigator.userAgent) && parseFloat(navigator.appVersion.split("MSIE")[1]) < 10) { //IE9 - needs a different approach
        eval("//# sourceURL=" + name + ".js\n\n" + resource);
    } else {
        var element = $dom.create("script");
        element.type = "text/javascript";
        element.innerHTML = "//# sourceURL=" + name + ".js\n\n" + resource;
        document.body.appendChild(element);
    }
}