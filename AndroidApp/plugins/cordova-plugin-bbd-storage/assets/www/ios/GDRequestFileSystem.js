/**
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        FileSystem = require('cordova-plugin-bbd-storage.FileSystem'),
        FileError = require('cordova-plugin-bbd-storage.FileError');

    //***************************** requestFileSystem ********************************//

    /**
     * @class GDRequestFileSystem
     *
     * @classdesc Wrapper for requestFileSystem method
     */

    /**
     * @function GDRequestFileSystem#requestFileSystem
     * @description requestFileSystem - Request a secure file system in which to store application data.
     * @property {string} type Local secure file system type
     * @property {integer} size  Indicates how much storage space, in bytes, the application expects (not supported)
     * @param {function} successCallback Invoked with a FileSystem object
     * @param {function} errorCallback Invoked if error occurs retrieving the secure file system
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     console.log(fileSystem.name);
     *     console.log(fileSystem.root);
     * });
     */
    var gdRequestFileSystem = function(type, size, successCallback, errorCallback) {
        var fail = function(code) {
            if (typeof errorCallback === 'function') {
                errorCallback(new FileError(code));
            }
        };
        //if (type < 0 || type > 3) {
        if (type < 0 || type > 1) {
            fail(FileError.SYNTAX_ERR);
        } else {
            var success = function(file_system) {
                if (file_system) {
                    if (successCallback) {
                        // grab the name and root from the file system object
                        var result = new FileSystem(file_system.name, file_system.root);
                        successCallback(result);
                    }
                } else {
                    // no FileSystem object returned
                    fail(FileError.NOT_FOUND_ERR);
                }
            };
            cordovaExec(success, fail, "GDStorage", "requestFileSystem", [type, size]);
        }
    };

    Object.defineProperty(gdRequestFileSystem, 'toString', {
        value: function() {
            return 'function gdRequestFileSystem() { [native code] }';
        }
    });

    requestFileSystem = gdRequestFileSystem;

    module.exports = requestFileSystem;
})();