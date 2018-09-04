cordova.define("cordova-plugin-bbd-storage.FileReader", function(require, exports, module) {
/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        ProgressEvent = require('cordova-plugin-bbd-storage.ProgressEvent'),
        FileError = require('cordova-plugin-bbd-storage.FileError');

    //************************************ GDFileReader ****************************
    /**
     * @class GDFileReader
     * @classdesc GDFileReader is an object that allows one to read a file from the BlackBerry Dynamics secure file system.
     * Implements the GDFileSystem APIs.
     * @property {string} fileName File name of a secured file.
     * @property {integer} readyState One of the three states the reader can be in EMPTY, LOADING or DONE.
     * @property {string} result The contents of the file that has been read.
     * @property {FileError} error An object containing errors.
     * @property {function} onloadstart Called when the read starts.
     * @property {function} onprogress Called while reading the file, reports progress (progess.loaded/progress.total).
     * -NOT SUPPORTED
     * @property {function} onload Called when the read has successfully completed.
     * @property {function} onerror Called when the read has been aborted. For instance, by invoking the abort() method.
     * @property {function} onloadend Called when the read has failed.
     * @property {function} onabort  Called when the request has completed (either in success or failure).
     */
    //get native FileReader
    var origFileReader = getOriginalSymbol(window, 'FileReader');

    function getOriginalSymbol(context, symbolPath) {
        var parts = symbolPath.split('.'),
            obj = context;

        parts.forEach(function(part) { obj = obj && obj[part]; });

        return obj;
    };

    var GDFileReader = function() {
        var fileName = "",
            readyState = 0, // FileReader.EMPTY
            // File data
            result = null,
            // Error
            error = null,
            // Event handlers
            realReader = origFileReader ? new origFileReader() : {}, //original FileReader
            onloadstart = null, // When the read starts.
            onprogress = null, // While reading (and decoding) file or fileBlob data,
            // and reporting partial file data (progess.loaded/progress.total)
            onload = null, // When the read has successfully completed.
            onerror = null, // When the read has failed (see errors).
            onloadend = null, // When the request has completed (either in success or failure).
            onabort = null; // When the read has been aborted. For instance, by invoking the abort() method.

        Object.defineProperties(this, {
            'fileName': {
                get: function() {
                    return fileName;
                },
                set: function(name) {
                    fileName = name;
                }
            },
            'readyState': {
                get: function() {
                    return readyState;
                },
                set: function(state) {
                    readyState = state;
                }
            },
            'result': {
                get: function() {
                    return result;
                },
                set: function(fileResult) {
                    result = fileResult;
                }
            },
            'error': {
                get: function() {
                    return error;
                },
                set: function(err) {
                    error = err;
                }
            },
            '_realReader': {
                get: function() {
                    return realReader;
                }
            },
            'onloadstart': {
                get: function() {
                    return onloadstart;
                },
                set: function(callback) {
                    onloadstart = callback;
                }
            },
            'onprogress': {
                get: function() {
                    return onprogress;
                },
                set: function(callback) {
                    onprogress = callback;
                }
            },
            'onload': {
                get: function() {
                    return onload;
                },
                set: function(callback) {
                    onload = callback;
                }
            },
            'onerror': {
                get: function() {
                    return onerror;
                },
                set: function(callback) {
                    onerror = callback;
                }
            },
            'onloadend': {
                get: function() {
                    return onloadend;
                },
                set: function(callback) {
                    onloadend = callback;
                }
            },
            'onabort': {
                get: function() {
                    return onabort;
                },
                set: function(callback) {
                    onabort = callback;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDFileReader]';
                }
            }
        });
    };

    // States
    Object.defineProperties(GDFileReader, {
        'EMPTY': {
            value: 0
        },
        'LOADING': {
            value: 1
        },
        'DONE': {
            value: 2
        },
        'toString': {
            value: function() {
                return 'function GDFileReader() { [native code] }';
            }
        }
    });

    Object.preventExtensions(GDFileReader);

    /**
     * @function GDFileReader#abort
     * @description abort -  Aborts reading file.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.file(function (file) {
     *             var reader = new FileReader();
     *             reader.readAsText(file);
     *             reader.abort();
     *             reader.onabort = function() {
     *                 console.log("Reading was aborted");
     *             };
     *         });
     *     }, null);
     * }, null);
     */
    GDFileReader.prototype.abort = function() {
        this.result = null;
        if (this.readyState === GDFileReader.DONE || this.readyState === GDFileReader.EMPTY) {
            return;
        }
        this.readyState = GDFileReader.DONE;
        // If abort callback
        if (typeof this.onabort === 'function') {
            this.onabort(new ProgressEvent('abort', { target: this }));
        }
        // If load end callback
        if (typeof this.onloadend === 'function') {
            this.onloadend(new ProgressEvent('loadend', { target: this }));
        }
    };

    /**
     * @function GDFileReader#readAsText
     * @description readAsText - Reads text file.
     * @param {GDFile} file Function to invoke upon successful completion of the request.
     * @param {string} encoding The encoding to use to encode the file's content. Default is UTF8.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 file.file(function (file) {
     *                     var reader = new FileReader();
     *                     reader.readAsText(file);
     *                     reader.onloadend = function (evt) {
     *                         console.log(evt.target.result); // "text"
     *                     };
     *                 });
     *             };
     *             writer.write("text");
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileReader.prototype.readAsText = function(file, encoding) {
        // Figure out pathing
        this.fileName = '';
        if (typeof file.fullPath === 'undefined') {
            this.fileName = file;
        } else {
            this.fileName = file.fullPath;
        }
        // Already loading something
        if (this.readyState === GDFileReader.LOADING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }
        // LOADING state
        this.readyState = GDFileReader.LOADING;
        // If loadstart callback
        if (typeof this.onloadstart === "function") {
            this.onloadstart(new ProgressEvent("loadstart", { target: this }));
        }
        // Default encoding is UTF-8
        var encType = encoding ? encoding : "UTF-8";
        var self = this;
        // Read file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileReader.DONE) {
                    return;
                }
                // Save result
                self.result = result;
                // If onload callback
                if (typeof self.onload === "function") {
                    self.onload(new ProgressEvent("load", { target: self }));
                }
                // DONE state
                self.readyState = GDFileReader.DONE;
                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileReader.DONE) {
                    return;
                }
                // DONE state
                self.readyState = GDFileReader.DONE;
                // null result
                self.result = null;
                // Save error
                self.error = new FileError(error);
                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { target: self }));
                }
                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            }, "GDStorage", "readAsText", [this.fileName, encType]);
    };

    /**
     * @function GDFileReader#readAsDataURL
     * @Description Read file and return data as a base64 encoded data url.
     * A data url is of the form: data:[<mediatype>][;base64],<data>
     * @param {GDFile} file File object containing file properties
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "logo.png",
     *         options = {create: true, exclusive: false},
     *         contentType = 'image/png',
     *         b64Data = 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             function b64toBlob(b64Data, contentType, sliceSize) {
     *                 contentType = contentType || '';
     *                 sliceSize = sliceSize || 512;
     *
     *                 var byteCharacters = atob(b64Data);
     *                 var byteArrays = [];
     *
     *                 for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
     *                     var slice = byteCharacters.slice(offset, offset + sliceSize);
     *
     *                     var byteNumbers = new Array(slice.length);
     *                     for (var i = 0; i < slice.length; i++) {
     *                         byteNumbers[i] = slice.charCodeAt(i);
     *                     }
     *
     *                     var byteArray = new Uint8Array(byteNumbers);
     *
     *                     byteArrays.push(byteArray);
     *                 }
     *
     *                 var blob = new Blob(byteArrays, {type: contentType});
     *                 return blob;
     *             }
     *             var blob = b64toBlob(b64Data, contentType);
     *
     *             writer.seek(writer.length);
     *             writer.onwriteend = function() {
     *                 file.file(function (file) {
     *                     var reader = new FileReader();
     *                     reader.readAsDataURL(file);
     *                     reader.onloadend = function (evt) {
     *                         console.log(evt.target.result); // "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg=="
     *                     };
     *                 });
     *             };
     *             writer.write(blob);
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileReader.prototype.readAsDataURL = function(file) {
        this.fileName = "";
        if (typeof file.fullPath === "undefined") {
            this.fileName = file;
        } else {
            this.fileName = file.fullPath;
        }
        // Already loading something
        if (this.readyState === FileReader.LOADING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }
        // LOADING state
        this.readyState = FileReader.LOADING;
        // If loadstart callback
        if (typeof this.onloadstart === "function") {
            this.onloadstart(new ProgressEvent("loadstart", { target: this }));
        }
        var self = this;
        // Read file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }

                // DONE state
                self.readyState = FileReader.DONE;

                // Save result
                self.result = 'data:' + file.type + ';base64,' + result;

                // If onload callback
                if (typeof self.onload === "function") {
                    self.onload(new ProgressEvent("load", { target: self }));
                }

                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }
                // DONE state
                self.readyState = FileReader.DONE;
                self.result = null;
                // Save error
                self.error = new FileError(error);
                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { target: self }));
                }
                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            }, "GDStorage", "readAsDataURL", [this.fileName]);
    };

    /**
     * @function GDFileReader#readAsBinaryString
     * @Description Read file and return data as a binary data.
     * @param {GDFile} file File object containing file properties
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 file.file(function (file) {
     *                     var reader = new FileReader();
     *                     reader.readAsBinaryString(file);
     *                     reader.onloadend = function (evt) {
     *                         console.log(evt.target.result); // "text"
     *                     };
     *                 });
     *             };
     *             writer.write("text");
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileReader.prototype.readAsBinaryString = function(file) {
        this.fileName = "";
        if (typeof file.fullPath === "undefined") {
            this.fileName = file;
        } else {
            this.fileName = file.fullPath;
        }
        // Already loading something
        if (this.readyState === FileReader.LOADING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }
        // LOADING state
        this.readyState = FileReader.LOADING;
        // If loadstart callback
        if (typeof this.onloadstart === "function") {
            this.onloadstart(new ProgressEvent("loadstart", { target: this }));
        }
        var self = this;
        // Read file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }

                // DONE state
                self.readyState = FileReader.DONE;

                // Save result
                self.result = result;

                // If onload callback
                if (typeof self.onload === "function") {
                    self.onload(new ProgressEvent("load", { target: self }));
                }

                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }
                // DONE state
                self.readyState = FileReader.DONE;
                self.result = null;
                // Save error
                self.error = new FileError(error);
                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { target: self }));
                }
                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            }, "GDStorage", "readAsBinaryString", [this.fileName]);
    };

    /**
     * @function GDFileReader#readAsArrayBuffer
     * @Description Read file and return data as a binary data.
     * @param {GDFile} file File object containing file properties
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 file.file(function (file) {
     *                     var reader = new FileReader();
     *                     reader.readAsArrayBuffer(file);
     *                     reader.onloadend = function (evt) {
     *                         console.log(evt.target.result.toString()); // "[object ArrayBuffer]"
     *                     };
     *                 });
     *             };
     *             writer.write("text");
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileReader.prototype.readAsArrayBuffer = function(file) {
        this.fileName = "";
        if (typeof file.fullPath === "undefined") {
            this.fileName = file;
        } else {
            this.fileName = file.fullPath;
        }
        // Already loading something
        if (this.readyState === FileReader.LOADING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }
        // LOADING state
        this.readyState = FileReader.LOADING;
        // If loadstart callback
        if (typeof this.onloadstart === "function") {
            this.onloadstart(new ProgressEvent("loadstart", { target: this }));
        }
        var self = this;
        // Read file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }

                // DONE state
                self.readyState = FileReader.DONE;

                // Save result
                self.result = result;

                // If onload callback
                if (typeof self.onload === "function") {
                    self.onload(new ProgressEvent("load", { target: self }));
                }

                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === FileReader.DONE) {
                    return;
                }
                // DONE state
                self.readyState = FileReader.DONE;
                self.result = null;
                // Save error
                self.error = new FileError(error);
                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { target: self }));
                }
                // If onloadend callback
                if (typeof self.onloadend === "function") {
                    self.onloadend(new ProgressEvent("loadend", { target: self }));
                }
            }, "GDStorage", "readAsArrayBuffer", [this.fileName]);
    };

    // hide functions implementation in web inspector
    for (protoFunction in GDFileReader.prototype) {
        if (GDFileReader.prototype.hasOwnProperty(protoFunction)) {

            // Checking, if function property 'name' is configurable
            // (for old browser, which has pre-ES2015 implementation(Android 5.0) function name property isn't configurable)
            var objProtoProperty = GDFileReader.prototype[protoFunction],
                isFuncNamePropConfigurable = Object.getOwnPropertyDescriptor(objProtoProperty, 'name').configurable;

            if (isFuncNamePropConfigurable) {
                Object.defineProperty(GDFileReader.prototype[protoFunction],
                    'name', {
                        value: protoFunction,
                        configurable: false
                    }
                );
            }

            Object.defineProperty(GDFileReader.prototype[protoFunction],
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

    Object.preventExtensions(GDFileReader.prototype);

    FileReader = GDFileReader;

    module.exports = FileReader;
})();
});
