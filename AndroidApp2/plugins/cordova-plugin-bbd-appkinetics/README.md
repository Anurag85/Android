BBD Cordova AppKinetics plugin
==============================
> The GDAppKinetics provides the functionality of AppKinetics - the ability to securely communicate between applications.

> __Note:__ `BBD Cordova AppKinetics plugin` is dependent on
> * `BBD Cordova Base plugin`

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-appkinetics`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-appkinetics
```

API reference
=============

`window.plugins.GDAppKineticsPlugin.canLaunchAppUsingUrlScheme`

```javascript
/**
* @function GDAppKinetics#canLaunchAppUsingUrlScheme
* @description Call this function to check if it is currently possible to open an app using an url scheme
* @param {string} urlToLaunch URL which is registered to the app which should be launched.
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions.
*/
window.plugins.GDAppKineticsPlugin.canLaunchAppUsingUrlScheme("http://address/App.plist",
    function(result) {
        alert("Should be able to launch this app " + result);
    },
    function(result) {
        alert("Application is failed to launch " + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.launchAppUsingUrlScheme`
```javascript
/**
* @function GDAppKinetics#launchAppUsingUrlScheme
* @description Call this function to open an app using an URL scheme
* @param {string} urlToLaunch URL which is registered to the app which should be launched.
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions.
*/
window.plugins.GDAppKineticsPlugin.launchAppUsingUrlScheme("com.gd.exampleappkineticsfilebouncer",
    function(result) {
        alert("Should be able to launch this app " + result);
    },
    function(result) {
        alert("Application is failed to launch " + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.bringAppToFront`
```javascript
/**
* @function GDAppKinetics#bringAppToFront
* @description Call this function to bring an app to the front of the device
* @param {string} applicationId ID of the app which should be brought to the front.
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions.
*/
window.plugins.GDAppKineticsPlugin.bringAppToFront("com.gd.exampleappkineticsfilebouncer",
    function(result) {
        alert("Should be able to launch this app " + result);
    },
    function(result) {
        alert("Application is failed to launch " + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.copyFilesToSecureFileSystem`
```javascript
/**
* @function GDAppKinetics#copyFilesToSecureFileSystem
* @description Copy files from "www/data" folder into secure file system to the "/data" path
* While this is not an issue for applications using most APIs to write or read via GDCordova, there is a
* problem with moving files which are part of the application Bundle into the secure container.  This api solves
* that problem and moves all files within the app bundle into the secure container.
* @param {function} onSuccess Callback function to invoke when the function returns successfully and the parameter to the success function is a string which contains the number of files moved.
*/
window.plugins.GDAppKineticsPlugin.copyFilesToSecureFileSystem(
    function(result) {
        alert("Number of files copied = " + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.sendFileToApp`
```javascript
/**
* @function GDAppKinetics#sendFileToApp
* @description Call this function to an app to the front of the device
* @param {string} filePath FilePath path to the file to send.
* @param {string} applicationId ID of the app to which the file is sent.
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions.
*/
window.plugins.GDAppKineticsPlugin.sendFileToApp("Brief GD Inter-Container Communication.pdf", "com.gd.exampleappkineticsfilebouncer",
    function(result) {
        alert("Should be able to send file " + result);
    },
    function(result) {
        alert("Send file is failed  " + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.retrieveFiles`
```javascript
/**
* @function GDAppKinetics#retrieveFiles
* @description Call this function to retreive any waiting files but only for the file transfer service.
* @param {function} onSuccess Callback function to invoke when the function returns successfully with a parameter
* of an array of file paths of the received files.
* @param {function} onError Callback function to invoke for error conditions or when no files are waiting.
*/
window.plugins.GDAppKineticsPlugin.retrieveFiles(
    function(result) {
        alert("Files retrieved");
    },
    function(result) {
        alert("Retrieve files is failed" + result);
    }
);
```

`window.plugins.GDAppKineticsPlugin.setReceiveAttachmentsFunction`
```javascript
/**
* @function GDAppKinetics#setReceiveAttachmentsFunction
* @description Call this function to set a function to be called for all files received but only for the file transfer service. Any currently waiting files will be delivered immediately.
* @param {function} receiveFileFunction Callback function to invoke when the function returns successfully with a parameter of an array of file paths of the received files.
*/
window.plugins.GDAppKineticsPlugin.setReceiveAttachmentsFunction(
    function(result) {
        alert("Files retrieved");
    }
);
```

`window.plugins.GDAppKineticsPlugin.callAppKineticsService`
```javascript
/**
* @function GDAppKinetics#callAppKineticsService
* @description Call this function to call any AppKinetics service.
* @param {string} applicationId ID of app to send to
* @param {string} serviceId ID of the service
* @param {string} version Version of the service
* @param {string} method Method of the service
* @param {object} parameters Parameters for the service as a dictionary
* @param {array} array Array of attachements which must reside within secure storage, see copyFilesToSecureFileSystem
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions, check the error string returned for cause.
*/
window.plugins.GDAppKineticsPlugin.callAppKineticsService( "com.gd.exampleappkineticsfilebouncer", "com.demo.generic.call2", "1.0.0.0", "testMethod-FileAttachment", { "arrayEntry-3Elements" : [ "arrayEntry1", "arrayEntry2", "arrayEntry3"], "dictionary" : {"key1":"value1", "key2":"value2", "key3":"value3"}, "string" : "value" }, [ "Brief GD Inter-Container Communication.pdf" ],     // File attachment
    function(result) {
        alert("Email sent");
    },
    function(result) {
        alert("Failed to send email");
    }
);
```

`window.plugins.GDAppKineticsPlugin.sendEmailViaGFE`
```javascript
/**
* @function GDAppKinetics#sendEmailViaGFE
* @description Call this function to send email via GFE (Good For Enterprise)
* @param {array} array Array of recipients email addresses
* @param {string} subject Subject of the email
* @param {string} text Text of the email
* @param {array} array Array of attachements which must reside within secure storage, see copyFilesToSecureFileSystem
* @param {function} onSuccess Callback function to invoke when the function returns successfully.
* @param {function} onError Callback function to invoke for error conditions, check the error string returned for cause.
*/
window.plugins.GDAppKineticsPlugin.sendEmailViaGFE( ["sample@good.com"], "Test Email", "Hi, this is a test email", [],
    function(result) {
        alert("Email sent");
    },
    function(result) {
        alert("Failed to send email - unless GFE is not installed - check to see if GFE is not installed");
    }
);
```

`window.plugins.GDAppKineticsPlugin.readyToProvideService`
```javascript
/**
* @function GDAppKinetics#readyToProvideService
* @description Call this function to provide an AppKinetics service
* @param {string} serviceName Name of the service.
* @param {string} versionOfService Version of the service
* @param {function} onSuccess Callback function to invoke when the app receives an app kinetics request matching serviceName and service function. The parameter received in the function is a dictionary of the received parameters and file attachments in any.
* @param {function} onError Callback function to invoke for error conditions, check the error string returned for cause.
*/
window.plugins.GDAppKineticsPlugin.readyToProvideService( "com.demo.generic.call", "1.0.0.0",
    function(result) {
        alert("Object received from " + result.applicationName + " with service " + result.serviceName + " version - " + result.version + " using method - " + result.method + " with parameters - " + JSON.stringify( result.parameters ) + " and attachments - " + JSON.stringify( result.attachments ));
    },
    function(result) {
        alert("Failed to receive email service");
    }
);
```
