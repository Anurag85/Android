BBD Cordova Socket plugin
=========================
> The Socket plugin implements the secure Socket communications APIs.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-socket`

> __Note:__ `BBD Cordova Socket plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-socket
```

API reference
=============
`window.plugins.GDSocketResponse`
```javascript
/**
* @class GDSocketResponse
* @classdesc This class encapsulates the response returned from the GDSocket class.
* @param {string} json The input data (formatted as JSON text) used to construct the response object.
* @property {string} socketID The unique ID for the socket connection that generated this response.
* @property {string} responseType This value is used to distinguish what action triggered this response.
* Valid values are:
* open - The socket was just successfully opened.
* message - A new message was received from the server. The responseData property will be  populated with the data from the server.
* error - A socket error occurred. The responseData may or may not be populated with a description of the error.
* close - The socket connection was closed.
* @property {string} responseData This field will be populated with data from the server if the response contained data what was intended to be processed by the client.
* @return {GDSocketResponse}
*/
```

`window.plugins.GDSocket`
```javascript
/**
* @class GDSocket
* @classdesc Implements the secure Socket communications APIs.
* @property {string} url The address of the server. Can be either an Internet Protocol address (IP address, for example "192.168.1.10"), or a fully qualified domain name (for example "www.example.com").
* @property {number} port Number of the server port to which the socket will connect.
* @property {boolean} useSSL This value determines whether or not to use SSL/TLS security.
* @property {boolean} disableHostVerification Disable host name verification, when making an HTTPS request. Host name verification is an SSL/TLS security option.
* @property {boolean} disablePeerVerification Disable certificate authenticity verification, when making an SSL/TLS connection. Authenticity verification is an SSL/TLS security option.
* @property {function} onSocketResponse This function is the callback handler that is called whenever a response is returned from the socket connection.  This function should check the value of the responseType returned and determine the required action to take.  If the responseType = "open", then the socketID returned in the response should be used to send data in subsequent calls for this socket connection (see GDSocket.send).  NOTE: This function is required to be a non-null value.
* @property {function} onSocketError This function is the callback handler that is called whenever a socket error occurs.  This function should check the value of the responseType returned and determine the required action to take.
*/
```

`window.plugins.GDSocket.createSocket`
```javascript
/**
* @function GDSocket#createSocket
* @description Call this function to create a socket and set the main parameters.  NOTE: This funtion only initializes the socket parameters; it does not initiate data transfer nor does it make the initial socket connection (see GDSocket.connect).
* @param {string} url The address of the server. Can be either an Internet Protocol address (IP address, for example "192.168.1.10"), or a fully qualified domain name (for example "www.example.com").
* @param {number} port Number of the server port to which the socket will connect.
* @param {boolean} useSSL his value determines whether or not to use SSL/TLS security.
* @return {GDSocket}
*/
```

`window.plugins.GDSocket.connect`
```javascript
/**
* @function GDSocket#connect
* @description Open a new socket connection.
* @return {GDSocketResponse} A socket response object in JSON format.  The result should be parsed and saved as a GDSocketResponse object in the callback handler.  If the connection was successful then the response object will be initialize with a socketID property that can be used to send data using this socket connection (see GDSocket.send).  Since this is an asynchronous call, the response will be returned via the onSocketResponse callback or the onSocketError callback (whichever is applicable).
*/
```

`window.plugins.GDSocket.send`
```javascript
/**
* @function GDSocket#send
* @description Call this function to send data using the open socket connection.
* @param {string} socketID The identifier for the open socket connection.  This value is returned from a successful call to GDSocket.connect.
* @param {string} data The data to transmit using the open socket.
*/
function mySocketRequest(){
    var url = socket_url;
    var port = socket_port;
    var useSSL = false;
    //--createSocket
    var aSocket = window.plugins.GDSocket.createSocket(url, port, useSSL);

    aSocket.onSocketResponse = function(obj) {
        console.log("Socket response is valid.");
        var socketResponse = window.plugins.GDSocket.parseSocketResponse(obj);

        // Once the socket is open, attempt to send some data, then close the connection.
        switch(socketResponse.responseType) {
            case "open":
                console.log("Socket connection opened.");
                // Format a string for the current time.
                var now = new Date();
                var localTime = now.toLocaleTimeString();
                var re = new RegExp("^[0-9]*:[0-9]*:[0-9]*");
                var matches = re.exec(localTime);
                var time = matches[0];
                // Send some data to the server then close the connection.
                //-- send
                window.plugins.GDSocket.send(socketResponse.socketID, "Hello There! [" + time + "]");
                //-- close
                window.plugins.GDSocket.close(socketResponse.socketID);
                break;
            case "message":
                //-- close
                window.plugins.GDSocket.close(socketResponse.socketID);
                break;
            case "error":
                console.log("Received an error status from the socket connection.");
                break;
            case "close":
                console.log("Socket connection closed successfully.");
                break;
            default:
                console.log( "Unknown Socket response type: " + socketResponse.responseType);
        }
    };
    //-- onSocketError
    aSocket.onSocketError = function(err) {
        console.log("The socket connection failed: " + err);
    };
    //-- connect
    aSocket.connect();
}
```

`window.plugins.GDSocket.close`
```javascript
/**
* @function GDSocket#close
* @description Call this function to close the socket connection.
* @param {string} socketID The identifier for the open socket connection.  This value is returned from a successful call to GDSocket.connect.
*/
```

`window.plugins.GDSocket.parseSocketResponse`
```javascript
/**
* @function GDSocket#parseSocketResponse
* @description Call this function to transform the socket response text into a GDSocketResponse object.
* @param {string} responseText A string representing the socket response text.
* @return {GDSocketResponse} The socket response object.
*/
```
