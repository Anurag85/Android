/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    /********************GDLocalFileSystem***********************/
    /**
     * @class GDLocalFileSystem
     * @classdesc This object provides a way to obtain root secure file systems. GDFileSystem
     *
     * @example
     *
     * console.log(GDLocalFileSystem.TEMPORARY); // 0 - temporary, with no guarantee of persistence
     * console.log(GDLocalFileSystem.PERSISTENT); // 1 - persistent
     */
    var GDLocalFileSystem = function() {
        Object.defineProperties(this, {
            'toString': {
                value: function() {
                    return '[object GDLocalFileSystem]';
                }
            }
        });
    };

    Object.defineProperties(GDLocalFileSystem, {
        'TEMPORARY': {
            value: 0
        },
        'PERSISTENT': {
            value: 1
        },
        'toString': {
            value: function() {
                return 'function GDLocalFileSystem() { [native code] }';
            }
        }
    });

    Object.preventExtensions(GDLocalFileSystem);

    LocalFileSystem = GDLocalFileSystem

    module.exports = LocalFileSystem;
})();
