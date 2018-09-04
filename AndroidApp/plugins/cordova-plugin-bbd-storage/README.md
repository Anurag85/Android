BBD Storage plugin
==================
> The Storage plugin in an interface representing a secure file system and secure storage.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-storage`

> __Note:__ `BBD Cordova Storage plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-storage
```

API reference
=============
`window.FileReader`
```javascript
/**
* @class GDFileReader
* @classdesc GDFileReader is an object that allows one to read a file from the BlackBerry Dynamics secure file system. Implements the GDFileSystem APIs.
* @property {string} fileName File name of a secured file.
* @property {integer} readyState One of the three states the reader can be in EMPTY, LOADING or DONE.
* @property {string} result The contents of the file that has been read.
* @property {FileError} error An object containing errors.
* @property {function} onloadstart Called when the read starts.
* @property {function} onprogress Called while reading the file, reports progress (progess.loaded/progress.total).
* @property {function} onload Called when the read has successfully completed.
* @property {function} onerror Called when the read has been aborted. For instance, by invoking the abort() method.
* @property {function} onloadend Called when the read has failed.
* @property {function} onabort  Called when the request has completed (either in success or failure).
*/
```

`window.FileReader.abort`
```javascript
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
```

`window.FileReader.readAsText`
```javascript
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
```

`window.FileReader.readAsDataURL`
```javascript
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
```

`window.FileReader.readAsBinaryString`
```javascript
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
```

`window.FileReader.readAsArrayBuffer`
```javascript
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
```

---

`window.requestFileSystem`
```javascript
/**
* @function GDRequestFileSystem#requestFileSystem
* @description requestFileSystem - Request a secure file system in which to store application data.
* @property {string} type Local secure file system type
* @property {integer} size  Indicates how much storage space, in bytes, the application expects (not supported)
* @param {function} successCallback Invoked with a FileSystem object
* @param {function} errorCallback Invoked if error occurs retrieving the secure file system
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     console.log(fileSystem.name);
*     console.log(fileSystem.root);
* });
*/
```

---

`window.resolveLocalFileSystemURI`
```javascript
/**
* @function GDResolveLocalFileSystemURI#resolveLocalFileSystemURI
* @description Look up file system Entry referred to by local URI.
* @param {string}  uri URI referring to a local file or directory
* @param {function} successCallback Invoked with Entry object corresponding to URI
* @param {function} errorCallback Invoked if error occurs retrieving file system entry
*
* @example
* resolveLocalFileSystemURI("file:///example.txt", function() {
*     console.log(file.isFile); // true
*     console.log(file.isDirectory); // false
*     console.log(file.name); // "example.txt"
*     console.log(file.fullPath); // "/example.txt"
*     console.log(file.filesystem); // "/"
* }, null);
*/
```

---

`window.sqlite3enc_import`
```javascript
/**
* @function sqlite3enc_import
* @description This method will return a Secure Database object. Use the Database Object to manipulate the data.
* @property {string} srcFilename Full path, within the secure file system, of the plain SQLite database file to be imported.
* @property {string} destFilename Full path of the database to be created. If the database already exists, its contents will be overwritten.
* @param {Function} successCallback Callback to be invoked when upload has completed
* @param {Function} errorCallback Callback to be invoked upon error
*/
function success(dbFile) {
    console.log("Imported Database Path: " + dbFile.fullPath);
    db = window.openDatabase(dbFile.fullPath, "1.0", "Secure SQLite", 200000);
}
function fail(error) {
    alert(error.code);
}

