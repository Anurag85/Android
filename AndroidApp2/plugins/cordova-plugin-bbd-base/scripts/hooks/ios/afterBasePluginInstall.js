#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

var fse = require('fs-extra');
require('shelljs/global');

module.exports = function(context) {

    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        iOSHelper = require('../../../src/ios/iOSHelper.js'),
        plistHelper = new iOSHelper.PlistHelper(context),
        xcconfigHelper = new iOSHelper.XcconfigHelper(context),
        pluginPath = context.opts.plugin.dir,
        os = require('os'),
        pathToiOSPlatform = path.join(context.opts.projectRoot, 'platforms', 'ios');

    //We need to read settings from default.xcconfig file
    //We need to set those settings to platforms/ios/cordova/build.xcconfig file
    //Those settings will be available in Build Settings in Xcode
    //In Cordova 6.x build configuration files (*.xcconfig) are selected in Cordova Xcode project
    //In Cordova 5.x we will notify user to do it manually manually - select Cordova's build.xcconfig as build configuration file
    xcconfigHelper.editXcconfig();

    // replacing Cordova's main.m file with our version in order to do initialization of GD
    fse.removeSync(path.join(plistHelper.platformRoot, plistHelper.originalNameOfiOSProject, 'main.m'));
    fse.copySync(path.join(pluginPath, 'src', 'ios', 'main.m'),
        path.join(plistHelper.platformRoot, plistHelper.originalNameOfiOSProject, 'main.m'));

    // Manage plist file
    plistHelper.editPlist();
    plistHelper.editEntitlementPlist();

    // fix cordova-ios module related bug. Cordova version between 6.2.0 and 6.0.0 can't remove plugin with custom freamworks
    var xcodeModulePackageJsonFilePath = path.join(pathToiOSPlatform,
            'cordova',
            'node_modules',
            'xcode',
            'package.json'),
        xcodeModulePackageJson = fs.readFileSync(xcodeModulePackageJsonFilePath, 'utf-8'),
        xcodeModulePackageJsonObj = JSON.parse(xcodeModulePackageJson);

    if (xcodeModulePackageJsonObj.version == '0.8.4' || xcodeModulePackageJsonObj.version == '0.8.3' || xcodeModulePackageJsonObj.version == '0.8.2') {
        var pbxProjectFilePath = path.join(pathToiOSPlatform,
                'cordova',
                'node_modules',
                'xcode',
                'lib',
                'pbxProject.js'),
            pbxProject = fs.readFileSync(pbxProjectFilePath, 'utf-8');

        fs.chmodSync(pbxProjectFilePath, '777');

        pbxProject = pbxProject.split(os.EOL).map(function(line) {
            if (line.includes(bugLinePbxProject())) {
                line = line.replace(bugLinePbxProject(),
                    'this.removeFromFrameworkSearchPaths(file);');
            }
            return line;
        }).join(os.EOL);

        fs.writeFileSync(pbxProjectFilePath, pbxProject, 'utf-8');
    }

    function bugLinePbxProject() {
        if (xcodeModulePackageJsonObj.version == '0.8.4')
            return 'this.removeFromFrameworkSearchPaths(file.dirname);';
        return 'this.removeFromFrameworkSearchPaths(path.dirname(fpath));';
    }

    // Installing latest version of ios-sim, to fix bug with cordova emulate ios command
    if (fs.existsSync(pathToiOSPlatform)) {
        cd(path.join(pathToiOSPlatform, 'cordova', 'node_modules'))
        exec('npm install ios-sim@latest', { silent: true });
    }

    console.log('\x1b[32m%s\x1b[0m', 'Plugin cordova-plugin-bbd-base was successfully installed on ios.');

};