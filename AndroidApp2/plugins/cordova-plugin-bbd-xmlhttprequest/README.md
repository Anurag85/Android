BBD XMLHttpRequest plugin
=========================
> The XMLHttpRequest plugin is a JavaScript object that provides an easy way to retrieve data from a URL in a secure way without having to do a full page refresh.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-xmlhttprequest`

> __Note:__ `BBD Cordova XMLHttpRequest plugin` is dependent on
> * `BBD Cordova Base plugin`
> * `BBD Cordova HttpRequest plugin`
> * `BBD Cordova Storage plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-xmlhttprequest
```

API reference
=============
`window.XmlHttpRequest`
```javascript
/**
* @class XMLHttpRequest
* @classdesc XMLHttpRequest is a JavaScript object that provides an easy way to retrieve data from a URL without having to do a full page refresh. A Web page can update just a part of the page without disrupting what the user is doing. XMLHttpRequest is used heavily in AJAX programming.
* @property {string} method The HTTP method to use, such as "GET", "POST", "PUT", "DELETE".
* @property {string} url The URL to send the request to.
* @property {boolean} async An optional boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously. If this value is false, the send()method does not return until the response is received. If true, notification of a completed transaction is provided using event listeners. This must be true if the multipart attribute is true, or an exception will be thrown.
* @property {string} user The optional user name to use for authentication purposes; by default, this is an empty string.
* @property {string} password The optional password to use for authentication purposes; by default, this is an empty string.
* @property {string} onreadystatechange A JavaScript function object that is called whenever the readyState attribute changes. The callback is called from the user interface thread.
* @property {number} readyState The state of the request. Possible values are:
* 0 - when open() method has not been called yet
* 1 - when send() methos has not been called yet
* 2 - when send() method has been called, and headers and status are available
* 3 - downloading; responseText holds partial data
* 4 - operation is complete
* @property {string} response The response entity body according to responseType, as an ArrayBuffer, Blob, Document, JavaScript object (for "json"), or string. This is null if the request is not complete or was not successful.
* @property {string} responseText The response to the request as text, or null if the request was unsuccessful or has not yet been sent.
* @property {string} responseType Can be set to change the response type. Possible values are:
* "" (empty string) - String (this is the default)
* "document" - Document
* "json" - JavaScript object, parsed from a JSON string returned by the server
* "text" - String
* @property {string} responseXML The response to the request as a DOM Document object, or null if the request was unsuccessful, has not yet been sent, or cannot be parsed as XML or HTML. The response is parsed as if it were a text/xml stream. When the responseType is set to "document" and the request has been made asynchronously, the response is parsed as a text/html stream.
* @property {number} status The status of the response to the request. This is the HTTP result code (for example, status is 200 for a successful request).
* @property {string} statusText The response string returned by the HTTP server. Unlike status, this includes the entire text of the response message ("200 OK", for example).
* @property {string} timeout The number of milliseconds a request can take before automatically being terminated. A value of 0 (which is the default) means there is no timeout.
* @property {string} ontimeout A JavaScript function object that is called whenever the request times out.
* @property {string} upload The upload process can be tracked by adding an event listener to upload.
* @property {string} withCredentials Indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies or authorization headers. The default is false.
*/
```

`window.XmlHttpRequest.open`
```javascript
/**
* @function XMLHttpRequest#open
* @description Initializes a request. This method is to be used from JavaScript code; to initialize a request from native code.
* @param {string} method The HTTP method to use, such as "GET", "POST", "PUT", "DELETE".
* @param {string} url The URL to send the request to.
* @param {boolean} async An optional boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously. If this value is false, the send()method does not return until the response is received. If true, notification of a completed transaction is provided using event listeners. This must be true if the multipart attribute is true, or an exception will be thrown.
* @param {string} user The optional user name to use for authentication purposes; by default, this is an empty string.
* @param {string} password The optional password to use for authentication purposes; by default, this is an empty string.
*/
```

`window.XmlHttpRequest.abort`
```javascript
/**
* @function XMLHttpRequest#abort
* @description Aborts the request if it has already been sent.
*/
```

`window.XmlHttpRequest.send`
```javascript
/**
* @function XMLHttpRequest#send
* @description Sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent. If the request is synchronous, this method doesn't return until the response has arrived. It takes optional parameter data. Optional parameter data can can contain following types of data:
* ArrayBuffer
* Document
* DOMString
* FormData - object with key/value pairs that can be passed to send method as parameter. User can append file from GDFileSystem by passing valid fullPath to this file as key/value
*/
```

`window.XmlHttpRequest.setRequestHeader`
```javascript
/**
* @function XMLHttpRequest#setRequestHeader
* @description Sets the value of an HTTP request header. You must call setRequestHeader() after open(), but before send(). If this method is called several times with the same header, the values are merged into one single request header.
*/
```

`window.XmlHttpRequest.getResponseHeader`
```javascript
/**
* @function XMLHttpRequest#getResponseHeader
* @description Returns the string containing the text of the specified header, or null if either the response has not yet been received or the header doesn't exist in the response.
*/
```

`window.XmlHttpRequest.getAllResponseHeaders`
```javascript
/**
* @function XMLHttpRequest#getAllResponseHeaders
* @description Returns all the response headers as a string, or null if no response has been received. Note: For multipart requests, this returns the headers from the current part of the request, not from the original channel.
*/
```

`window.XmlHttpRequest.overrideMimeType`
```javascript
/**
* @function XMLHttpRequest#overrideMimeType
* @description Overrides the MIME type returned by the server. This may be used, for example, to force a stream to be treated and parsed as text/xml, even if the server does not report it as such. This method must be called before send().
*/
```

Limitation
==========
> This plugin doesn't support synchronous HTTP requests. Even if the open() call
> specified `async` false, the request will be processed asynchronously. The
> send() method always returns immediately.
