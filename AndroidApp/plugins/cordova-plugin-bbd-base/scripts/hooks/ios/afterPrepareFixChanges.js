#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

// The hook is used during execution "cordova platform update ios" command. The main goal of this hook
// is to fix the ios project crash after updating the platform. Cordova versions lower than 5.4.0 do not have
// the hook related to this command and the bug fix is to reinstall the iOS platform.
// Also, these Cordova versions do not have functionality for installing already added plugins into the specific platform
// when plugins were added before platforms. As a result, these plugins have to be reinstalled.

require('shelljs/global');

module.exports = function(context) {
    var ConfigHelper = require('../../../src/android/AndroidHelper.js').ConfigHelper,
        pluginHelper = require('../../../src/android/AndroidHelper.js').pluginHelper,
        fse = require('fs-extra'),
        fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        command = process.argv.join(' '),
        os = require('os'),
        ConfigParser = require('cordova-common').ConfigParser,
        configXmlPath = path.join(context.opts.projectRoot, 'config.xml'),
        configXmlObj = new ConfigParser(configXmlPath),
        appName = new ConfigParser(path.join(context.opts.projectRoot, 'config.xml')).name();


    if (!command.includes('platform update')) {
        var storyBoardPath = path.join(context.opts.projectRoot, 'platforms',
            'ios', getAppName(), 'Resources', 'LaunchScreen.storyboard');

        if (fs.existsSync(storyBoardPath)) {
            var storyBoardContent = fs.readFileSync(storyBoardPath, 'utf-8'),

                storyBoardContentWithName = storyBoardContent.split(os.EOL).map(function(contentLine) {
                    if (contentLine.includes('<label') && contentLine.includes('text=')) {

                        var startIndex = contentLine.indexOf('"', contentLine.indexOf('text=')),
                            endIndex = contentLine.indexOf('"', ++startIndex);

                        return contentLine.replace(contentLine.substring(startIndex, endIndex), getAppName());

                    }
                    return contentLine;
                }).join(os.EOL);

            fs.writeFileSync(storyBoardPath, storyBoardContentWithName, 'utf-8');
        }

        // fix icons
        var pathToCustomIcons = path.join(context.opts.projectRoot, 'platforms',
                'ios',
                appName,
                'Images.xcassets',
                'AppIcon.appiconset'),
            pathToBBDIcons = path.join(context.opts.projectRoot, 'platforms',
                'ios',
                appName,
                'Resources',
                'Images.xcassets');

        if (configXmlObj.getIcons('ios').length > 0 || configXmlObj.doc.getroot().find('icon')) {

            if (!fs.existsSync(path.join(pathToBBDIcons, 'BBD_AppIcon.appiconset'))) {
                fse.moveSync(path.join(pathToBBDIcons, 'AppIcon.appiconset'), path.join(pathToBBDIcons, 'BBD_AppIcon.appiconset'))
            }

            fse.copySync(pathToCustomIcons, path.join(pathToBBDIcons, 'AppIcon.appiconset'));

        } else {
            if (fs.existsSync(path.join(pathToBBDIcons, 'BBD_AppIcon.appiconset'))) {
                fse.removeSync(path.join(pathToBBDIcons, 'AppIcon.appiconset'));
                fse.moveSync(path.join(pathToBBDIcons, 'BBD_AppIcon.appiconset'), path.join(pathToBBDIcons, 'AppIcon.appiconset'))
            }
        }
    }

    function getAppName() {
        var configXMLPath = path.join(context.opts.projectRoot, 'config.xml'),
            configXMLObject = new ConfigHelper(configXMLPath);

        return getNodeTextSafe(configXMLObject.doc.find('name'));
    };

    function getNodeTextSafe(el) {
        return el && el.text && el.text.trim();
    };
};
