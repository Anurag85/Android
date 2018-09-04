#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

// This hook is used for editing AndroidManifest.xml.
// In the case when there is android platform already installed on the project, AndroidManifest.xml file
// can be self-restored during the plugin installation process. As a result, the manifest file has to be
// reconfigured by this hook.

require('shelljs/global');

module.exports = function(context) {
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        manifestFilePath = path.join(platformRoot, 'AndroidManifest.xml');

    if (fs.existsSync(platformRoot) && fs.existsSync(manifestFilePath)) {
        var ManifestHelper = require('../../../src/android/AndroidHelper.js').ManifestHelper,
            Manifest = new ManifestHelper(manifestFilePath);

        Manifest.editManifest();
        Manifest.chmodSync('660');
    }

    console.log('\x1b[32m%s\x1b[0m', 'Plugin cordova-plugin-bbd-base was successfully added.');
};
