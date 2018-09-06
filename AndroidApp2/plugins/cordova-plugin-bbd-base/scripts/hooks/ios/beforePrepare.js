#!/usr/bin/env node

/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

module.exports = function(context) {
    var fse = require('fs-extra'),
        fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        ConfigParser = require('cordova-common').ConfigParser,
        configXmlPath = path.join(context.opts.projectRoot, 'config.xml'),
        configXmlObj = new ConfigParser(configXmlPath),
        appName = new ConfigParser(path.join(context.opts.projectRoot, 'config.xml')).name();

    // fixing aplication icons
    var defaultIconSetPath = path.join(context.opts.projectRoot,
        'platforms',
        'ios',
        appName,
        'Images.xcassets',
        'AppIcon.appiconset');

    if (fs.existsSync(path.join(context.opts.projectRoot, 'platforms', 'ios', 'build')))
        fse.removeSync(path.join(context.opts.projectRoot, 'platforms', 'ios', 'build'));

    if (fs.existsSync(defaultIconSetPath)) {
        fs.readdirSync(defaultIconSetPath).forEach(function(fileName) {
            if (path.extname(fileName) != ".json") {
                fs.unlinkSync(path.join(defaultIconSetPath, fileName));
            }
        });
    }

};