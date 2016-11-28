/**
 * Obtain resources for a particular action (http://xyz..)
 *
 * Usage:
 *
 *    exe([{
 *      test: "",
 *      dep: [""],
 *      yep: function(),
 *      nope: function()
 *    }])
 *
 * @items {array} - available tests http://xyz..
 */
function exe(items) {

    var tasks = [];

    //prepare list of taks needed

    for (var i = 0; i < items.length; i++) {
        var task = items[i];

        if (!task.test || provideTests(task.test))  //are there any matched criteria?
            tasks.push(task);
    }

    //get an unique resource names list
    var resourceList = [];
    for (var i in tasks) {
        var task = tasks[i];

        if (typeof task.dep === 'object' && task.dep instanceof Array) {
            for (var j = 0; j < task.dep.length; j++) {
                if (RFE.indexOf(resourceList, task.dep[j]) === -1) { //need an unique list
                    resourceList.push(task.dep[j]);
                }
            }
        } else if (typeof task.dep === 'string') {
            resourceList.push(task.dep);
        }
    }

    //lets obtain the resources
    if (resourceList.length > 0) {
        loadResources(resourceList, function(resources) {
            //process tasks with new loaded resources
            var processTask = function(task) {
                return initInclude(resources[task], task);
            };

            //iterate tasks
            for (var i in tasks) {
                var task = tasks[i];

                if (typeof task.dep === 'object' && task.dep instanceof Array) {
                    var argumentsReturned = [];
                    for (var j = 0; j < task.dep.length; j++) {
                        argumentsReturned.push(processTask(task.dep[j]));
                    }
                    if (task.yep) {
                        task.yep.apply(this, argumentsReturned);
                    }
                } else {

                    if (task.yep) {
                        task.yep(processTask(taskDep));
                    }
                }
            }

        });
    }
}

//use a module TODO prepare a general method
//for (var i = 0; i < RFE.moduleRegister.length; i++) {
//    var module = RFE.moduleRegister[i];

//    if (module.name == "Tabs") {
//        module.init("on demand", wideScreenBox);
//    }
//}