#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

module.exports = function(context) {

    var fs = require('fs'),
        path = context.requireCordovaModule('path'),
        execSync = require('child_process').execSync,
        pluginsListStr = execSync('cordova plugin', { encoding: 'utf8' }),
        pathToAndroidPlatform = path.join(context.opts.projectRoot, 'platforms', 'android'),
        pathToiOSPlatform = path.join(context.opts.projectRoot, 'platforms', 'ios');

    if (pluginsListStr.indexOf('cordova-plugin-bbd-base') < 0) {

        if (fs.existsSync(path.join(context.opts.projectRoot, 'hooks', 'android', 'afterCordovaPluginInstall.js'))) {
            restoreConfigXml([
                '<hook src="hooks/android/afterCordovaPluginInstall.js" type="after_plugin_install" />',
                '<preference name="android-minSdkVersion" value="19" />',
                '<preference name="android-targetSdkVersion" value="25" />'
            ]);
            fs.unlinkSync(path.join(context.opts.projectRoot, 'hooks', 'android', 'afterCordovaPluginInstall.js'));
        }

        if (fs.existsSync(pathToAndroidPlatform)) {
            var isAndroidBuilt = fs.existsSync(path.join(pathToiOSPlatform, 'build'));
            execSync('cordova platform rm android');
            execSync('cordova platform add android');
            if (isAndroidBuilt)
                execSync('cordova prepare android && cordova compile android');
        }

        if (fs.existsSync(pathToiOSPlatform)) {
            var isiOSBuilt = fs.existsSync(path.join(pathToiOSPlatform, 'build'));
            execSync('cordova platform rm ios');
            execSync('cordova platform add ios');
            if (isiOSBuilt)
                execSync('cordova prepare ios');
        }
    }

    if (pluginsListStr.indexOf('cordova-plugin-bbd-') < 0) {
        restoreConfigXml(['<hook src="hooks/afterBasePluginRemove.js" type="after_plugin_rm" />']);
        fs.unlinkSync(path.join(context.opts.projectRoot, 'hooks', 'afterBasePluginRemove.js'));
        console.log("No BBD Cordova plugins installed");
    }

    // removing properties from config.xml added by BBD Cordova plugins
    function restoreConfigXml(propertiesArrayToRestore) {
        var xmlContent = fs.readFileSync(path.join(context.opts.projectRoot, 'config.xml'), { encoding: 'utf8' });
        for (var i = 0; i < propertiesArrayToRestore.length; i++){
            xmlContent = xmlContent.replace(propertiesArrayToRestore[i], '');
        }
        xmlContent = xmlContent.replace(/^\s*$[\n\r]{1,}/gm, '');
        fs.writeFileSync(path.join(context.opts.projectRoot, 'config.xml'), xmlContent, 'utf8');
    }
}