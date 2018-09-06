/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    //************************************* GDFile **********************//
    /**
     * @class GDFile
     * @classdesc This object contains attributes of a single file.
     * @property {string} name  Name of the file, without path information
     * @property {string} fullPath The full path of the file, including the name
     * @property {string} type Mime type
     * @property {date} lastModifiedDate Last modified date
     * @property {number} size Size of the file in bytes
     *
     * @example
     * // This object is used by GDFileEntry.file() method to initilize the file and is not used directly
     */
    var GDFile = function(name, fullPath, type, lastModifiedDate, size) {
        var fileName = name || '',
            fileFullPath = fullPath || null,
            fileType = type || null,
            fileLastModifiedDate = lastModifiedDate || null,
            fileSize = size || 0;

        Object.defineProperties(this, {
            'name': {
                get: function() {
                    return fileName;
                }
            },
            'fullPath': {
                get: function() {
                    return fileFullPath;
                }
            },
            'type': {
                get: function() {
                    return fileType;
                }
            },
            'lastModifiedDate': {
                get: function() {
                    return fileLastModifiedDate;
                }
            },
            'size': {
                get: function() {
                    return fileSize;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDFile]';
                }
            }
        });
    };

    Object.defineProperty(GDFile, 'toString', {
        value: function() {
            return 'function GDFile() { [native code] }';
        }
    });

    Object.preventExtensions(GDFile);

    File = GDFile;

    module.exports = File;
})();
