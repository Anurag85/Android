/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    if (typeof XMLHttpRequest.prototype.__open !== "function") {
        XMLHttpRequest.prototype.__open = XMLHttpRequest.prototype.open;
        XMLHttpRequest.prototype.open = function() {
            this.__open.apply(this, arguments);
            if (arguments.length >= 5) {
                var _user = arguments[3],
                    _pass = arguments[4];

                if (typeof _user != "string")
                    throw new Error("\"user\" param must have a string type");

                if (typeof _pass != "string")
                    throw new Error("\"user\" param must have a string type");

                this.setRequestHeader.apply(this, ["Authorization", "Basic " + btoa(_user + ":" + _pass)]);
            }
        }
    }

    Object.defineProperty(XMLHttpRequest.prototype.open,
        'toString', {
            value: function() {
                return 'function ' + this.name + '() { [native code] }';
            },
            writable: false
        });

    module.exports = XMLHttpRequest;
}());

// End XMLHttpRequest.js
//*****************************************************************  //leave empty line after