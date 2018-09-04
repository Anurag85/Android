/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        ProgressEvent = require('cordova-plugin-bbd-storage.ProgressEvent'),
        FileError = require('cordova-plugin-bbd-storage.FileError');

    //***************************** GDFileWriter ********************************//
    /**
     * @class GDFileWriter
     * @classdesc This class writes to the mobile device file system.
     * @param {file} file File object containing file properties
     * @param {bool} append if true write to the end of the file, otherwise overwrite the file
     */
    var GDFileWriter = function(file) {
        var fileName = "",
            length = 0;
        if (file) {
            fileName = file.fullPath || file;
            length = file.size || 0;
        }
        // default is to write at the beginning of the file
        var position = 0,
            readyState = 0, // EMPTY
            result = null,
            // Error
            error = null,
            // Event handlers
            onwritestart = null, // When writing starts
            onprogress = null, // While writing the file, and reporting partial file data
            onwrite = null, // When the write has successfully completed.
            onwriteend = null, // When the request has completed (either in success or failure).
            onabort = null, // When the write has been aborted. For instance, by invoking the abort() method.
            onerror = null; // When the write has failed (see errors).

        Object.defineProperties(this, {
            'fileName': {
                get: function() {
                    return fileName;
                },
                set: function(name) {
                    fileName = name;
                }
            },
            'length': {
                get: function() {
                    return length;
                },
                set: function(newLength) {
                    length = newLength;
                }
            },
            'position': {
                get: function() {
                    return position;
                },
                set: function(newPosition) {
                    position = newPosition;
                }
            },
            'readyState': {
                get: function() {
                    return readyState;
                },
                set: function(newState) {
                    readyState = newState;
                }
            },
            'result': {
                get: function() {
                    return result;
                },
                set: function(res) {
                    result = res;
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
            'onwritestart': {
                get: function() {
                    return onwritestart;
                },
                set: function(callback) {
                    onwritestart = callback;
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
            'onwrite': {
                get: function() {
                    return onwrite;
                },
                set: function(callback) {
                    onwrite = callback;
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
            'onwriteend': {
                get: function() {
                    return onwriteend;
                },
                set: function(callback) {
                    onwriteend = callback;
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
                    return '[object GDFileWriter]';
                }
            }
        });
    };

    // States
    Object.defineProperties(GDFileWriter, {
        'INIT': {
            value: 0
        },
        'WRITING': {
            value: 1
        },
        'DONE': {
            value: 2
        },
        'toString': {
            value: function() {
                return 'function GDFileWriter() { [native code] }';
            }
        }
    });

    Object.preventExtensions(GDFileWriter);

    /**
     * @function GDFileWriter#abort
     * @Description Abort writing file.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.write("text");
     *             writer.abort();
     *             writer.onabort = function() {
     *                 console.log("Writing was aborted");
     *             };
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileWriter.prototype.abort = function() {
        // check for invalid state
        if (this.readyState === GDFileWriter.DONE || this.readyState === GDFileWriter.INIT) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }

        // set error
        this.error = new FileError(FileError.ABORT_ERR);

        this.readyState = GDFileWriter.DONE;

        // If abort callback
        if (typeof this.onabort === "function") {
            this.onabort(new ProgressEvent("abort", { "target": this }));
        }

        // If write end callback
        if (typeof this.onwriteend === "function") {
            this.onwriteend(new ProgressEvent("writeend", { "target": this }));
        }
    };

    /**
     * @function GDFileWriter#write
     * @Description Writes data to the file
     * @param {string} data Data to be written. Supports string and binary (Blob and ArrayBuffer)
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 console.log("Content was written to the file");
     *             };
     *             writer.write("text");
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileWriter.prototype.write = function(data) {

        var that = this,
            supportsBinary = (typeof window.Blob !== 'undefined' &&
                typeof window.ArrayBuffer !== 'undefined'),
            isBinary;

        // Check to see if the incoming data is a blob
        if (data instanceof File || (supportsBinary && data instanceof Blob)) {
            var fileReader = new FileReader();

            fileReader._realReader.onload = function() {
                // Call this method again, with the arraybuffer as argument
                GDFileWriter.prototype.write.call(that, this.result);
            };
            if (supportsBinary) {
                fileReader._realReader.readAsArrayBuffer(data);
            } else {
                fileReader.readAsText(data);
            }
            return;
        }

        // Mark data type for safer transport over the binary bridge
        isBinary = supportsBinary && (data instanceof ArrayBuffer);

        // Throw an exception if we are already writing a file
        if (this.readyState === GDFileWriter.WRITING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }
        // WRITING state
        this.readyState = GDFileWriter.WRITING;
        var self = this;
        // If onwritestart callback
        if (typeof self.onwritestart === "function") {
            self.onwritestart(new ProgressEvent("writestart", { "target": self }));
        }

        // Write file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileWriter.DONE) {
                    return;
                }

                // position always increases by bytes written because file would be extended
                self.position += result;
                // The length of the file is now where we are done writing.

                self.length = self.position;

                // DONE state
                self.readyState = GDFileWriter.DONE;

                // If onwrite callback
                if (typeof self.onwrite === "function") {
                    self.onwrite(new ProgressEvent("write", { "target": self }));
                }

                // If onwriteend callback
                if (typeof self.onwriteend === "function") {
                    self.onwriteend(new ProgressEvent("writeend", { "target": self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileWriter.DONE) {
                    return;
                }

                // DONE state
                self.readyState = GDFileWriter.DONE;

                // Save error
                self.error = new FileError(error);

                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { "target": self }));
                }

                // If onwriteend callback
                if (typeof self.onwriteend === "function") {
                    self.onwriteend(new ProgressEvent("writeend", { "target": self }));
                }
            }, "GDStorage", "write", [this.fileName, data, this.position, isBinary]);
    };

    /**
     * @function GDFileWriter#seek
     * @Description Moves the file pointer to the location specified.
     * If the offset is a negative number the position of the file
     * pointer is rewound.  If the offset is greater than the file
     * size the position is set to the end of the file.
     * @param {integer} offset Is the location to move the file pointer to.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 console.log("Content was written to the file");
     *             };
     *             writer.write("text");
     *             writer.seek(0); // Pointer is at the beginning of the file now
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileWriter.prototype.seek = function(offset) {
        // Throw an exception if we are already writing a file
        if (this.readyState === GDFileWriter.WRITING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }

        if (!offset && offset !== 0) {
            return;
        }

        // See back from end of file.
        if (offset < 0) {
            this.position = Math.max(offset + this.length, 0);
        }
        // Offset is bigger then file size so set position
        // to the end of the file.
        else if (offset > this.length) {
            this.position = this.length;
        }
        // Offset is between 0 and file size so set the position
        // to start writing.
        else {
            this.position = offset;
        }
    };

    /**
     * @function GDFileWriter#truncate
     * @Description Truncates the file to the size specified.
     * @param {integer} size Size to chop the file at.
     *
     * @example
     * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
     *     var path = "file.txt",
     *         options = {create: true, exclusive: false};
     *
     *     fileSystem.root.getFile(path, options, function (file) {
     *         file.createWriter(function (writer) {
     *             writer.onwriteend = function() {
     *                 console.log("Content was written to the file");
     *             };
     *             writer.write("text");
     *             writer.truncate(2); // now content of file will be "te"
     *         }, null);
     *     }, null);
     * }, null);
     */
    GDFileWriter.prototype.truncate = function(size) {
        // Throw an exception if we are already writing a file
        if (this.readyState === GDFileWriter.WRITING) {
            throw new FileError(FileError.INVALID_STATE_ERR);
        }

        // WRITING state
        this.readyState = GDFileWriter.WRITING;

        var self = this;

        // If onwritestart callback
        if (typeof self.onwritestart === "function") {
            self.onwritestart(new ProgressEvent("writestart", { "target": this }));
        }

        // Write file
        cordovaExec(
            // Success callback
            function(result) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileWriter.DONE) {
                    return;
                }

                // DONE state
                self.readyState = GDFileWriter.DONE;

                // Update the length of the file
                self.length = result;
                self.position = Math.min(self.position, result);

                // If onwrite callback
                if (typeof self.onwrite === "function") {
                    self.onwrite(new ProgressEvent("write", { "target": self }));
                }

                // If onwriteend callback
                if (typeof self.onwriteend === "function") {
                    self.onwriteend(new ProgressEvent("writeend", { "target": self }));
                }
            },
            // Error callback
            function(error) {
                // If DONE (cancelled), then don't do anything
                if (self.readyState === GDFileWriter.DONE) {
                    return;
                }

                // DONE state
                self.readyState = GDFileWriter.DONE;

                // Save error
                self.error = new FileError(error);

                // If onerror callback
                if (typeof self.onerror === "function") {
                    self.onerror(new ProgressEvent("error", { "target": self }));
                }

                // If onwriteend callback
                if (typeof self.onwriteend === "function") {
                    self.onwriteend(new ProgressEvent("writeend", { "target": self }));
                }
            }, "GDStorage", "truncate", [this.fileName, size]);
    };

    // hide functions implementation in web inspector
    for (protoFunction in GDFileWriter.prototype) {
        if (GDFileWriter.prototype.hasOwnProperty(protoFunction)) {
            Object.defineProperty(GDFileWriter.prototype[protoFunction],
                'name', { value: protoFunction, writable: false }
            );

            Object.defineProperty(GDFileWriter.prototype[protoFunction],
                'toString', {
                    value: function() {
                        return 'function ' + this.name + '() { [native code] }';
                    },
                    writable: false
                });
        }
    }

    Object.preventExtensions(GDFileWriter.prototype);

    FileWriter = GDFileWriter;

    module.exports = FileWriter;
})();
