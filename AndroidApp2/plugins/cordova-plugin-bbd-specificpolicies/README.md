BBD SpecificPolicies Socket plugin
==================================
> The SpecificPolicies plugin is used to read application-specific policy from Good Control (GC) console and return it in JSON format.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-specificpolicies`

> __Note:__ `BBD Cordova SpecificPolicies plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-specificpolicies
```

API reference
=============
`window.plugins.GDSpecificPolicies`
```javascript
/**
* @class GDSpecificPolicies
* @classdesc The GDSpecificPolicies is used to read application-specific policy from Good Control (GC) console and return it in JSON format. To use this feature you should create policy file in XML format and upload it to the enterprise management console for specific application. The settings can be retrieved by calling updatePolicy method below.
*/
```
For mere details see following [guide](https://community.good.com/view-doc.jspa?fileName=_app_policies.html&docType=api)

`window.plugins.GDSpecificPolicies.updatePolicy`
```javascript
/**
* @function GDSpecificPolicies#updatePolicy
* @description Call this function to retrieve application-specific policy from Good Control (GC) console in JSON format. This method observes the application-policy state and once it is updated on enterprise management console we will receive the letest version directly in success callback.
* @param {function} successCallback Callback function to invoke when updatePolicy method returns successfully. The policy object is passed to this function as parameter.
* @param {function} errorCallback Callback function to invoke for error conditions.
*/
window.plugins.GDSpecificPolicies.updatePolicy(
    function(policy) {
	    alert("Retrieved application-specific policy is: " + policy);
	},
    function(error) {
	    alert("Error occure: " + error);
	}
);
```
