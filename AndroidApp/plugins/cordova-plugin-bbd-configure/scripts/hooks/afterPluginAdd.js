#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

module.exports = function(context) {
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        exec = require('child_process').exec,
        execSync = require('child_process').execSync,
        shellJS = context.requireCordovaModule('shelljs');

    /*
        After adding the plugin we get following params:

        [ '/usr/local/bin/node',
        '/usr/local/bin/cordova',
        'plugin',
        'add',
        '../cordova-plugin-bbd-configure',
        '--variable',
        'bbdSDKForAndroid=value',
        '--variable',
        'bbdSDKForiOS=value',
        '--variable',
        'ignoreFailure="true"' ]

        We need to parse this
    */

    // There is a strange bug, it seems Cordova bug.
    // When we add Configure plugin, then add Base plugin it installs Configure plugin one more time
    // even though Base plugin does not have any dependencies.
    // This results in unexpected behaviour and we need to hack this.
    // The fix would be, on installation remove after_plugin_add hook from plugin.xml file.
    var pluginXmlFile = path.join(context.opts.projectRoot, 'plugins', 'cordova-plugin-bbd-configure', 'plugin.xml'),
        pluginXmlContent = fs.readFileSync(pluginXmlFile, 'utf-8');

    pluginXmlContent = pluginXmlContent.replace('<hook type="after_plugin_add" src="scripts/hooks/afterPluginAdd.js" />', '');
    fs.writeFileSync(pluginXmlFile, pluginXmlContent, 'utf-8');

    var params = {},
        finalGdAndroidSDKPath,
        finalGdIOSSDKPath,
        finalGdAssetsBundlePath;

    // access to path to the plugin
    params["pathToPlugin"] = process.argv[4];

    // starting at index 5 according to above output
    for (var i = 5; i < process.argv.length; i++) {
        // we do not need '--variable'
        if (process.argv[i] !== '--variable') {
            var key = process.argv[i].substring(0, process.argv[i].indexOf('='));
            var value = process.argv[i].substring(process.argv[i].indexOf('=') + 1, process.argv[i].length);
            params[key] = value;
        }
    }

    var pluginPath = path.resolve(params.pathToPlugin),
        pluginsPath = path.join(pluginPath, '..');
    console.log('\x1b[32m%s\x1b[0m', '\nPath to BlackBerry Dynamics Cordova plugins folder: ' + pluginsPath + '\n');

    // here we need to set path to BlackBerry Dynamics SDKs in Base plugin
    var basePluginPath = path.join(pluginsPath, 'cordova-plugin-bbd-base'),
        basePluginXml = path.join(basePluginPath, 'plugin.xml'),
        baseGradleProps = path.join(basePluginPath, 'scripts', 'gradle', 'gradle.properties');

    //-------------------------- Replacing plugin.xml for Base plugin ------------------------------

    fs.unlinkSync(basePluginXml);
    shellJS.cp('-Rf', path.join(pluginsPath, 'cordova-plugin-bbd-configure', 'src', 'originalPluginXMLForBasePlugin.xml'), basePluginPath);
    shellJS.mv(path.join(basePluginPath, 'originalPluginXMLForBasePlugin.xml'), path.join(basePluginPath, 'plugin.xml'));

    var helper = {
        isPlatformInstalled: function(platform) {
            // param 'platform' can be 'ios' or 'android'
            return fs.existsSync(path.join(context.opts.projectRoot, 'platforms', platform));
        },
        handleGdIOSSDKPassedByUser: function() {
            // validate the values if they suppose to be correct
            // we do not need the path to be escaped as Node handles it itself

            var gdIOSSDKPath = params.bbdSDKForiOS.replace(/\\ /g, ' ');

            // execSync transforms ‘~’ to full path for different cases.
            // Regular expression here is for removing \n or \r that are in the end of string returned by execSync
            // it supports following cases:
            // ~username1/...
            // ~username2/...
            // ~/...
            gdIOSSDKPath = execSync('echo ' + gdIOSSDKPath, { encoding: 'utf-8' }).replace(/[\r\n]/g, '');

            var gdAssetsBundlePath = path.join(gdIOSSDKPath, 'Versions', 'A', 'Resources', 'GDAssets.bundle');
            if (!fs.existsSync(gdIOSSDKPath) || !fs.existsSync(gdAssetsBundlePath)) {
                throw new Error("BlackBerry Dynamics iOS SDK is not available at path you passed: " + gdIOSSDKPath + ". Please enter correct path.");
            } else {
                finalGdIOSSDKPath = gdIOSSDKPath;
                finalGdAssetsBundlePath = gdAssetsBundlePath;
            }
        },
        handleGdAndroidSDKPassedByUser: function() {
            // validate the values if they suppose to be correct
            // we do not need the path to be escaped as Node handles it itself

            var gdAndroidSDKPath = params.bbdSDKForAndroid.replace(/\\ /g, ' '),
                gdDestinationPath = path.join(basePluginPath, 'src', 'android', 'GDLibrary'),
                gdBackupDestinationPath = path.join(basePluginPath, 'src', 'android', 'GDLibrary_BackupSupport');

            // execSync transforms ‘~’ to full path for different cases.
            // Regular expression here is for removing \n or \r that are in the end of string returned by execSync
            // it supports following cases:
            // ~username1/...
            // ~username2/...
            // ~/...
            gdAndroidSDKPath = execSync('echo ' + gdAndroidSDKPath, { encoding: 'utf-8' }).replace(/[\r\n]/g, '');

            var gdPath = path.join(gdAndroidSDKPath, 'libs', 'handheld', 'gd'),
                gdBackupSupportPath = path.join(gdAndroidSDKPath, 'libs', 'handheld', 'gd_backup_support');

            if (!fs.existsSync(gdAndroidSDKPath) || !fs.existsSync(gdPath) || !fs.existsSync(gdBackupSupportPath)) {
                throw new Error("BlackBerry Dynamics Android SDK is not available at path you passed: " + gdAndroidSDKPath + ". Please enter correct path.");
            } else {

                shellJS.cp('-Rf', path.join(gdPath, '*'), gdDestinationPath);
                this.setMinSDKInManifest(path.join(gdDestinationPath, 'AndroidManifest.xml'));
                this.setPublishNonDefaultInGradleFile(path.join(gdDestinationPath, 'build.gradle'));

                shellJS.cp('-Rf', path.join(gdBackupSupportPath, '*'), gdBackupDestinationPath);
                this.setMinSDKInManifest(path.join(gdBackupDestinationPath, 'AndroidManifest.xml'));
                this.setPublishNonDefaultInGradleFile(path.join(gdBackupDestinationPath, 'build.gradle'));

                finalGdAndroidSDKPath = gdAndroidSDKPath;
            }
        },
        generateAutomaticPathToGdAndroidSDK: function() {
            var ANDROID_HOME = process.env.ANDROID_HOME,
                gPath = path.join(ANDROID_HOME, 'extras', 'good', 'dynamics_sdk'),
                bbPath = path.join(ANDROID_HOME, 'extras', 'blackberry', 'dynamics_sdk'),
                bbv4Path = path.join(bbPath, 'sdk');

            // check if ANDROID_HOME is set
            if (!ANDROID_HOME) {
                throw new Error("ANDROID_HOME environment variable is not set");
            } else {
                console.log('\x1b[32m%s\x1b[0m', '\nANDROID_HOME path: ' + ANDROID_HOME + '\n');
            }

            // generate automatic path to BlackBerry Dynamics Android SDK
            var gdAndroidSDKAutomaticPath = detectBBDAndroidSDKAutomaticPath(),
                gdPath = path.join(gdAndroidSDKAutomaticPath, 'libs', 'handheld', 'gd'),
                gdBackupSupportPath = path.join(gdAndroidSDKAutomaticPath, 'libs', 'handheld', 'gd_backup_support'),
                gdDestinationPath = path.join(basePluginPath, 'src', 'android', 'GDLibrary'),
                gdBackupDestinationPath = path.join(basePluginPath, 'src', 'android', 'GDLibrary_BackupSupport');

            if (!fs.existsSync(gdPath) || !fs.existsSync(gdBackupSupportPath)) {
                throw new Error('BlackBerry Dynamics Android SDK is not available at any of following paths: \n' +
                '\t1. "' + bbv4Path + '"\n' + '\t2. "' + bbPath + '"\n' + '\t3. "' + gPath + '"');
            } else {

                shellJS.cp('-Rf', path.join(gdPath, '*'), gdDestinationPath);
                this.setMinSDKInManifest(path.join(gdDestinationPath, 'AndroidManifest.xml'));
                this.setPublishNonDefaultInGradleFile(path.join(gdDestinationPath, 'build.gradle'));

                shellJS.cp('-Rf', path.join(gdBackupSupportPath, '*'), gdBackupDestinationPath);
                this.setMinSDKInManifest(path.join(gdBackupDestinationPath, 'AndroidManifest.xml'));
                this.setPublishNonDefaultInGradleFile(path.join(gdBackupDestinationPath, 'build.gradle'));

                finalGdAndroidSDKPath = gdAndroidSDKAutomaticPath;
            }

            function detectBBDAndroidSDKAutomaticPath() {
                if (fs.existsSync(bbPath)) {
                    return fs.existsSync(bbv4Path) ? bbv4Path : bbPath;
                }

                if (fs.existsSync(gPath)) {
                    return gPath;
                }

                return '';
            }
        },
        generateAutomaticPathToGdIOSSDK: function() {
            // check if user directory is available ("/Users/<user>/") on Mac
            if (!process.env.HOME) {
                throw new Error("Your user directory is not available");
            } else {
                console.log('\x1b[32m%s\x1b[0m', 'User path on Mac: ' + process.env.HOME + '\n');
            }

            // generate automatic path to BlackBerry Dynamics iOS SDK
            var gdIOSSDKAutomaticPath = path.join(process.env.HOME, 'Library', 'Application Support', 'BlackBerry', 'Good.platform', 'iOS', 'Frameworks', 'GD.framework');
            if (!fs.existsSync(gdIOSSDKAutomaticPath)) {
                throw new Error("BlackBerry Dynamics iOS SDK is not available at path: " + gdIOSSDKAutomaticPath);
            } else {
                finalGdIOSSDKPath = gdIOSSDKAutomaticPath;
            }
            var gdAssetsBundlePath = path.join(finalGdIOSSDKPath, 'Versions', 'A', 'Resources', 'GDAssets.bundle');
            if (!fs.existsSync(gdAssetsBundlePath)) {
                throw new Error("GDAssets.bundle is not available at path: " + gdAssetsBundlePath);
            } else {
                finalGdAssetsBundlePath = gdAssetsBundlePath;
            }
        },
        updateDependenciesForPlugin: function(pathToPlugin) {
            var pluginXmlPath = path.join(pathToPlugin, 'plugin.xml');
            var pluginXmlData = fs.readFileSync(pluginXmlPath, 'utf8');

            fs.chmodSync(pluginXmlPath, '660');

            if (pluginXmlData.indexOf('../cordova-plugin-bbd-base') >= 0) {
                pluginXmlData = pluginXmlData.replace(/url="../g, 'url="' + pluginsPath);
                fs.writeFileSync(pluginXmlPath, pluginXmlData, 'utf8');
            }
        },
        setMinSDKInManifest: function(manifestPath) {
            fs.chmodSync(manifestPath, '755');
            var manifestContent = fs.readFileSync(manifestPath, 'utf-8');

            manifestContent = manifestContent.replace(/android:versionName="1.0">/,
                'android:versionName="1.0">\n\n\t<uses-sdk android:minSdkVersion="19" android:targetSdkVersion="24" />');

            fs.writeFileSync(manifestPath, manifestContent, 'utf-8');
            fs.chmodSync(manifestPath, '555');
        },
        setPublishNonDefaultInGradleFile: function(pathToBuildGradleFile) {
            if (fs.existsSync(pathToBuildGradleFile)) {
                var gradleFile = fs.readFileSync(pathToBuildGradleFile, 'utf-8');
                fs.chmodSync(pathToBuildGradleFile, '755');
                gradleFile = gradleFile.replace('android {', 'android {\n\tpublishNonDefault true');
                fs.writeFileSync(pathToBuildGradleFile, gradleFile, 'utf-8');
            }
        },
        handlePluginPathInSampleApplication: function() {
            var sampleAppsPath = path.join(pluginsPath, '..', 'SampleApplications');

            fs.readdirSync(sampleAppsPath).forEach(function(dir) {
                var pathToSampleApp = path.join(sampleAppsPath, dir),
                    configXmlPath = path.join(pathToSampleApp, 'config.xml'),
                    configXmlData;

                if (fs.existsSync(configXmlPath)) {
                    configXmlData = fs.readFileSync(configXmlPath, 'utf8')
                    configXmlData = configXmlData.split('../../plugins/cordova-plugin-bbd-').join(pluginsPath + '/cordova-plugin-bbd-');
                    fs.writeFileSync(configXmlPath, configXmlData, 'utf8');
                }

            });
        },
        restoreBasePlugin: function() {
            var removeDirCmd = "rm -rf ";

            if (fs.existsSync(path.join(basePluginPath, 'src', 'ios', 'resources', 'GDAssets.bundle')))
                execSync(removeDirCmd + '"' + path.join(basePluginPath, 'src', 'ios', 'resources', 'GDAssets.bundle') + '"');

            if (fs.existsSync(path.join(basePluginPath, 'src', 'android', 'GDLibrary')))
                execSync(removeDirCmd + '"' + path.join(basePluginPath, 'src', 'android', 'GDLibrary') + '"');

            if (fs.existsSync(path.join(basePluginPath, 'src', 'android', 'GDLibrary_BackupSupport')))
                execSync(removeDirCmd + '"' + path.join(basePluginPath, 'src', 'android', 'GDLibrary_BackupSupport') + '"');
        },
        setConfigurationForPlatform: function(platform) {
            var configData,
                basePluginXmlData = fs.readFileSync(basePluginXml, 'utf8'),
                pathToAndroidConfiguration = path.join(pluginsPath, 'cordova-plugin-bbd-configure', 'src', 'androidConfigurationForPluginXML.txt'),
                pathToiOSConfiguration = path.join(pluginsPath, 'cordova-plugin-bbd-configure', 'src', 'iOSConfigurationForPluginXML.txt');

            fs.chmodSync(basePluginXml, '660');

            if (platform === 'ios') {
                configData = fs.readFileSync(pathToiOSConfiguration, 'utf8');
                basePluginXmlData = basePluginXmlData.replace('<!-- iOS -->', configData);
            } else if (platform === 'android') {
                configData = fs.readFileSync(pathToAndroidConfiguration, 'utf8');
                basePluginXmlData = basePluginXmlData.replace('<!-- Android -->', configData);
            }

            fs.writeFileSync(basePluginXml, basePluginXmlData, 'utf8');
        }
    };

    var bbdCordovaPlugins = [
        'cordova-plugin-bbd-all',
        'cordova-plugin-bbd-appkinetics',
        'cordova-plugin-bbd-application',
        'cordova-plugin-bbd-filetransfer',
        'cordova-plugin-bbd-httprequest',
        'cordova-plugin-bbd-interappcommunication',
        'cordova-plugin-bbd-push',
        'cordova-plugin-bbd-mailto',
        'cordova-plugin-bbd-serversideservices',
        'cordova-plugin-bbd-socket',
        'cordova-plugin-bbd-specificpolicies',
        'cordova-plugin-bbd-sqlite',
        'cordova-plugin-bbd-storage',
        'cordova-plugin-bbd-tokenhelper',
        'cordova-plugin-bbd-xmlhttprequest'
    ];

    //------------------------ Restoring base plugin to initial state ------------------------------

    helper.restoreBasePlugin();

    // ---------------------------------- AUTOMATIC PATHS ------------------------------------------

    // if no parameters were passed to the plugin than we should generate automatic path to BlackBerry Dynamics iOS SDK and BlackBerry Dynamics Android SDK
    // BlackBerry Dynamics iOS SDK is supposed to be at ~/Library/Application Support/BlackBerry/Good.platform/iOS/Frameworks/GD.framework
    // BlackBerry Dynamics Android SDK is supposed to be at $ANDROID_HOME/extras/blackberry/dynamics_sdk
    // NOTE: ANDROID_HOME environment variable must be set in this case

    // if only ignoreFailure="true" parameter is passed to the plugin than we should generate
    // automatic path to BlackBerry Dynamics iOS SDK or BlackBerry Dynamics Android SDK
    // depending on what platform platform is installed
    if (!params.bbdSDKForAndroid && !params.bbdSDKForiOS && !params.ignoreFailure) {
        helper.setConfigurationForPlatform('ios');
        helper.setConfigurationForPlatform('android');
        helper.generateAutomaticPathToGdAndroidSDK();
        helper.generateAutomaticPathToGdIOSSDK();
    } else if (!params.bbdSDKForAndroid && !params.bbdSDKForiOS && params.ignoreFailure === "true") {
        // if ios platform is installed and android platform is not installed
        // we should not proceed with getting automatic path for android and we should not fail
        // when automatic path for android is not set
        if (helper.isPlatformInstalled('ios') && !helper.isPlatformInstalled('android')) {
            helper.setConfigurationForPlatform('ios');
            helper.generateAutomaticPathToGdIOSSDK();
        }

        // if android platform is installed and ios platform is not installed
        // we should not proceed with getting automatic path for ios and we should not fail
        // when automatic path for ios is not set
        if (helper.isPlatformInstalled('android') && !helper.isPlatformInstalled('ios')) {
            helper.setConfigurationForPlatform('android');
            helper.generateAutomaticPathToGdAndroidSDK();
        }

        // if both platforms android and ios are installed
        // then we should try to get automatic paths for both platforms
        if (helper.isPlatformInstalled('android') && helper.isPlatformInstalled('ios')) {
            console.log('\x1b[32m%s\x1b[0m', '\nNothing to ignore because "ios" and "android" platforms are installed. Trying to get default path to BlackBerry Dynamics SDKs for iOS and Android.\n');
            helper.setConfigurationForPlatform('ios');
            helper.setConfigurationForPlatform('android');
            helper.generateAutomaticPathToGdIOSSDK();
            helper.generateAutomaticPathToGdAndroidSDK();
        }
    }

    // ---------------------------- PATHS PASSED BY USER (BOTH) ------------------------------------

    // if BlackBerry Dynamics iOS SDK and BlackBerry Dynamics Android SDK were passed we should use those
    // BlackBerry Dynamics Android SDK should point to 'sdk' directory: /Users/<user>/Downloads/gdsdk-release-<version>/sdk
    // BlackBerry Dynamics iOS SDK should point to 'GD.framework': /Users/<user>/Library/Application Support/BlackBerry/Good.platform/iOS/Frameworks/GD.framework or
    // /Applications/Xcode.app/Contents/Developer/Platforms/iPhoneOS.platform/Developer/SDKs/iPhoneOS10.0.sdk/System/Library/Frameworks/GD.framework
    // Will be handled below in case 3. of IGNORE FAILURE (ONE/TWO OF SDKs IS/ARE SET) section

    // --------------------- IGNORE FAILURE (ONE/TWO OF SDKs IS/ARE SET) ---------------------------

    // this is for case when:
    // 1. BlackBerry Dynamics Android SDK is set AND BlackBerry Dynamics iOS SDK is not set AND ignoreFailure="true"
    // 2. BlackBerry Dynamics iOS SDK is set AND BlackBerry Dynamics Android SDK is not set AND ignoreFailure="true"
    //    then we should ignore failure for particular platform;
    // 3. case when any/both of BlackBerry Dynamics SDKs is/are set and ignoreFailure="true" is not
    //    passed OR it is passed with other value will be handled as if both SDKs are passed
    //    (one - manual path, one - automatic path/both manual paths)
    // 4. case when only ignoreFailure="true" is passed OR it is passed with other value will be
    //    handled as following:
    //   - if ios platform is installed and android platform is not installed
    //     we should not proceed with getting automatic path for android and we should not fail when
    //     automatic path for android is not set
    //   - if android platform is installed and ios platform is not installed
    //     we should not proceed with getting automatic path for ios and we should not fail when
    //     automatic path for ios is not set
    //   - if both platforms android and ios are installed
    //     then we should try to get automatic paths for both platforms
    //   - if both platforms android and ios are not installed
    //     then we ignoring both platform and don't set path for SDK

    // case 1.
    // solution is to add configuration only for android platform in plugin.xml file
    // this way configuration for ios platform will not be applied and user will be able to work
    // with android platform without failure
    if (params.bbdSDKForAndroid && !params.bbdSDKForiOS && params.ignoreFailure === "true") {
        helper.setConfigurationForPlatform('android');
        helper.handleGdAndroidSDKPassedByUser();
        console.log('\x1b[32m%s\x1b[0m', '\nIgnoring ios platform...\n');
    }

    // case 2.
    // solution is to add configuration only for ios platform in plugin.xml file
    // this way configuration for android platform will not be applied and user will be able to work
    // with android platform without failure
    if (!params.bbdSDKForAndroid && params.bbdSDKForiOS && params.ignoreFailure === "true") {
        helper.setConfigurationForPlatform('ios');
        helper.handleGdIOSSDKPassedByUser();
        console.log('\x1b[32m%s\x1b[0m', '\nIgnoring android platform...\n');
    }

    // case 3.
    if (params.bbdSDKForAndroid && params.bbdSDKForiOS && !params.ignoreFailure) {
        // this is implementation for PATHS PASSED BY USER (BOTH) section
        helper.setConfigurationForPlatform('ios');
        helper.setConfigurationForPlatform('android');
        helper.handleGdIOSSDKPassedByUser();
        helper.handleGdAndroidSDKPassedByUser();
    } else if (((params.bbdSDKForAndroid || params.bbdSDKForiOS) && !params.ignoreFailure) ||
        ((params.bbdSDKForAndroid || params.bbdSDKForiOS) && params.ignoreFailure !== "true")) {

        // if path to BlackBerry Dynamics Android SDK was passed
        // we should handle this path and try to generate automatic path to BlackBerry Dynamics iOS SDK
        if (params.bbdSDKForAndroid) {
            helper.setConfigurationForPlatform('ios');
            helper.setConfigurationForPlatform('android');
            helper.handleGdAndroidSDKPassedByUser();
            helper.generateAutomaticPathToGdIOSSDK();

            console.log('\x1b[32m%s\x1b[0m', '\nTrying to generate automatic path to BlackBerry Dynamics iOS SDK...\n');
        }

        // if path to BlackBerry Dynamics iOS SDK was passed
        // we should handle this path and try to generate automatic path to BlackBerry Dynamics Android SDK
        if (params.bbdSDKForiOS) {
            helper.setConfigurationForPlatform('ios');
            helper.setConfigurationForPlatform('android');
            helper.handleGdIOSSDKPassedByUser();
            helper.generateAutomaticPathToGdAndroidSDK();

            console.log('\x1b[32m%s\x1b[0m', '\nTrying to generate automatic path to BlackBerry Dynamics Android SDK...\n');
        }
    }

    // case 4. is handled above in AUTOMATIC PATHS section

    // ------------------------------OUTPUTING VALUES TO THE CONSOLE-----------------------------------------

    var isGdIOSSDKSet = finalGdIOSSDKPath ? finalGdIOSSDKPath : 'not set',
        isGdAndroidSDKSet = finalGdAndroidSDKPath ? finalGdAndroidSDKPath : 'not set',
        idGdAssetsBundleGenerated = finalGdAssetsBundlePath ? finalGdAssetsBundlePath : 'not set';
    console.log('\x1b[32m%s\x1b[0m', '\nBlackBerry Dynamics Android SDK path: ' + isGdAndroidSDKSet + '\n');
    console.log('\x1b[32m%s\x1b[0m', 'BlackBerry Dynamics iOS SDK path: ' + isGdIOSSDKSet + '\n');
    console.log('\x1b[32m%s\x1b[0m', 'GDAssets.bundle path: ' + idGdAssetsBundleGenerated + '\n');

    // -------------------------------------------CONFIGURE BASE PLUGIN-----------------------------------------

    // Coping GDAssets.bundle from external directory in Base plugin by path ‘src/ios/resources/’.
    if (fs.existsSync(finalGdAssetsBundlePath)) {
        copyDirRecursively(finalGdAssetsBundlePath, path.join(basePluginPath, 'src', 'ios', 'resources'));
    }

    // install dependencies for Base plugin
    process.chdir(basePluginPath);
    exec('npm install', null);

    // --------- HANDLE PATH IN DEPENDENCIES FOR ALL BlackBerry Dynamics CORDOVA PLUGINS -----------
    // this will give us possibility to add any plugin from anywhere in the FileSystem
    for (var plugin = 0; plugin < bbdCordovaPlugins.length; plugin++) {
        var currentPlugin = bbdCordovaPlugins[plugin],
            pathToCurrentPlugin = path.join(pluginsPath, currentPlugin);
        helper.updateDependenciesForPlugin(pathToCurrentPlugin);
    };

    fs.mkdirSync(path.join(context.opts.projectRoot, 'plugins', 'cordova-plugin-bbd-configure', '.installed'));

    // ------------ HANDLE PATH IN DEPENDENCIES FOR ALL BlackBerry Dynamics CORDOVA Sample Application---------------
    // fix for Cordova 7
    helper.handlePluginPathInSampleApplication();

    //----------------------------- COPIING DIRECTORIES RECURSIVELY --------------------------------

    function copyDirRecursively(sourceFolder, targetFolder) {
        shellJS.cp('-R', sourceFolder, targetFolder);
        fs.chmodSync(targetFolder, '755');
    }

    // Reinstalling base plugin on re-adding configure plugin
    var installedBasePluginPath = path.join(context.opts.projectRoot, 'plugins', 'cordova-plugin-bbd-base');

    if (fs.existsSync(installedBasePluginPath)) {
        process.chdir(context.opts.projectRoot);
        execSync('cordova plugin rm cordova-plugin-bbd-base --force');
        execSync('cordova plugin add ' + basePluginPath);
    }

}