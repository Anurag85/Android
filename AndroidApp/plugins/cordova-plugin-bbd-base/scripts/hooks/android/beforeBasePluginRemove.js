#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

// This hook is used for AndroidManifest.xml, project.properties, settings.gradle and MainActivity.java files restoring during the Base plugin remove proccess
module.exports = function(context) {
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        AndroidHelper = require('../../../src/android/AndroidHelper.js'),
        ManifestHelper = AndroidHelper.ManifestHelper,
        CommonHelper = AndroidHelper.CommonHelper,
        PropertiesHelper = AndroidHelper.PropertiesHelper,
        SettingsGradleHelper = AndroidHelper.SettingsGradleHelper,
        ConfigXMLHelper = AndroidHelper.ConfigHelper,
        platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        manifestFilePath = path.join(platformRoot, 'AndroidManifest.xml'),
        propertiesPath = path.join(platformRoot, 'project.properties'),
        settingsGradlePath = path.join(platformRoot, 'settings.gradle');

    if (fs.existsSync(manifestFilePath)) {
        var Manifest = new ManifestHelper(manifestFilePath),
            packageName = Manifest.packageName(),
            packageToPath = path.join.apply(null, packageName.split('.')),
            configXMLPath = path.join(context.opts.projectRoot, 'config.xml'),
            packageFullPath = path.join(context.opts.projectRoot, 'platforms', 'android', 'src', packageToPath),
            mainActivityPath = path.join(packageFullPath, 'MainActivity.java'),
            MainActivity = new CommonHelper(mainActivityPath);

        MainActivity.replaceStringsGlobal('import com.good.gd.cordova.core.GDCordovaActivity;', '');
        MainActivity.replaceStringsGlobal('extends GDCordovaActivity \/\*extends CordovaActivity\*\/', 'extends CordovaActivity');

        MainActivity.writeSync();

        Manifest.restoreManifest();

        configXML = new ConfigXMLHelper(configXMLPath);

        if (configXML.isCustomIconSet()) {
            Manifest.setAttribute(Manifest.customAndroidManifestValues.icon);
        }

    }

    var SettingsGradle = new SettingsGradleHelper(settingsGradlePath),
        Properties = new PropertiesHelper(propertiesPath);

    Properties.restoreProperties();
    SettingsGradle.restoreSettings();
};