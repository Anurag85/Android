/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    /**
     * @class GDSpecificPolicies
     *
     * @classdesc The GDSpecificPolicies is used to read application-specific policy from Good Control (GC) console and return it in JSON format.
     * To use this feature you should create policy file in XML format and upload it to the enterprise management console for specific application
     * (for mere details see following <a href="https://community.good.com/view-doc.jspa?fileName=_app_policies.html&docType=api">guide</a>)
     * The settings can be retrieved by calling updatePolicy method below.
     */

    window.GDSpecificPolicies = function() {
        Object.defineProperty(this, 'toString', {
            value: function() {
                return '[object GDSpecificPolicies]';
            }
        });
    };

    Object.defineProperty(GDSpecificPolicies, 'toString', {
        value: function() {
            return 'function GDSpecificPolicies() { [native code] }';
        },
        writable: false
    });

    Object.preventExtensions(GDSpecificPolicies);

    /**
     * @function GDSpecificPolicies#updatePolicy
     *
     * @description Call this function to retrieve application-specific policy from Good Control (GC) console in JSON format.
     * This method observes the application-policy state and once it is updated on enterprise management console we will receive the letest version directly in success callback.
     *
     * @param {function} successCallback Callback function to invoke when updatePolicy method returns successfully.
     * The policy object is passed to this function as parameter.
     *
     * @param {function} errorCallback Callback function to invoke for error conditions.
     *
     * @example
     * window.plugins.GDSpecificPolicies.updatePolicy(
     *     function(policy) {
     *         alert("Retrieved application-specific policy is: " + policy);
     *     },
     *     function(error) {
     *         alert("Error occure: " + error);
     *     }
     * );
     */

    GDSpecificPolicies.prototype.updatePolicy = function(successCallback, errorCallback) {
        if (arguments.length == 0) {
            throw new Error("TypeError: Failed to execute 'updatePolicy' on 'GDSpecificPolicies': 2 argument required, but only " + arguments.length + " present.");
        }

        var parms = [];

        var success = function(result) {
            var obj = JSON.parse(result);
            successCallback(obj);
        };

        cordovaExec(success, errorCallback, "GDSpecificPolicies", "updatePolicy", parms);
    };

    Object.defineProperty(GDSpecificPolicies.prototype.updatePolicy, 'toString', {
        value: function() {
            return 'function updatePolicy() { [native code] }';
        }
    });

    Object.preventExtensions(GDSpecificPolicies.prototype);

    var gdSpecificPolicies = new GDSpecificPolicies();
    Object.preventExtensions(gdSpecificPolicies);

    module.exports = gdSpecificPolicies;
}());

// End GDSpecificPolicies.js
//*****************************************************************  //leave empty line after
