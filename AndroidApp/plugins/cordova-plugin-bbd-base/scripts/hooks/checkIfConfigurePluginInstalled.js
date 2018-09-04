#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

module.exports = function(context) {

    var fs = require('fs'),
        exec = require('child_process').exec;

    console.log('BlackBerry Dynamics Cordova Configure plugin is not installed in your application. Please install it according to instructions in BlackBerry_Dynamics_SDK_for_Cordova_<version>/README.md file and re-install BlackBerry Dynamics Cordova Base plugin.');
    exec('cordova plugin rm cordova-plugin-bbd-base');

}
