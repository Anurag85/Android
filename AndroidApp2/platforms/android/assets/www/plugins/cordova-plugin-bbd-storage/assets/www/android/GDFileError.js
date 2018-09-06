cordova.define("cordova-plugin-bbd-storage.FileError", function(require, exports, module) {
/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    /**
     * @class GDFileError
     *
     * @classdesc Describes error codes when working with files.
     * @property {Number} NOT_FOUND_ERR 1
     * @property {Number} SECURITY_ERR 2
     * @property {Number} ABORT_ERR 3
     * @property {Number} NOT_READABLE_ERR 4
     * @property {Number} ENCODING_ERR 5
     * @property {Number} NO_MODIFICATION_ALLOWED_ERR 6
     * @property {Number} INVALID_STATE_ERR 7
     * @property {Number} SYNTAX_ERR 8
     * @property {Number} INVALID_MODIFICATION_ERR 9
     * @property {Number} QUOTA_EXCEEDED_ERR 10
     * @property {Number} TYPE_MISMATCH_ERR 11
     * @property {Number} PATH_EXISTS_ERR 12
     *
     * @example
     * // This object is used by other classes and is not used directly
     * function errorCallback (error) {
     *     console.log(error.code); // 1, 2, 3, ...
     * }
     */
    function GDFileError(error) {
        var code = error || null;
        Object.defineProperties(this, {
            'code': {
                get: function() {
                    return code;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDFileError]';
                }
            }
        });
    };

    Object.defineProperties(GDFileError, {
        'NOT_FOUND_ERR': {
            value: 1
        },
        'SECURITY_ERR': {
            value: 2
        },
        'ABORT_ERR': {
            value: 3
        },
        'NOT_READABLE_ERR': {
            value: 4
        },
        'ENCODING_ERR': {
            value: 5
        },
        'NO_MODIFICATION_ALLOWED_ERR': {
            value: 6
        },
        'INVALID_STATE_ERR': {
            value: 7
        },
        'SYNTAX_ERR': {
            value: 8
        },
        'INVALID_MODIFICATION_ERR': {
            value: 9
        },
        'QUOTA_EXCEEDED_ERR': {
            value: 10
        },
        'TYPE_MISMATCH_ERR': {
            value: 11
        },
        'PATH_EXISTS_ERR': {
            value: 12
        },
        'toString': {
            value: function() {
                return 'function GDFileError() { [native code] }';
            }
        }
    });

    Object.preventExtensions(GDFileError);

    FileError = GDFileError;

    module.exports = FileError;
})();

// End the Module Definition.
//************************************************************************************************

});
