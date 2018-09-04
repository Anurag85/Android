#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

// This hook is used for AndroidManifest.xml, settings.json, settings.gradle, project.properties files
// configuration after the Base plugin was installed on android platform.
// NOTE: the manifest file can be self-restored during plugin installation (during platform adding process.)
// Fixed by after_plugin_add android hook.

var os = require('os');
var fse = require('fs-extra');
require('shelljs/global');

module.exports = function(context) {

    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path');

    var platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        assets = path.join(context.opts.projectRoot, 'platforms', 'android', 'assets'),
        manifestFilePath = path.join(platformRoot, 'AndroidManifest.xml'),
        settingsJsonPath = path.join(assets, 'settings.json'),
        settingsGradlePath = path.join(platformRoot, 'settings.gradle'),
        projectPropertiesPath = path.join(platformRoot, 'project.properties'),

        PropertiesHelper = require('../../../src/android/AndroidHelper.js').PropertiesHelper,
        ManifestHelper = require('../../../src/android/AndroidHelper.js').ManifestHelper,
        CommonHelper = require('../../../src/android/AndroidHelper.js').CommonHelper,
        SettingsGradleHelper = require('../../../src/android/AndroidHelper.js').SettingsGradleHelper,
        SettingsJsonHelper = require('../../../src/android/AndroidHelper.js').SettingsJsonHelper;

    var basePluginProjectPath = path.join(context.opts.projectRoot, 'plugins', 'cordova-plugin-bbd-base'),
        buildFilesFixHookPath = path.join(basePluginProjectPath, 'scripts', 'hooks', 'android', 'beforePrepare.js'),
        pathToAndroidPlatform = path.join(context.opts.projectRoot, 'platforms', 'android');

    var projectProperties = new PropertiesHelper(projectPropertiesPath);
    projectProperties.editProperties();
    projectProperties.chmodSync('777');

    var Manifest = new ManifestHelper(manifestFilePath);
    Manifest.editManifest();
    Manifest.chmodSync('660');

    var SettingsGradle = new SettingsGradleHelper(settingsGradlePath);
    SettingsGradle.editSettings();

    var settingsJson = new SettingsJsonHelper(context),
        packageName = Manifest.packageName();

    settingsJson.addProperty("GDApplicationID", packageName);
    settingsJson.writeSync();
    settingsJson.chmodSync('777');

    var packageToPath = path.join.apply(null, packageName.split('.')),
        packageFullPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'src', packageToPath),
        mainActivityPath = path.join(packageFullPath, 'MainActivity.java'),
        mainActivity = new CommonHelper(mainActivityPath);

    if (mainActivity.doc.indexOf('GDCordovaActivity') == -1) {
        mainActivity.replaceStringsGlobal('import org.apache.cordova.*;', ['import org.apache.cordova.*;', 'import com.good.gd.cordova.core.GDCordovaActivity;'].join(os.EOL));
        mainActivity.replaceStringsGlobal('extends CordovaActivity', 'extends GDCordovaActivity /*extends CordovaActivity*/');

        mainActivity.writeSync();
        mainActivity.chmodSync('777');
    }

    fs.chmodSync(path.join(platformRoot, 'GDLibrary', 'build.gradle'), '755');
    fs.chmodSync(path.join(platformRoot, 'GDLibrary_BackupSupport', 'build.gradle'), '755');

    // Update Android Sdk Version
    var configXmlPath = path.join(context.opts.projectRoot, 'config.xml'),
        ConfigParser = require('cordova-common').ConfigParser,
        configXmlObj = new ConfigParser(configXmlPath),
        CordovaLibManifestXmlPath = path.join(platformRoot, 'CordovaLib', 'AndroidManifest.xml'),
        CordovaLibManifestHelperObj = new ManifestHelper(CordovaLibManifestXmlPath),
        dataForManifestXml = [
            { location: './uses-sdk', attrName: 'android:minSdkVersion', value: '19' },
            { location: './uses-sdk', attrName: 'android:targetSdkVersion', value: '25' }
        ];

    configXmlObj.setGlobalPreference('android-minSdkVersion', 19);
    configXmlObj.setGlobalPreference('android-targetSdkVersion', 25);
    configXmlObj.write();

    setPropertiesInManifestObj(CordovaLibManifestHelperObj);

    console.log('\x1b[32m%s\x1b[0m', 'Plugin cordova-plugin-bbd-base was successfully installed for android.');

    function setPropertiesInManifestObj(obj) {
        for (var attr in dataForManifestXml) {
            var attrObj = dataForManifestXml[attr];
            obj.setAttribute(attrObj);
        }
        obj.writeSync();
    }

    // Copy our hook to application's hooks folder
    // This hook will be self removed
    if (fs.existsSync(pathToAndroidPlatform)) {
        fse.copySync(buildFilesFixHookPath, path.join(context.opts.projectRoot, 'hooks', 'android', 'afterCordovaPluginInstall.js'));
        fs.chmodSync(path.join(context.opts.projectRoot, 'hooks', 'android', 'afterCordovaPluginInstall.js'), '770');
    }

    // Make hook abvailable in main config.xml file of the application
    if (fs.existsSync(configXmlPath)) {
        var configXmlContent = fs.readFileSync(configXmlPath, { encoding: 'utf8' });
        if (fs.existsSync(pathToAndroidPlatform) && configXmlContent.indexOf('afterCordovaPluginInstall.js') < 0) {
            configXmlContent = configXmlContent.replace('<platform name="android">', '<platform name="android">\n \t<hook src="hooks/android/afterCordovaPluginInstall.js" type="after_plugin_install" />\n');
            fs.writeFileSync(configXmlPath, configXmlContent, 'utf8');
        }
    }

};
