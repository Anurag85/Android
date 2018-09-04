cordova.define("cordova-plugin-bbd-storage.Metadata", function(require, exports, module) {
/**
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    /**
     * @class GDMetadata
     *
     * @classdesc Information about the state of the file or directory
     * @property {Date} modificationTime The time the file/directory was modified last time
     * @property {Number} size The size of file/directory
     *
     * @example
     * // This object is used by GDDirectoryEntry.getMetadata() and GDFileEntry.getMetadata() methods and is not used directly
     */
    var GDMetadata = function(metadata) {
        var modificationTime = metadata.modificationTime || metadata,
            size = metadata.size || 0;

        if (modificationTime) {
            modificationTime = new Date(parseInt(modificationTime));
        } else {
            modificationTime = null;
        }

        Object.defineProperties(this, {
            'modificationTime': {
                get: function() {
                    return modificationTime;
                }
            },
            'size': {
                get: function() {
                    return size;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDMetadata]';
                }
            }
        });
    };

    Object.defineProperty(GDMetadata, 'toString', {
        value: function() {
            return 'function GDMetadata() { [native code] }';
        }
    });

    Object.preventExtensions(GDMetadata);

    Metadata = GDMetadata;

    module.exports = Metadata;
})();

// End the Module Definition.
//************************************************************************************************

});
