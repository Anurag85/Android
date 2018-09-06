BBD Cordova Push plugin
=======================
> The Push plugin encapsulates the response returned from the GDPush class.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-push`

> __Note:__ `BBD Cordova Push plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-push
```

API reference
=============
`window.plugins.GDPushConnection`
```javascript
/**
* @class GDPushConnection
* @classdesc The Push Connection is the container and conduit for the device's Push Channels. An application may open multiple Push Channels; all will be managed within a single Push Connection. The Push Connection is automatically established during BlackBerry Dynamics authorization processing, and then maintained by the BlackBerry Dynamics run-time under application control. The application can instruct the run-time to switch the Push Connection off and on.  When instructed to switch off, the GD run-time will terminate the Push Connection, and suspend its maintenance. When instructed to switch back on, the GD run-time will re-establish the Push Connection, and resume maintenance. Switching off the Push Connection might be an option that the application offers to the end user, for example, allowing them to reduce power consumption on the device.
* @property {function} onConnected Callback function to invoke after the connection is established.
* @property {function} onDisconnected Callback function to invoke after the connection is terminated.
*/
```

`window.plugins.GDPushConnection.initialize`
```javascript
/**
* @function GDPushConnection#initialize
* @description Initialize the push connection in prior to establishing the connection.  This function should be called before calling <a href="#connect">GDPushConnection.connect</a>.
* @param {function} onConnected Callback function to invoke after the connection is established.
* @param {function} onDisconnected Callback function to invoke after the connection is terminated.
*
* @example
* window.plugins.GDPushConnection.initialize(function(result) {
*     // onConnected code here
* }, function(result) {
*     // onDisconnected code here
* });
*/
```

`window.plugins.GDPushConnection.connect`
```javascript
/**
* @function GDPushConnection#connect
* @description Call this function to establish, or re-establish, the Push Channel connection with the BlackBerry Dynamics proxy infrastructure Network Operating Center (NOC).
*
* @example
* window.plugins.GDPushConnection.initialize(function(result) {
*     // onConnected code here
* }, function(result) {
*     // onDisconnected code here
*     window.plugins.GDPushConnection.connect();
* });
*/
```

`window.plugins.GDPushConnection.disconnect`
```javascript
/**
* @function GDPushConnection#disconnect
* @description Call this function to terminate the Push Channel connection with the BlackBerry Dynamics proxy infrastructure Network Operating Center (NOC).
*
* @example
* window.plugins.GDPushConnection.initialize(function(result) {
*     // onConnected code here
*     window.plugins.GDPushConnection.disconnect();
* }, function(result) {
*     // onDisconnected code here
* });
*/
```

`window.plugins.GDPushConnection.createPushChannel`
```javascript
/**
* @function GDPushConnection#createPushChannel
* @description Call this function to create a new push channel to receive notifications from an application server.  Push Channels can only be established when the Push Connection is open and operating.
* @param {function} responseCallback Callback function to invoke whenever a response is received by this push channel.
* @returns {GDPushChannel}
*
* @example
* function myPushConnection(){
*     var myConnection;
*     var channel = null;
*     var savedChannelID = null;
*     //--GDPushConnection
*     myConnection = window.plugins.GDPushConnection;
*
*     try {
*         myConnection = window.plugins.GDPushConnection;
*     } catch(e) {
*         console.log("Unable to initialize the GD Connection (mConnection).");
*     }
*
*    //-- GDPushChannelResponse
*    function pushChannelResponse(response){
*        try {
*            var channelResponse = mConnection.parseChannelResponse(response);
*            console.log("Got response channelID: " + channelResponse.channelID);
*            console.log("Got response responseType: " + channelResponse.responseType);
*            console.log("Got response responseData: " + channelResponse.responseData);
*            switch(channelResponse.responseType) {
*            case "open":
*                savedChannelID = channelResponse.channelID;
*                console.log("Channel connection opened with ID :" + savedChannelID);
*
*                // send application server the savedChannelID (token) here
*
*            case "message":
*                // handle pushed message from the server
*                channel.close(channelResponse.channelID);
*                break;
*            case "error":
*                console.log("Received an error status from the channel connection.");
*                break;
*            case "close":
*                console.log("Channel connection closed successfully.");
*            case "pingFail":
*                break;
*            default:
*                break;
*            }
*        } catch(e) {
*            console.log("Invalid response object sent to channel response callback handler.");
*        }
*    };
*
*    function pushConnectionOk(){
*        //-- GDPushChannel
*        channel = myConnection.createPushChannel(pushChannelResponse);
*        channel.open();
*    };
*
*    if(myConnection !== "undefined"){
*        myConnection.isConnected(
*        function(result) {
*            console.log("Push connection is established.");
*            pushConnectionOk();
*        },
*        function(result) {
*            console.log("An error occurred while checking the status of the push connection: " + result);
*        });
*    };
* };
*/
```

`window.plugins.GDPushConnection.parseChannelResponse`
```javascript
/**
* @function GDPushConnection#parseChannelResponse
* @description Call this function to transform the push channel response text into a GDPushChannelResponse object.
* @param {string} responseText A string representing the push channel response text.
* @return {GDPushChannelResponse} The push channel response object.
*/
```

`window.plugins.GDPushConnection.isConnected`
```javascript
/**
* @function GDPushConnection#isConnected
* @description This function returns the current status of the Push Channel connection.
* @param {function} responseCallback Callback function to invoke when the function returns. A single result string will be passed as the input to the callback function: "true" or "false".
*  @return {boolean} "true" or "false".
*/
```
