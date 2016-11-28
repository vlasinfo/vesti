;
"use strict";

//register of all initialised modules
RFE.moduleRegister = [];

/**
 * Logs errors
 * @param {String} msg Message to log
 * @returns {RFE.Module} or {undefined} if not found
 */
RFE.moduleByName = function (name) {
    //run all RFE modules
    for (var i = 0; i < RFE.moduleRegister.length; i++) {
        var module = RFE.moduleRegister[i];

        //lazy load for modules
        if (module.name === name) {
            return module;
        }
    }
}

/**
 * main module wrapper - all page javascripts should be wrapped by this structure
 *
 * Usage:
 *
 *    RFE.Module.extend({
*       loadable: true,        //load once it's ready
*       lazyLoadable: false,   //can be also lazy-loaded
*       init: function (context, parent) {...
*/
RFE.Module = {
    /**
     * Creates a new module constructor
     */
    getConstructor: function() {

        //constructor
        return function () {
            RFE.moduleRegister.push(this);
        }
    },

    /**
     * Init module
     * @param {Object} module to be initialized
     */
    initModule: function(module) {
        //initial load for modules
        //       console.log(module.name, module.init, module.loadable)
        if (typeof module.init === 'function' && module.loadable) {
            try {
                module.init("load", document.body);
            } catch (e) {
                if (console) {
                    var obj = {stack: "N/A"};
                    if (Error.captureStackTrace) {
                        Error.captureStackTrace(obj, this);
                    }
                    if (console.error) {
                        console.error("error while " + module.name + " processing", e.message, obj.stack);
                    } else {
                        console.log("error while " + module.name + " processing", e.message, obj.stack);
                    }
                }
            }
        }

        return module;
    },

    /**
     * Factory
     * @param {Object} newModule object properties
     * @returns {RFE.Module}
     */
    extend: function (newModule) {
        var module = this.getConstructor();
        module.prototype = newModule;
        //new module()
        return this.initModule(new module());
    },

    /**
     * Factory - extend a module
     * @param {String} parentModuleName module to be extended
     * @param {Object} newModule object properties
     * @returns {RFE.Module}
     */
    extendCustomParent: function (parentModuleName, newModule) {

        var module = this.getConstructor();
        module.prototype = newModule;

        var parentModule = RFE.moduleByName(parentModuleName);

        if (!parentModule) {
            throw "Parent module not found"
        }

        for (var attr in parentModule) {
            //if (parentModule.hasOwnProperty(attr)) {
            if (typeof module.prototype[attr] === 'undefined') {
                module.prototype[attr] = parentModule[attr]
            };
        }

        //      console.log(module.prototype.init)

        return this.initModule(new module());
    }
};

/**
 * Find particular module
 * @param {String} name - a name given
 */
RFE.getModuleByName = function (name) {
    //run all RFE modules //TODO prepare a general function
    for (var i = 0; i < RFE.moduleRegister.length; i++) {
        var module = RFE.moduleRegister[i];

        if (module.name === name) {
            return module;
        }
    }
}