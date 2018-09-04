BBD Cordova ServerSideServices plugin
=====================================
> The ServerSideServices plugin provides an ability to use BBD Server Based Services. It returns all the needed information about service in JSON format.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-serversideservices`

> __Note:__ `BBD Cordova ServerSideServices plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-serversideservices
```

API reference
=============
`window.plugins.GDServerSideServices`
```javascript
/**
* @class GDServerSideServices
* @classdesc The GDServerSideServices provides ability to use GD Server Based Serveices. It returns all the needed information about service in JSON format. To use this feature you should bind the service you want to the sample application in Good Control (GC) console. Also you should bind the server where the service itself is hosted to the sample application in enterprise management console. For example, there is 'Google Timezone service' available on enterprise management console to be used in your application. This service is hosted on following server: maps.googleapis.com on port 443. You should configure your application to be subscribed on above service and to use above server. See enterprise management console guide on how to do this. Then when you call callGDServerSideService method with appropriate parameters you will receive all the information about this service.
*/
```

`window.plugins.GDServerSideServices.callGDServerSideService`
```javascript
/**
* @function GDServerSideServices#callGDServerSideService
* @description Call this function to retrieve the information about server based service from Good Control (GC) console in JSON format.
* This method returns following information:
* serviceProviders - array of applications that provide appropriate service
* Each serviceProvider has information such as:
* identifier - identifier of the serviceProvider
* version - version of serviceProvider
* name - name of serviceProvider
* address - address of serviceProvider
* icon - icon associated with serviceProvider
* serverCluster - array of servers that are bind to the serviceProvider (application)
* services - array of services that are bind to the serviceProvider (appliaction)
* Each serverCluster has information about:
* server - host name of the server
* port - port server is running on
* priority - the priority of the server
* Each service has:
* identifier - identifier of the service
* version - version of the service
* type - service type
* @param {string} serviceName Name of the service, for example, "google.timezone.service"
* @param {string} serviceVersion Service version, for example, "1.0.0.0"
* @param {function} successCallback Callback function to invoke when callGDServerSideService method returns successfully. The object with information about service is passed to this function as parameter.
* @param {function} errorCallback Callback function to invoke for error conditions.
*/
window.plugins.GDServerSideServices.callGDServerSideService("google.timezone.service", "1.0.0.0",
    function(info) {
        alert("Information about service: " + info);
	},
    function(error) {
        alert("Error occured: " + error);
    }
);
```
