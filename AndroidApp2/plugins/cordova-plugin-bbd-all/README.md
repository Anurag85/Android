BBD Cordova All plugin
======================
> BBD Cordova All plugin or as we call it "Super" plugin allows you to install all the BBD Cordova plugins by just running one command from the command line. Technically, it just has a dependency on all the BBD Cordova plugins.
It is a very useful plugin when you are going to implement a complex application that requires many BBD Cordova features and you do not know what set of plugins you need.

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-all`

Setup
=====
> __Note:__ `BBD Cordova AppKinetics plugin` is dependent on
> * `BBD Cordova Base plugin`
> * `BBD Cordova AppKinetics plugin`
> * `BBD Cordova Application plugin`
> * `BBD Cordova FileTransfer plugin`
> * `BBD Cordova HttpRequest plugin`
> * `BBD Cordova InterAppCommunication plugin`
> * `BBD Cordova Push plugin`
> * `BBD Cordova MailTo plugin`
> * `BBD Cordova ServerSideServices plugin`
> * `BBD Cordova Socket plugin`
> * `BBD Cordova SpecificPolicies plugin`
> * `BBD Cordova SQLite plugin`
> * `BBD Cordova Storage plugin`
> * `BBD Cordova TokenHelper plugin`
> * `BBD Cordova XmlHttpRequest plugin`

1. Install dependencies for BBD Cordova Base plugin
    ```
    $ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-base
    $ npm install
    ```
2. We recommend to create your Cordova application in the same folder as plugins
    ```
    $ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins
    $ cordova create cordovaApp your.app.id App
    ```

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordovaApp
$ cordova plugin add ../cordova-plugin-bbd-all
```
