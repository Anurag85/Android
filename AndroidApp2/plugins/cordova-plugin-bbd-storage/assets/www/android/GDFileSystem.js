/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        DirectoryEntry = require('cordova-plugin-bbd-storage.DirectoryEntry'),
        FileError = require('cordova-plugin-bbd-storage.FileError');

    //**************GDFileSystem****************//
    /**
     * @class GDFileSystem
     * @classdesc An interface representing a secure file system
     * @property {string} name The unique name of the file system (readonly)
     * @property {DirectoryEntry} root Root directory of the file system (readonly)
     */
    var GDFileSystem = function(name, root) {
        var fsName = name || null,
            root = new DirectoryEntry("GDDocuments", "/", this);

        Object.defineProperties(this, {
            'name': {
                get: function() {
                    return fsName;
                }
            },
            'root': {
                get: function() {
                    return root;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDFileSystem]';
                }
            }
        });
    };

    Object.defineProperty(GDFileSystem, 'toString', {
        value: function() {
            return 'function GDFileSystem() { [native code] }';
        }
    });

    Object.preventExtensions(GDFileSystem);

    /**
     * @function GDFileSystem#exportLogFileToDocumentsFolder
     * @description Call this function to create a dump of BlackBerry Dynamics activity logs.
     * The logs will be dumped to a file that is outside the secure store, in the Documents folder.
     * The file will not be encrypted.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     fileSystem.exportLogFileToDocumentsFolder(function() {
     *         console.log("Logs are imported to the Documents folder");
     *     }, null);
     * }, null);
     */
    GDFileSystem.prototype.exportLogFileToDocumentsFolder = function(successCallback, errorCallback) {
        var win = typeof successCallback !== 'function' ? null : function(result) {
            successCallback();
        };
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };
        cordovaExec(win, fail, "GDStorage", "exportLogFileToDocumentsFolder", []);
    };

    /**
     * @function GDFileSystem#uploadLogs
     * @description Call this function to upload BlackBerry Dynamics activity logs for support purposes.
     * The logs will be uploaded to a server in the BlackBerry Technology Network Operation Center (NOC).
     * Upload takes place in background and is retried as necessary.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     fileSystem.uploadLogs(function() {
     *         console.log("Logs are imported to the server");
     *     }, null);
     * }, null);
     */
    GDFileSystem.prototype.uploadLogs = function(successCallback, errorCallback) {
        var win = typeof successCallback !== 'function' ? null : function(result) {
            successCallback();
        };
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };
        cordovaExec(win, fail, "GDStorage", "uploadLogs", []);
    };

    // hide functions implementation in web inspector
    for (protoFunction in GDFileSystem.prototype) {
        if (GDFileSystem.prototype.hasOwnProperty(protoFunction)) {

            // Checking, if function property 'name' is configurable
            // (for old browser, which has pre-ES2015 implementation(Android 5.0) function name property isn't configurable)
            var objProtoProperty = GDFileSystem.prototype[protoFunction],
                isFuncNamePropConfigurable = Object.getOwnPropertyDescriptor(objProtoProperty, 'name').configurable;

            if (isFuncNamePropConfigurable) {
                Object.defineProperty(GDFileSystem.prototype[protoFunction],
                    'name', {
                        value: protoFunction,
                        configurable: false
                    }
                );
            }

            Object.defineProperty(GDFileSystem.prototype[protoFunction],
                'toString', {
                    value: function() {
                        var funcName = this.name || protoFunction;
                        return 'function ' + funcName + '() { [native code] }';
                    },
                    writable: false,
                    configurable: false
                });

        }
    }

    Object.preventExtensions(GDFileSystem.prototype);

    FileSystem = GDFileSystem;

    module.exports = FileSystem;
})();
