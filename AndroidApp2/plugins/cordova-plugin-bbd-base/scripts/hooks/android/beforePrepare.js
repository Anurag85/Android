#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

module.exports = function(context) {

    var path = context.requireCordovaModule('path'),
        fs = context.requireCordovaModule('fs');

    var platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        settingsGradlePath = path.join(platformRoot, 'settings.gradle'),
        projectPropertiesPath = path.join(platformRoot, 'project.properties'),
        manifestPath = path.join(platformRoot, 'AndroidManifest.xml'),
        AndroidHelperPath = setAndroidHelperPath(),
        configXMLPath = path.join(context.opts.projectRoot, 'config.xml'),

        PropertiesHelper = require(AndroidHelperPath).PropertiesHelper,
        SettingsGradleHelper = require(AndroidHelperPath).SettingsGradleHelper,
        ManifestHelper = require(AndroidHelperPath).ManifestHelper,
        cordovaPlugins = require(AndroidHelperPath).cordovaPlugins(),
        ConfigXMLHelper = require(AndroidHelperPath).ConfigHelper,
        GeneralHelper = require(AndroidHelperPath).GeneralHelper,

        projectProperties = new PropertiesHelper(projectPropertiesPath),
        settingsGradle = new SettingsGradleHelper(settingsGradlePath),
        androidManifest = new ManifestHelper(manifestPath),
        configXML = new ConfigXMLHelper(configXMLPath),
        generalHelper = new GeneralHelper(context);

    if (cordovaPlugins.includes('cordova-plugin-bbd-storage')) {
        var buildGradleObj = buildGradle();

        if (!checkForStorageConfiguration(buildGradleObj.stream))
            editBuildGradle(buildGradleObj);
    }

    androidManifest.editManifest();

    projectProperties.editProperties();
    projectProperties.chmodSync('777');

    settingsGradle.editSettings();

    function isBeforePrepare() {
        return context.opts.projectRoot === path.join(__dirname, '..', '..', '..', '..', '..');
    }

    function setAndroidHelperPath() {
        if (isBeforePrepare())
            return '../../../src/android/AndroidHelper.js';
        return '../../plugins/cordova-plugin-bbd-base/src/android/AndroidHelper.js';
    }

    function checkForStorageConfiguration(stream) {
        var permissionHelper = "java { exclude 'org/apache/cordova/PermissionHelper.java' }",
            orgApachCordovaFiles = "java { exclude 'org/apache/cordova/file/**' }";
        return stream.includes(permissionHelper) && stream.includes(orgApachCordovaFiles);
    }

    function buildGradle() {
        var buildGradlePath = path.join(platformRoot, 'build.gradle');
        return {
            path: buildGradlePath,
            stream: fs.readFileSync(buildGradlePath, 'utf-8')
        };
    }

    function editBuildGradle(buildGradle) {
        buildGradle.stream = buildGradle.stream.replace(/main {/gm,
            "main {\n\t\t\tjava { exclude 'org/apache/cordova/PermissionHelper.java' } " +
            "\n\t\t\tjava { exclude 'org/apache/cordova/file/**' }");
        fs.writeFileSync(buildGradle.path, buildGradle.stream, 'utf-8');
    }

    // Handle setting custom icons
    if (configXML.isCustomIconSet()) {
        var iconsFolders = [
            'mipmap-ldpi', 'mipmap-mdpi', 'mipmap-hdpi', 'mipmap-xhdpi', 'mipmap-xxhdpi', 'mipmap-xxxhdpi'
        ];

        generalHelper.prepareResourceFolders(iconsFolders);
        androidManifest.setAttribute(androidManifest.customAndroidManifestValues.icon);

        androidManifest.writeSync();
    }

};