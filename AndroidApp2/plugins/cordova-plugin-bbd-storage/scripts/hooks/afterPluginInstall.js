module.exports = function(context) {
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        cordovaBuildGradlePath = path.join(platformRoot, 'CordovaLib', 'build.gradle'),
        mainBuildGradlePath = path.join(platformRoot, 'build.gradle'),

        // GD-22148
        // There is one special issue when the application contains Cordova Camera/Geolocation/File plugin and we add BBD Cordova Storage plugin.
        // When we try to build the application in this case, it will fail to build because of duplication on PermissionHelper class on both sides.
        // It is because jar file for BBD Cordova Storage plugin already contains compiled version of PermissionHelper.java class and Cordova Camera/Geolocation/File
        // plugins add it one more time.
        // The solution seems very simple: as we know that compiled version of PermissionHelper class is in out jar we can exclude PermissionHelper.java class from
        // compiled sources to avoid duplication and build failure.
        // To do this we will add the following piece of code to the main build.gradle file:
        // 'java { exclude 'org/apache/cordova/PermissionHelper.java' }'
        cordovaPermissionHelperPath = path.join(platformRoot, 'src', 'org', 'apache', 'cordova', 'PermissionHelper.java');
    if (fs.existsSync(cordovaPermissionHelperPath)) {
        var mainBuildGradle = fs.readFileSync(mainBuildGradlePath, 'utf8');
        mainBuildGradle = mainBuildGradle.replace(/main {/gm, "main {\n\t\t\tjava { exclude 'org/apache/cordova/PermissionHelper.java' }\n\t\t\tjava { exclude 'org/apache/cordova/file/**' }");

        fs.chmodSync(mainBuildGradlePath, '660');

        fs.writeFileSync(mainBuildGradlePath, mainBuildGradle, 'utf8');
    }
}
