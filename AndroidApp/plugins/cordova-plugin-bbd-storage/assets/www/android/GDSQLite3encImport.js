/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    var cordovaExec = require('cordova/exec'),
        FileEntry = require('cordova-plugin-bbd-storage.FileEntry'),
        FileError = require('cordova-plugin-bbd-storage.FileError');

    //***************************** sqlite3enc_import ********************************//

    /**
     * @class GDSQLite3encImport
     *
     * @classdesc Wrapper for sqlite3enc_import method
     */

    /**
     * @function GDSQLite3encImport#sqlite3enc_import
     * @description This method will return a Secure Database object. Use the Database Object to manipulate the data.
     * @property {string} srcFilename Full path, within the secure file system, of the plain SQLite database file to be imported.
     * @property {string} destFilename Full path of the database to be created. If the database already exists, its contents will be overwritten.
     * @param {Function} successCallback Callback to be invoked when upload has completed
     * @param {Function} errorCallback Callback to be invoked upon error
     *
     *
     * @example
     * function success(dbFile) {
     *     console.log("Imported Database Path: " + dbFile.fullPath);
     *     db = window.openDatabase(dbFile.fullPath, "1.0", "Secure SQLite", 200000);
     * }
     *
     * function fail(error) {
     *     alert(error.code);
     * }
     *
     * function importSQLiteFile(entry) {
     *  sqlite3enc_import(entry.fullPath,"/SecureSQLite3.db",success,fail);
     * }
     */
    //const char *srcFilename, const char *destFilename
    var gdSQLite3enc_import = function(srcFilename, destFilename, successCallback, errorCallback) {
        var win = typeof successCallback !== 'function' ? null : function(result) {
            var fs = new(require('cordova-plugin-bbd-storage.FileSystem'))('GDFileSystem'),
                dbFileEntry = new FileEntry(result.name, result.fullPath, fs);
            dbFileEntry.isDirectory = false;
            dbFileEntry.isFile = true;
            successCallback(dbFileEntry);
        };

        var fail = typeof errorCallback !== 'function' ? null : function(code) {
            errorCallback(new FileError(code));
        };

        cordovaExec(win, fail, "GDStorage", "sqlite3enc_import", [srcFilename, destFilename]);
    };

    Object.defineProperty(gdSQLite3enc_import, 'toString', {
        value: function() {
            return 'function gdSQLite3enc_import() { [native code] }';
        }
    });

    sqlite3enc_import = gdSQLite3enc_import;

    module.exports = sqlite3enc_import;
})();