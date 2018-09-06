/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    /**
     * @class GDTokenHelper
     *
     * @classdesc The GDTokenHelper is used to request token from server side and process
     * callback on response
     */
    var GDTokenHelper = function() {
        Object.defineProperty(this, 'toString', {
            value: function() {
                return '[object GDTokenHelper]';
            }
        })
    };

    Object.defineProperty(GDTokenHelper, 'toString', {
        value: function() {
            return 'function GDTokenHelper() { [native code] }';
        }
    });

    Object.preventExtensions(GDTokenHelper);

    // ***** BEGIN: MODULE METHOD DEFINITIONS - GDTokenHelper *****

    /**
     * @function GDTokenHelper#getGDAuthToken
     *
     * @description Call this function to check if it is currently possible to open an app using an url scheme
     *
     * @param {string} challenge string for the authorization
     *
     * @param {string} serverName string for the server name
     *
     * @param {function} onSuccess Callback function to invoke when the function returns successfully.
     *
     * @param {function} onError Callback function to invoke for error conditions.
     *
     * @example
     * window.plugins.GDTokenHelper.getGDAuthToken("test", "serverName",
     *     function(result) {
     *         alert("Retrieved Application details " + result);
     *     },
     *     function(result) {
     *         alert("Api not supported on emulated devices: " + result);
     *     }
     * );
     */
    GDTokenHelper.prototype.getGDAuthToken = function(challenge, serverName, onSuccess, onError) {

        if (challenge === undefined) {
            throw new Error("ERROR in GDTokenHelper.getGDAuthToken: challenge parameter is not set.");
        }

        if (serverName === undefined) {
            throw new Error("ERROR in GDTokenHelper.getGDAuthToken: serverName parameter is not set.");
        }

        if (typeof onSuccess !== 'function') {
            throw new Error("ERROR in GDTokenHelper.getGDAuthToken: onSuccess parameter is not a function.");
        }

        var parms = [challenge, serverName];
        cordovaExec(onSuccess, onError, "GDTokenHelper", "getGDAuthToken", parms);
    };

    Object.defineProperty(GDTokenHelper.prototype.getGDAuthToken, 'toString', {
        value: function() {
            return 'function getGDAuthToken() { [native code] }';
        }
    });

    Object.preventExtensions(GDTokenHelper.prototype);

    // ***** END: MODULE METHOD DEFINITIONS - GDTokenHelper *****

    var gdTokenHelper = new GDTokenHelper();
    Object.preventExtensions(gdTokenHelper);

    // Install the plugin.
    module.exports = gdTokenHelper;
}()); // End the Module Definition.
//************************************************************************************************