function importSQLiteFile(entry) {
    sqlite3enc_import(entry.fullPath,"/SecureSQLite3.db",success,fail);
}
```

---

`window.FileSystem`
```javascript
/**
* @class GDFileSystem
* @classdesc An interface representing a secure file system
* @property {string} name The unique name of the file system (readonly)
* @property {DirectoryEntry} root Root directory of the file system (readonly)
*/
```

`window.FileSystem.exportLogFileToDocumentsFolder`
```javascript
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
```

`window.FileSystem.uploadLogs`
```javascript
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
```

---

`window.DirectoryEntry`
```javascript
/**
* @class GDDirectoryEntry
* @classdesc An interface representing a directory on the file system.
* @property {boolean} isFile Always false (readonly)
* @property {boolean} isDirectory Always true (readonly)
* @property {string} name Name of the directory, excluding the path leading to it (readonly)
* @property {string} fullPath The absolute full path to the directory (readonly)
* @property {FileSystem} filesystem Filesystem on which the directory resides (readonly) - not supported by Cordova
*/
```

`window.DirectoryEntry.createReader`
```javascript
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
```

`window.DirectoryEntry.getDirectory`
```javascript
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
```

`window.DirectoryEntry.removeRecursively`
```javascript
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
```

`window.DirectoryEntry.getFile`
```javascript
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
```

`window.DirectoryEntry.getMetadata`
```javascript
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
```

`window.DirectoryEntry.moveTo`
```javascript
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
```

`window.DirectoryEntry.copyTo`
```javascript
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
```

`window.DirectoryEntry.toURL`
```javascript
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
```

`window.DirectoryEntry.remove`
```javascript
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
```

`window.DirectoryEntry.getParent`
```javascript
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
```

---

`window.DirectoryReader`
```javascript
/**
* @class GDDirectoryReader
* @classdesc  An interface that lists the files and directories in a directory.
*/
```

`window.DirectoryReader.readEntries`
```javascript
/**
* @function GDDirectoryReader#readEntries
* @description Returns a list of entries from a directory.
* @param {function} successCallback Called with a list of entries
* @param {function} errorCallback Called with a FileError
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     var options = {create: true, exclusive: false};
*
*     fileSystem.root.getDirectory("parentDirectory", options, function (parentDirectory) {
*         // "/parentDirectory" is created here
*         fileSystem.root.getDirectory("parentDirectory/nestedDirectory", options, function (nestedDirectory) {
*             var directoryReader = parentDirectory.createReader();
*             directoryReader.readEntries(function (entries) {
*                 console.log(entries[0].isFile); //false
*                 console.log(entries[0].isDirectory); //true
*                 console.log(entries[0].name); // "nestedDirectory"
*                 console.log(entries[0].fullPath); // "/parentDirectory/nestedDirectory"
*                 console.log(entries[0].filesystem); // "/"
*                 console.log(entries.length); // 1
*             }, null);
*         }, null);
*     }, null);
* }, null);
*/
```

---

`window.FileEntry`
```javascript
/**
* @class GDFileEntry
* @classdesc An interface representing a directory on the file system.
* @property {boolean} isFile Always false (readonly)
* @property {boolean} isDirectory Always true (readonly)
* @property {string} name Name of the directory, excluding the path leading to it (readonly)
* @property {string} fullPath The absolute full path to the directory (readonly)
* @property {FileSystem} filesystem Filesystem on which the directory resides (readonly) - not supported by Cordova
*/
```

`window.FileEntry.file`
```javascript
/**
* @function GDFileEntry#file
* @description Returns a File that represents the current state of the file that this FileEntry represents.
* @param {function} successCallback Called with the new File object
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
*
*         file.file(function (file) {
*             console.log(file.name); // "file.txt"
*             console.log(file.fullPath); // "/file.txt"
*             console.log(file.lastModifiedDate);
*             console.log(file.size);
*             console.log(file.type);
*         }, null);
*     }, null);
* }, null);
*/
```

`window.FileEntry.createWriter`
```javascript
/**
* @function GDFileEntry#createWriter
* @descriptionCreates a new FileWriter associated with the file that this FileEntry represents.
* @param {function} successCallback Called with the new FileWriter
* @param {function} errorCallback Called with a FileError
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     var path = "file.txt",
*         options = {create: true, exclusive: false};
*
*     fileSystem.root.getFile(path, options, function (file) {
*         file.createWriter(function (writer) {
*             // here GDFileWriter methods such as writer.write(), writer.seek() and writer.truncate() are available
*         });
*     }, null);
* }, null);
*/
```

`window.FileEntry.getMetadata`
```javascript
/**
* @function GDFileEntry#getMetadata
* @description Look up the metadata of the entry.
* @param {function} successCallback Called with a Metadata object
* @param {function} errorCallback Called with a FileError
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     var path = "file.txt",
*         options = {create: true, exclusive: false};
*
*     fileSystem.root.getFile(path, options, function (file) {
*         file.getMetadata(function (metadata) {
*             console.log(metadata.modificationTime);
*             console.log(metadata.size);
*         }, null);
*     }, null);
* }, null);
*/
```

`window.FileEntry.moveTo`
```javascript
/**
* @function GDFileEntry#moveTo
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
*         fileSystem.root.getFile("file.txt", options, function (nestedFile) {
*             // "/file.txt" is created here
*             nestedFile.moveTo(parentDirectory, "renamedFile.txt", function (file) {
*                 // now "/file.txt" was moved to "/parentDirectory" with new name "/renamedFile.txt"
*                 console.log(file.isFile); //true
*                 console.log(file.isDirectory); //false
*                 console.log(file.name); // "renamedFile.txt"
*                 console.log(file.fullPath); // "/parentDirectory/renamedFile.txt"
*                 console.log(file.filesystem); // "/"
*             }, null);
*         }, null);
*     }, null);
* }, null);
*/
```

`window.FileEntry.copyTo`
```javascript
/**
* @function GDFileEntry#copyTo
* @description Copy a directory to a different location.
* @param {GDDirectoryEntry} parent The directory to which to copy the entry
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
*         fileSystem.root.getFile("file.txt", options, function (nestedFile) {
*             // "/file.txt" is created here
*             nestedFile.copyTo(parentDirectory, "renamedFile.txt", function (file) {
*                 // now "/file.txt" was copied to "/parentDirectory" with new name "/renamedFile.txt"
*                 console.log(file.isFile); //true
*                 console.log(file.isDirectory); //false
*                 console.log(file.name); // "renamedFile.txt"
*                 console.log(file.fullPath); // "/parentDirectory/renamedFile.txt"
*                 console.log(file.filesystem); // "/"
*             }, null);
*         }, null);
*     }, null);
* }, null);
*/
```

`window.FileEntry.toURL`
```javascript
/**
* @function GDFileEntry#toURL
* @description Return a URL that can be used to identify this entry.
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     var path = "file.txt",
*         options = {create: true, exclusive: false};
*
*     fileSystem.root.getFile(path, options, function (file) {
*         console.log(file.toURL()); // "/file.txt"
*     }, null);
* }, null);
*/
```

`window.FileEntry.remove`
```javascript
/**
* @function GDFileEntry#remove
* @description Remove a file or directory. It is an error to attempt to delete a
* directory that is not empty. It is an error to attempt to delete a
* root directory of a file system.
* @param {function} successCallback Called with no parameters
* @param {function} errorCallback Called with a FileError
*
* @example
* requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
*     var path = "file.txt",
*         options = {create: true, exclusive: false};
*
*     fileSystem.root.getFile(path, options, function (file) {
*         file.remove();
*     }, null);
* }, null);
*/
```

`window.FileEntry.getParent`
```javascript
/**
* @function GDFileEntry#getParent
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
*         fileSystem.root.getFile("parentDirectory/nestedFile.txt", options, function (nestedFile) {
*             // "/nestedFile.txt" is created here
*             nestedFile.getParent(function (directory) {
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
```

---

`window.FileWriter`
```javascript
/**
* @class GDFileWriter
* @classdesc This class writes to the mobile device file system.
* @param {file} file File object containing file properties
* @param {bool} append If true write to the end of the file, otherwise overwrite the file
*/
```

`window.FileWriter.abort`
```javascript
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
```

`window.FileWriter.write`
```javascript
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
```

`window.FileWriter.seek`
```javascript
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
```

`window.FileWriter.truncate`
```javascript
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
```

---

`window.File`
```javascript
/**
* @class GDFile
* @classdesc This object contains attributes of a single file.
* @property {string} name  Name of the file, without path information
* @property {string} fullPath The full path of the file, including the name
* @property {string} type Mime type
* @property {date} lastModifiedDate Last modified date
* @property {number} size Size of the file in bytes
*/
```

---

`window.LocalFileSystem`
```javascript
/**
* @class GDLocalFileSystem
* @classdesc This object provides a way to obtain root secure file systems. GDFileSystem
*
* @example
*
* console.log(GDLocalFileSystem.TEMPORARY); // 0 - temporary, with no guarantee of persistence
* console.log(GDLocalFileSystem.PERSISTENT); // 1 - persistent
*/
```

---

`window.localStorage`
```javascript
/**
* @classs GDSecureStorage
* @classdescc GDSecureStorage provides local storage analog functionality
*/
```

`localStorage.setItem`
```javascript
/**
* @function GDSecureStorage#setItem
* @description Adds new value to local storage
* @param {string} key The key for newly create value
* @param {any} value The value itself
*
* @example
* var key = "key";
* var value = "value";
*
* localStorage.setItem(key, value);
* console.log(localStorage.getItem(key)); // "value"
*/
```

`localStorage.getItem`
```javascript
/**
* @function GDSecureStorage#getItem
* @description Returns a value from local storage by key
* @param {string} key The key for existing value in local storage
*
* @example
* var key = "key";
* var value = "value";
*
* localStorage.setItem(key, value);
* var val = localStorage.getItem(key);
* console.log(val); // "value"
*/
```

`localStorage.removeItem`
```javascript
/**
* @function GDSecureStorage#removeItem
* @description Removes the value fram local storage with key
* @param {string} key The key for existing value in local storage
*
* @example
* var key = "key";
* var value = "value";
*
* localStorage.setItem(key, value);
* console.log(localStorage.getLength()); // 1
* localStorage.removeItem(key);
* console.log(localStorage.getLength()); // 0
*/
```

`localStorage.getLength`
```javascript
/**
* @function GDSecureStorage#getLength
* @description Returns a number - how many elements are there in the local storage
*
* @example
* var key = "key";
* var value = "value";
*
* localStorage.setItem(key, value);
* var localStorageSize = localStorage.getLength();
* console.log(localStorageSize); // 1
*/
```

`localStorage.key`
```javascript
/**
* @function GDSecureStorage#key
* @description Returns a key for particular index in local storage
* @param {number} index The index in local storage
*
* @example
* var key = "key";
* var value = "value";
*
* localStorage.setItem(key, value);
* console.log(localStorage.key(0)); // "key"
*/
```

`localStorage.clear`
```javascript
/**
* @function GDSecureStorage#clear
* @description Clears the local storage
*
* @example
* var key1 = "key1";
* var value1 = "value1";
* var key2 = "key2";
* var value2 = "value2";
*
* localStorage.setItem(key1, value1);
* localStorage.setItem(key2, value2);
* console.log(localStorage.getLength()); // 2
* localStorage.clear();
* console.log(localStorage.getLength()); // 0
*/
```
