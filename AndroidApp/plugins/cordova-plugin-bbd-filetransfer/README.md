BBD Cordova FileTransfer plugin
===============================
> The FileTransfer plugin is responsible for downloading/uploading files from/to a remote server.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-filetransfer`

> __Note:__ `BBD Cordova FileTransfer plugin` is dependent on
> * `BBD Cordova Base plugin`
> * `BBD Cordova Storage plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-filetransfer
```

API reference
=============
`window.FileTransfer.upload`
```javascript
/**
 * @function GDFileTransfer#upload
 * @description Given an absolute file path, uploads a file on the device to a remote server using a multipart HTTP request.
 * @param {String} filePath Full path of the file on the device
 * @param {String} server URL of the server to receive the file
 * @param {Function} successCallback Callback to be invoked when upload has completed
 * @param {Function} errorCallback Callback to be invoked upon error
 * @param {FileUploadOptions} options Optional parameters such as file name and mimetype
 * @param {Boolean} trustAllHosts Optional trust all hosts (e.g. for self-signed certs), defaults to false
 *
 * @example
 * var ft = new FileTransfer(),
 *     options = new FileUploadOptions(),
 *     filePath = "file.txt",
 *     fileOptions = {create: true, exclusive: false},
 *     uploadUrl = "http://httpbin.org/post";
 * options.fileKey = "file";
 * options.fileName = "data.json";
 * options.mimeType = "text/json";
 *
 * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
 *     fileSystem.root.getFile(filePath, fileOptions, function (file) {
 *         file.createWriter(function (writer) {
 *             writer.onwriteend = function() {
 *                 ft.upload(file.fullPath, uploadUrl, function (response) {
 *                     consol.log(response);
 *                 }, null, options, true);
 *                 ft.onprogress = function(progress) {
 *                     console.log(progress)
 *                 };
 *             }
 *             writer.write('File writer wrote this text');
 *         }, null);
 *     }, null);
 * });
 */
```

`window.FileTransfer.download`
```javascript
/**
 * @function GDFileTransfer#download
 * @description Downloads a file form a given URL and saves it to the specified directory.
 * @param {String} source URL of the server to receive the file
 * @param {String} target Full path of the file on the device
 * @param {Function} successCallback Callback to be invoked when upload has completed
 * @param {Function} errorCallback Callback to be invoked upon error
 *
 * @example
 * var fileTransfer = new FileTransfer(),
 *     url = "http://www.textfiles.com/programming/24hrs.txt",
 *     filePath = "/file.txt",
 *     options = {create: true, exclusive: false};
 * options.fileKey = "file";
 * options.fileName = "data.json";
 * options.mimeType = "text/json";
 *
 * requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
 *     fileSystem.root.getFile(filePath, fileOptions, function (file) {
 *         fileTransfer.download(url, file.fullPath, function (downloadedEntry) {
 *             downloadedEntry.file(function (downloadedFile) {
 *                 console.log(downloadedFile);
 *             });
 *         }, null);
 *     }, null);
 * });
 */
```
