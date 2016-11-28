/**
 * Show a progress status (rotating wheel)
 */
function showLoadingStatus() {
    var status = $dom.get("#loading-status")[0];
    if (!status) {
        status = $dom.create("div#loading-status");
        document.body.appendChild(status);
    }

    $dom.toggleClass(status, "shown", true);
}

/**
 * Hide laoding status
 */
function hideLoadingStatus() {
    var status = $dom.get("#loading-status")[0];
    if (status) {
        $dom.toggleClass(status, "shown", false);
    }
}