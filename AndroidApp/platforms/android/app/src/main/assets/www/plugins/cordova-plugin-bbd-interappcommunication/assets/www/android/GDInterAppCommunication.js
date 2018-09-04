cordova.define("cordova-plugin-bbd-interappcommunication.GDInterAppCommunicationPlugin", function(require, exports, module) {
/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    /**
     * @class GDInterAppCommunication
     *
     * @classdesc The GDInterAppCommunication is used to return information about a service provider
     * application.
     *
     */
    var GDInterAppCommunication = function() {
        Object.defineProperties(this, {
            'toString': {
                value: function() {
                    return '[object GDInterAppCommunication]'
                }
            }
        });
    };

    Object.defineProperty(GDInterAppCommunication, 'toString', {
        value: function() {
            return 'function GDInterAppCommunication() { [native code] }';
        }
    });

    Object.preventExtensions(GDInterAppCommunication);
    // ***** BEGIN: MODULE METHOD DEFINITIONS - GDInterAppCommunication *****

    /** @function GDInterAppCommunication#getGDAppDetails
     *
     * @description This method check for apps installed on device
     *
     * @param {string} id Service ID.
     *
     * @param {string} version Service version
     *
     * @param {function} onSuccess Callback function to invoke when the function returns successfully.
     *
     * @param {function} onError Callback function to invoke for error conditions.
     *
     * @example
     * function success(result) {
     *     alert("Recieved details: " + result);
     * };
     *
     * function fail(result) {
     *     alert("An error occurred while recieving the application details: " + result);
     * };
     *
     *
     * function getGDAppDetails(){
     *    window.plugins.GDInterAppCommunication.getGDAppDetails("", "", success, fail);
     * };
     *
     */

    GDInterAppCommunication.prototype.getGDAppDetails = function(serviceId, version, onSuccess, onError) {
        if (serviceId === null || typeof serviceId === 'undefined') {
            throw new Error("Null serviceId passed to GDInterAppCommunication.getGDAppDetails.");
        }

        if (typeof onSuccess !== 'function') {
            throw new Error("ERROR in GDInterAppCommunication.getGDAppDetails: onSuccess parameter is not a function.");
        }

        if (typeof onError !== 'function') {
            throw new Error("ERROR in GDInterAppCommunication.getGDAppDetails: onError parameter is not a function.");
        }

        var success = function(res) {
            var result = JSON.parse(res);
            onSuccess(result);
        };

        var parms = [serviceId, version];
        cordovaExec(success, onError, "GDInterAppCommunication", "getGDAppDetails", parms);
    };

    // ***** END: MODULE METHOD DEFINITIONS - GDInterAppCommunication *****

    // hide function implementation in web inspector
    Object.defineProperty(GDInterAppCommunication.prototype.getGDAppDetails, 'toString', {
        value: function() {
            return 'function getGDAppDetails() { [native code] }';
        },
        writable: false
    });

    Object.preventExtensions(GDInterAppCommunication.prototype);

    var gdInterAppCommunication = new GDInterAppCommunication();
    Object.preventExtensions(gdInterAppCommunication);
    // Install the plugin.
    module.exports = gdInterAppCommunication;
}()); // End the Module Definition.
//************************************************************************************************

});
