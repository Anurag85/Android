/**
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    /**
     * @class GDFileUploadOptions
     *
     * @classdesc Options to customize the HTTP request used to upload files.
     * @example
     * var ft = new FileTransfer(),
     *     options = new FileUploadOptions();
     * options.fileKey = "file";
     * options.fileName = "data.json";
     * options.mimeType = "text/json";
     */
    var GDFileUploadOptions = function(fileKey, fileName, mimeType, params, headers, httpMethod) {
        var options_fileKey = fileKey || null,
            options_fileName = fileName || null,
            options_mimeType = mimeType || null,
            options_params = params || null,
            options_headers = headers || null,
            options_httpMethod = httpMethod || null;

        Object.defineProperties(this, {
            'fileKey': {
                configurable: false,
                get: function() {
                    return options_fileKey;
                },
                set: function(fileKey) {
                    options_fileKey = fileKey;
                }
            },
            'fileName': {
                configurable: false,
                get: function() {
                    return options_fileName;
                },
                set: function(fileName) {
                    options_fileName = fileName;
                }
            },
            'mimeType': {
                configurable: false,
                get: function() {
                    return options_fileName;
                },
                set: function(mimeType) {
                    options_mimeType = mimeType;
                }
            },
            'params': {
                configurable: false,
                get: function() {
                    return options_params;
                },
                set: function(params) {
                    options_params = params;
                }
            },
            'headers': {
                configurable: false,
                get: function() {
                    return options_headers;
                },
                set: function(headers) {
                    options_headers = headers;
                }
            },
            'httpMethod': {
                configurable: false,
                get: function() {
                    return options_httpMethod;
                },
                set: function(httpMethod) {
                    options_httpMethod = httpMethod;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDFileUploadOptions]'
                }
            }
        })
    };

    Object.defineProperty(GDFileUploadOptions, 'toString', {
        value: function() {
            return 'function GDFileUploadOptions() { [native code] }';
        },
        writable: false
    })

    Object.preventExtensions(GDFileUploadOptions);

    FileUploadOptions = GDFileUploadOptions;

    module.exports = FileUploadOptions;
})();
