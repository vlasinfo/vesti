/**
 * Prepare caps for a replace
 */
function replace() {
    var hash = window.location.hash.substring(1);

    var fakeCaps = hash.split(",");
    for (var i in fakeCaps) {
        if (fakeCaps[i] === "debug" || fakeCaps[i] === "replace") {
            delete fakeCaps[i];
        }
    }

    return fakeCaps;
}

/**
 * Display a debug modal dialog
 */
function debug() {

    var capsStr = "";
    for (var i in caps) {
        capsStr += "<span>" + caps[i] + "</span>";
    }

    var str = "<div id='debug'>";

    str += "<table>";
    str += "<tr>";
    str += "<th>Caps:</th><td>" + capsStr + "</td>";
    str += "</tr>";
    str += "<tr>";
    str += "<th>Mode:</th><td><span class='desktop'>desktop</span><span class='tablet'>tablet</span><span class='mobile'>mobile</span></td>";
    str += "</tr>";
    str += "</table>";

    str += "</div>";

    var debug = document.createElement("div");
    debug.innerHTML = str;
    document.body.appendChild(debug);
}