//var caps;//device capabilities - {array}


///**
// * Provide a detection - set the 'caps'
// */
//function detectCaps() {

//    caps = null; //clear caps

//    if (typeof replace !== undefined && window.location.hash.indexOf('replace') > -1) {
//        caps = replace(); //fill by a fake caps
//        log(DEBUG, "replaced caps = " + caps);
//    }

//    if (!caps) { //fill by a real detected aps
//        caps = [];

//        //if it's a fast / slow network
//        if (typeof started !== 'undefined') {
//            var delay = (new Date().getTime() - started);

//            log(DEBUG, "detected delay = " + delay);

//            if (started && delay < 1000) {
//                caps.push("fast");
//            } else {
//                caps.push("slow");
//            }
//        } else {

//        }

//        //have we a dom based query api ?
//        if (typeof document.querySelectorAll !== 'undefined') {
//            caps.push("query");
//        } else {
//            caps.push("no-query");
//        }

//        //what wide is the screen?
//        if (!findByClass("device-xs").offsetWidth) {
//            caps.push("device-xs");

//        } else if (!findByClass("device-sm").offsetWidth) {
//            caps.push("device-sm");

//        } else if (!findByClass("device-md").offsetWidth) {
//            caps.push("device-md");

//        } else if (!findByClass("device-lg").offsetWidth) {
//            caps.push("device-lg");

//        } else {
//            caps.push("device-??");

//        }
//    }

//    log(DEBUG, "detected caps = " + caps);

//    if (typeof debug !== undefined && window.location.hash.indexOf('debug') > -1) {
//        debug();
//    }
//}

/**
 * Povide all tests
 *
 * @tests {array|string|function} - tests string (when it's a desired capability) or function
 */
function provideTests(tests) {

    if (typeof tests === 'object' && tests instanceof Array && tests.lenght > 0) {  //multiple tests (AND applied)

        for (var i in tests) {
            var test = tests[i];

            if (typeof rule === 'string') {
                if (indexOf(caps, test) > -1)
                    return false;

            } else if (typeof rule === 'function') {
                if (!rule())
                    return false;
            }
        }

        return true;

    } else if (typeof tests === 'string') { //single test - string

        return indexOf(caps, test) > -1;

    } else if (typeof tests === 'function') { //single test - function

        return tests();

    }

    return false;
}

/**
 * Provide a detection
 *
 * @compareWith {string} - list of capabilities that will be comared with the 'caps' - caps. detected
 */
/*
 function matchCap(compareWith) {

 if (typeof caps === 'undefined') {
 detectCaps();
 }

 if (typeof compareWith === 'object' && compareWith instanceof Array && compareWith.lenght > 0) {  //multiple rule (AND applied)
 for (var i in compareWith) {
 var rule = compareWith[i];

 if (typeof rule === 'string') {
 if (caps.indexOf(rule) > -1)
 return false;
 } else if (typeof rule === 'function') {
 return rule();
 }
 return caps.indexOf(compareWith) > -1;
 }
 return true;

 } else if (typeof compareWith === 'string') { //single rule
 return caps.indexOf(compareWith) > -1;
 }
 } */