module.exports = function(context) {
    var fs = context.requireCordovaModule('fs'),
        path = context.requireCordovaModule('path'),
        platformRoot = path.join(context.opts.projectRoot, 'platforms', 'android'),
        cordovaBuildGradlePath = path.join(platformRoot, 'CordovaLib', 'build.gradle'),
        mainBuildGradlePath = path.join(platformRoot, 'build.gradle'),

        // GD-22148
        // We should remove following string from main build.gradle
        // java { exclude 'org/apache/cordova/PermissionHelper.java' }
        cordovaPermissionHelperPath = path.join(platformRoot, 'src', 'org', 'apache', 'cordova', 'PermissionHelper.java');
    if (fs.existsSync(cordovaPermissionHelperPath)) {
        var mainBuildGradle = fs.readFileSync(mainBuildGradlePath, 'utf8');

        mainBuildGradle = mainBuildGradle.replace(/main {\n\t\t\tjava { exclude 'org\/apache\/cordova\/PermissionHelper.java' }\n\t\t\tjava { exclude 'org\/apache\/cordova\/file\/\*\*' }/gm, "main {");
        fs.chmodSync(mainBuildGradlePath, '660');

        fs.writeFileSync(mainBuildGradlePath, mainBuildGradle, 'utf8');
    }
}
