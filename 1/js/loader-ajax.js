/**
 * Provide a request for resources
 *
 * @resourceList {array of strings} - list of resources needed
 * @capabilities {array of strings} - detected client capabilities
 * @onLoaded {function(string)} - callback when data loaded
 */

//
// PRODUCTION CODE
//
function loadResourcesPruduction(resourceList, onLoaded) {
    var url = root("res?dependencies=");
    for (var i = 0; i < resourceList.length; i++) {
        if (i > 0) {
            url += ",";
        }
        url += resourceList[i];
    }

    if (!!window.cacheBuster) {
        url += "&cb=" + window.cacheBuster;
    }

    window.ajaxGet(url, function(response) {
        onLoaded(response);
    });
}

//
// DEVELOPMENT CODE
//
function loadResourcesDevelopment(resourceList, onLoaded) {

    var resources = {};
    var toLoad = 0;
    var done = 0;
    var id;

    for (id in resourceList) {
        if (resourceList.hasOwnProperty(id)) {
            toLoad++;
        }
    }

    for (id in resourceList) {
        if (!resourceList.hasOwnProperty(id)) {
            continue;
        }

        (function(id) {
            var resourceRequest = resourceList[id];
            var xhr = window.ajaxGet("../../js/modules/" + resourceRequest + ".js", function() {
                resources[resourceRequest] = xhr.status === 200 ? xhr.responseText : null;
                if (toLoad <= ++done) {
                    onLoaded(resources);
                }
            });
        })(id);
    }
}

if (typeof rfe_devlopment_enviroment === 'boolean' && rfe_devlopment_enviroment) {
    var loadResources = loadResourcesDevelopment;
} else {
    var loadResources = loadResourcesPruduction;
}
