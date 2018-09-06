cordova.define("cordova-plugin-bbd-xmlhttprequest.FormData", function(require, exports, module) {
/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    /**
     * @class GDFormData
     * @classdesc GDFormData objects provide a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest send() method.
     */
    window.GDFormData = function() {
        Object.defineProperties(this, {
            'toString': {
                value: function() {
                    return '[object GDFormData]';
                }
            }
        });
    };

    Object.defineProperties(GDFormData, {
        'toString': {
            value: function() {
                return 'function GDFormData() { [native code] }';
            }
        }
    });

    /**
     * @function GDFormData#append
     * @description Appends a key/value pair to the FormData object.
     * @param {String} key Key for FormData value
     * @param {String} value Value for FormData key
     *
     * @example
     * var formData = new FormData();
     * formData.append("key", "value");
     * console.log(formData.key); // "value"
     */
    GDFormData.prototype.append = function(key, value) {
        if (arguments.length == 0 || arguments.length == 1) {
            throw ({
                message: "TypeError: Failed to execute 'append' on 'FormData': 2 arguments required, but only " + arguments.length + " present."
            });
        }

        if (!this[key]) {
            this[key] = value;
        }

        return this;
    };

    Object.defineProperty(GDFormData.prototype.append, 'toString', {
        value: function() {
            return 'function GDFormData.append() { [native code] }';
        }
    });

    FormData = GDFormData;

    module.exports = FormData;
})();
// End the Module Definition.
//************************************************************************************************

});
