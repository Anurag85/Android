#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

require('shelljs/global');

// Cordova breaks all our configuration setup by Base plugin when running 'cordova update' command.
// This script is to reinstall iOS platform and reinstall plugins after 'cordova update' command is run.

module.exports = function(context) {

    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        platformRoot = path.join(context.opts.projectRoot, 'platforms', 'ios'),
        wasiOSPlatformBuilt = fs.existsSync(path.join(platformRoot, 'build'));

    exec('cordova platform rm ios');
    exec('cordova platform add ios');

// Build the iOS project if it was built before 'cordova platform update' runed
    if(wasiOSPlatformBuilt)
            exec('cordova build ios');
};
