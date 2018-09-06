cordova.define("cordova-plugin-bbd-storage.ProgressEvent", function(require, exports, module) {
/**
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {

    /**
     * @class GDProgressEvent
     *
     * @classdesc Is responsible for progress event
     * @property {String} type Type of file being processed
     * @property {Boolean} bubbles false
     * @property {Boolean} cancelBubble false
     * @property {Boolean} cancelable false
     * @property {Boolean} lengthComputable Property that shows if length of file can be computed or not
     * @property {Number} loaded Number of loaded bites at the moment
     * @property {Number} total Total number of bites
     * @property {GDFile} target File being processed
     *
     * @example
     * // This object is used by other classes and is not used directly
     * var fileTransfer = new FileTransfer();
     *
     * fileTransfer.onprogress = function(progressEvent) {
     *     if (progressEvent.lengthComputable) {
     *         var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
     *         console.log(perc + '%');
     *     }
     * };
     */

    var GDProgressEvent = (function() {
        return function ProgressEvent(type, dict) {
            var eventType = type,
                bubbles = false,
                cancelBubble = false,
                cancelable = false,
                loaded = dict && dict.loaded ? dict.loaded : 0,
                total = dict && dict.total ? dict.total : 0,
                target = dict && dict.target ? dict.target : null,
                lengthComputable = Boolean(loaded);

            Object.defineProperties(this, {
                'type': {
                    get: function() {
                        return eventType;
                    },
                    set: function(eType) {
                        eventType = eType;
                    }
                },
                'bubbles': {
                    get: function() {
                        return bubbles;
                    },
                    set: function(isBubbles) {
                        bubbles = isBubbles;
                    }
                },
                'cancelBubble': {
                    get: function() {
                        return cancelBubble;
                    },
                    set: function(isCancelBubble) {
                        cancelBubble = isCancelBubble;
                    }
                },
                'cancelable': {
                    get: function() {
                        return cancelable;
                    },
                    set: function(isCancelable) {
                        cancelable = isCancelable;
                    }
                },
                'lengthComputable': {
                    get: function() {
                        return lengthComputable;
                    },
                    set: function(isLengthComputable) {
                        lengthComputable = isLengthComputable;
                    }
                },
                'loaded': {
                    get: function() {
                        return loaded;
                    },
                    set: function(isLoaded) {
                        loaded = isLoaded;
                    }
                },
                'total': {
                    get: function() {
                        return total;
                    },
                    set: function(newTotal) {
                        total = newTotal;
                    }
                },
                'target': {
                    get: function() {
                        return target;
                    },
                    set: function(newTarget) {
                        target = newTarget;
                    }
                },
                'toString' : {
                    value: function() {
                        return '[object GDProgressEvent]';
                    }
                }
            })
        };
    })();

    Object.defineProperty(GDProgressEvent, 'toString', {
        value: function() {
            return 'function GDProgressEvent() { [native code] }';
        }
    });

    Object.preventExtensions(GDProgressEvent);

    ProgressEvent = GDProgressEvent;

    module.exports = ProgressEvent;
})();

// End the Module Definition.
//************************************************************************************************

});
