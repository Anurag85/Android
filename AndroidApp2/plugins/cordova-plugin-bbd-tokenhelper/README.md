BBD TokenHelper plugin
======================
> The TokenHelper plugin is used to request token from server side and process callback on the response.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-tokenhelper`

> __Note:__ `BBD Cordova TokenHelper plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-tokenhelper
```

API reference
=============
`window.plugins.GDTokenHelper.getGDAuthToken`
```javascript
/**
* @function GDTokenHelper#getGDAuthToken
* @description Call this function to check if it is currently possible to open an app using an url scheme
* @param {string} challenge string for the authorization
* @param {serverName} serverName string for the authorization
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions.
*/
window.plugins.GDTokenHelper.getGDAuthToken("test", "serverName",
    function(result) {
	    alert("Retrieved Application details " + result);
	},
    function(result) {
    	alert("Api not supported on emulated devices: " + result);
	}
);
```
