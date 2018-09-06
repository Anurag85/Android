/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        DirectoryReader = require('cordova-plugin-bbd-storage.DirectoryReader'),
        FileEntry = require('cordova-plugin-bbd-storage.FileEntry'),
        FileError = require('cordova-plugin-bbd-storage.FileError'),
        Metadata = require('cordova-plugin-bbd-storage.Metadata');

    //********GDDirectoryEntry**********************//
    /**
     * @class GDDirectoryEntry
     * @classdesc An interface representing a directory on the file system.
     * @property {boolean} isFile Always false (readonly)
     * @property {boolean} isDirectory Always true (readonly)
     * @property {string} name Name of the directory, excluding the path leading to it (readonly)
     * @property {string} fullPath The absolute full path to the directory (readonly)
     * @property {FileSystem} filesystem Filesystem on which the directory resides (readonly) - not supported by Cordova
     */
    var GDDirectoryEntry = function(name, fullPath, fileSystem) {
        var isFile = false,
            isDirectory = true,
            dirName = name || '',
            dirFullPath = fullPath || '',
            dirFilesystem = fileSystem || '';

        Object.defineProperties(this, {
            'isFile': {
                get: function() {
                    return isFile;
                }
            },
            'isDirectory': {
                get: function() {
                    return isDirectory;
                }
            },
            'name': {
                get: function() {
                    return dirName;
                }
            },
            'fullPath': {
                get: function() {
                    return dirFullPath;
                }
            },
            'fileSystem': {
                get: function() {
                    return dirFilesystem;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDDirectoryEntry]';
                }
            }
        })
    };

    Object.defineProperty(GDDirectoryEntry, 'toString', {
        value: function() {
            return 'function GDDirectoryEntry() { [native code] }';
        }
    });

    Object.preventExtensions(GDDirectoryEntry);

    /**
     * @function GDDirectoryEntry#createReader
     * @description Creates a new DirectoryReader to read entries from this directory
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "directory_reader_test",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         var directoryReader = directory.createReader();
     *         // use directoryReader here
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.createReader = function() {
        return new DirectoryReader(this.fullPath);
    };

    /**
     * @function GDDirectoryEntry#getDirectory
     * @description getDirectory Creates or looks up a directory
     * @param {string} path Either a relative or absolute path from this directory in which to look up or create a directory
     * @param {Flags} options Options to create or exclusively create the directory
     * @param {function} successCallback Called with the new entry
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "test",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         console.log(directory.isFile); //false
     *         console.log(directory.isDirectory); //true
     *         console.log(directory.name); // "test"
     *         console.log(directory.fullPath); // "/test"
     *         console.log(directory.filesystem); // "/"
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.getDirectory = function(path, options, successCallback, errorCallback) {
        var create = options.create ? "true" : "false",
            win = typeof successCallback !== 'function' ? null : function(result) {
                var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                    entry = new GDDirectoryEntry(result.name, result.fullPath, fs);
                successCallback(entry);
            };

        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(win, fail, "GDStorage", "getDirectory", [this.fullPath, path, create]);
    };

    /**
     * @function GDDirectoryEntry#removeRecursively
     * @description Deletes a directory and all of it's contents
     * @param {function} successCallback Called with no parameters
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "root_dir",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         fileSystem.root.getFile("root_dir/file.txt", options, function (file) {
     *              // file is available at path "/root_dir/file.txt"
     *              // removing "root_dir"
     *              directory.removeRecursively(function(){
     *                  // here we have empty file system
     *              }, null);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.removeRecursively = function(successCallback, errorCallback) {
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(successCallback, fail, "GDStorage", "removeRecursively", [this.fullPath]);
    };

    /**
     * @function GDDirectoryEntry#getFile
     * @description Creates or looks up a file.
     * @param {string} path Either a relative or absolute path from this directory in which to look up or create a file
     * @param {Flags} options Options to create or exclusively create the file
     * @param {function} successCallback Called with the new entry
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         console.log(file.isFile); //true
     *         console.log(file.isDirectory); //false
     *         console.log(file.name); // "file.txt"
     *         console.log(file.fullPath); // "/file.txt"
     *         console.log(file.filesystem); // "/"
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.getFile = function(path, options, successCallback, errorCallback) {
        var win = typeof successCallback !== 'function' ? null : function(result) {
            var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                entry = new FileEntry(result.name, result.fullPath, fs);

            successCallback(entry);
        };
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(win, fail, "GDStorage", "getFile", [this.fullPath, path, options]);
    };

    //**************************Common to Entry (GDDirectoryEntry)******************************//
    /**
     * @function GDDirectoryEntry#getMetadata
     * @description Look up the metadata of the entry.
     * @param {function} successCallback Called with a Metadata object
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "test",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         directory.getMetadata(function (metadata) {
     *             console.log(metadata.modificationTime);
     *             console.log(metadata.size);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.getMetadata = function(successCallback, errorCallback) {
        var success = typeof successCallback !== 'function' ? null : function(lastModified) {
            var metadata = new Metadata(lastModified);

            successCallback(metadata);
        };
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(success, fail, "GDStorage", "getMetadata", [this.fullPath]);
    };

    /**
     * @function GDDirectoryEntry#moveTo
     * @description Move a file or directory to a new location.
     * @param {GDDirectoryEntry} parent The directory to which to move this entry
     * @param {string} newName New name of the entry, defaults to the current name
     * @param {function} successCallback Called with the new DirectoryEntry object
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory("parentDirectory", options, function (parentDirectory) {
     *         // "/parentDirectory" is created here
     *         fileSystem.root.getDirectory("nestedDirectory", options, function (nestedDirectory) {
     *             // "/nestedDirectory" is created here
     *             nestedDirectory.moveTo(parentDirectory, "newDirectory", function (directory) {
     *                 // now "/nestedDirectory" was moved to "/parentDirectory" with new name "newDirectory"
     *                 console.log(directory.isFile); //false
     *                 console.log(directory.isDirectory); //true
     *                 console.log(directory.name); // "newDirectory"
     *                 console.log(directory.fullPath); // "/parentDirectory/newDirectory"
     *                 console.log(directory.filesystem); // "/"
     *             }, null);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.moveTo = function(parent, newName, successCallback, errorCallback) {
        var fail = function(code) {
            if (typeof errorCallback === 'function') {
                errorCallback(new FileError(code));
            }
        };
        // user must specify parent Entry
        if (!parent) {
            fail(FileError.NOT_FOUND_ERR);
            return;
        }
        // source path
        var srcPath = this.fullPath,
            // entry name
            name = newName || this.name,
            success = function(entry) {
                if (entry) {
                    if (typeof successCallback === 'function') {
                        // create appropriate Entry object
                        var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                            result = new GDDirectoryEntry(entry.name, entry.fullPath, fs);

                        try {
                            successCallback(result);
                        } catch (e) {
                            throw new Error('Error invoking callback: ' + e);
                        }
                    }
                } else {
                    // no Entry object returned
                    fail(FileError.NOT_FOUND_ERR);
                }
            };
        // copy
        cordovaExec(success, fail, "GDStorage", "moveTo", [srcPath, parent.fullPath, name]);
    };

    /**
     * @function GDDirectoryEntry#copyTo
     * @description Copy a directory to a different location.
     * @param {GDDirectoryEntry} parent  The directory to which to copy the entry
     * @param {string} newName New name of the entry, defaults to the current name
     * @param {function} successCallback Called with the new Entry object
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory("parentDirectory", options, function (parentDirectory) {
     *         // "/parentDirectory" is created here
     *         fileSystem.root.getDirectory("nestedDirectory", options, function (nestedDirectory) {
     *             // "/nestedDirectory" is created here
     *             nestedDirectory.copyTo(parentDirectory, "newDirectory", function (directory) {
     *                 // now "/nestedDirectory" was copied to "/parentDirectory" with new name "newDirectory"
     *                 console.log(directory.isFile); //false
     *                 console.log(directory.isDirectory); //true
     *                 console.log(directory.name); // "newDirectory"
     *                 console.log(directory.fullPath); // "/parentDirectory/newDirectory"
     *                 console.log(directory.filesystem); // "/"
     *             }, null);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.copyTo = function(parent, newName, successCallback, errorCallback) {
        var fail = function(code) {
            if (typeof errorCallback === 'function') {
                errorCallback(new FileError(code));
            }
        };
        // user must specify parent Entry
        if (!parent) {
            fail(FileError.NOT_FOUND_ERR);
            return;
        }
        // source path
        var srcPath = this.fullPath,
            // entry name
            name = newName || this.name,
            // success callback
            success = function(entry) {
                if (entry) {
                    if (typeof successCallback === 'function') {
                        // create appropriate Entry object
                        var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                            result = (entry.isDirectory) ?
                            new GDDirectoryEntry(entry.name, entry.fullPath, fs) :
                            new FileEntry(entry.name, entry.fullPath, fs);

                        try {
                            successCallback(result);
                        } catch (e) {
                            throw new Error('Error invoking callback: ' + e);
                        }
                    }
                } else {
                    // no Entry object returned
                    fail(FileError.NOT_FOUND_ERR);
                }
            };
        cordovaExec(success, fail, "GDStorage", "copyTo", [srcPath, parent.fullPath, name]);
    };

    /**
     * @function GDDirectoryEntry#toURL
     * @description Return a URL that can be used to identify this entry.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "test",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         console.log(directory.toURL()); // "/test"
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.toURL = function() {
        // fullPath attribute contains the full URL
        return this.fullPath;
    };

    /**
     * @function GDDirectoryEntry#remove
     * @description Remove a file or directory. It is an error to attempt to delete a
     * directory that is not empty. It is an error to attempt to delete a
     * root directory of a file system.
     * @param {function} successCallback Called with no parameters
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "test",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory(path, options, function (directory) {
     *         directory.remove();
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.remove = function(successCallback, errorCallback) {
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(successCallback, fail, "GDStorage", "remove", [this.fullPath]);
    };

    /**
     * @function GDDirectoryEntry#getParent
     * @description Look up the parent GDDirectoryEntry of this entry.
     * @param {function} successCallback Called with the parent GDDirectoryEntry object
     * @param {function} errorCallback Called with a FileError
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getDirectory("parentDirectory", options, function (parentDirectory) {
     *         // "/parentDirectory" is created here
     *         fileSystem.root.getDirectory("parentDirectory/nestedDirectory", options, function (nestedDirectory) {
     *             // "/nestedDirectory" is created here
     *             nestedDirectory.getParent(function (directory) {
     *                 console.log(directory.isFile); //false
     *                 console.log(directory.isDirectory); //true
     *                 console.log(directory.name); // "parentDirectory"
     *                 console.log(directory.fullPath); // "/parentDirectory"
     *                 console.log(directory.filesystem); // "/"
     *             }, null);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDDirectoryEntry.prototype.getParent = function(successCallback, errorCallback) {
        var win = typeof successCallback !== 'function' ? null : function(result) {
            var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                entry = new GDDirectoryEntry(result.name, result.fullPath, fs);

            successCallback(entry);
        };
        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(win, fail, "GDStorage", "getParent", [this.fullPath]);
    };

    // hide functions implementation in web inspector
    for (protoFunction in GDDirectoryEntry.prototype) {
        if (GDDirectoryEntry.prototype.hasOwnProperty(protoFunction)) {

            // Checking, if function property 'name' is configurable
            // (for old browser, which has pre-ES2015 implementation(Android 5.0) function name property isn't configurable)
            var objProtoProperty = GDDirectoryEntry.prototype[protoFunction],
                isFuncNamePropConfigurable = Object.getOwnPropertyDescriptor(objProtoProperty, 'name').configurable;

            if (isFuncNamePropConfigurable) {
                Object.defineProperty(GDDirectoryEntry.prototype[protoFunction],
                    'name', {
                        value: protoFunction,
                        configurable: false
                    }
                );
            }

            Object.defineProperty(GDDirectoryEntry.prototype[protoFunction],
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

    Object.preventExtensions(GDDirectoryEntry.prototype);

    DirectoryEntry = GDDirectoryEntry;

    module.exports = DirectoryEntry;
})();
