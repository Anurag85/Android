cordova.define("cordova-plugin-bbd-xmlhttprequest.XmlHttpRequest", function(require, exports, module) {
/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec'),
        ProgressEvent = require('cordova-plugin-bbd-storage.ProgressEvent');

    // =====================================================================================
    //      EventTarget
    //  Implementation of EventTarget interface for the GDXMLHttpRequestEventTarget prototype.
    //  Implements the "addEventListener" and "removeEventListener" functions. "fireEvent"
    //  function is used as a callback trigger.
    // =====================================================================================
    var EventTarget = function() {
        var eventListeners = {};

        Object.defineProperty(this, 'listeners', {
            get: function() {
                return eventListeners;
            },
            enumerable: false
        });
    }

    Object.defineProperty(EventTarget, 'toString', {
        value: function() {
            return 'function EventTarget() { [native code] }';
        },
        enumerable: false
    })

    EventTarget.prototype.constructor = EventTarget;

    EventTarget.prototype.addEventListener = function(type, callback) {
        if (arguments < 2) {
            throw new Error("TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only" + arguments.length + "present.");
        }
        if (typeof type === 'string' && typeof callback === 'function') {
            if (typeof this.listeners[type] == 'undefined') {
                this.listeners[type] = [];
            }

            this.listeners[type].push(callback);
        }
    };

    EventTarget.prototype.fireEvent = function(event) {
        if (typeof event == "string") {
            event = { type: event };
        }
        if (!event.target) {
            event.target = this;
        }

        if (!event.type) {
            event.type = event.target.toString();
        }

        if (this.listeners[event.type] instanceof Array) {
            var listeners = this.listeners[event.type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (typeof listeners[i] === 'function') {
                    listeners[i].call(this, event);
                }
            }
        }
    };

    EventTarget.prototype.removeEventListener = function(type, listener) {
        if (this.eventListeners[type] instanceof Array) {
            var listeners = this.eventListeners[type];
            for (var i = 0, len = listeners.length; i < len; i++) {
                if (listeners[i] === listener) {
                    listeners.splice(i, 1);
                    break;
                }
            }
        }
    }

    hideOwnPropertiesImplementation(EventTarget.prototype);

    // =====================================================================================
    //      GDXMLHttpRequestEventTarget
    //  Implementation of GDXMLHttpRequestEventTarget prototype for the GDXMLHttpRequest and
    //  GDXMLHttpRequestUpload. Used as a place holder for the callbacks and event handlers
    //  of GDXMLHttpRequest and GDXMLHttpRequestUpload. Inherits the prototype functions of
    //  EventTarget interface implementation and own properties of EventTarget constructor
    // =====================================================================================
    var GDXMLHttpRequestEventTarget = function() {
        EventTarget.call(this);
        this.listeners = {};
        this.listeners.onabort = null;
        this.listeners.onerror = null;
        this.listeners.onload = null;
        this.listeners.onloadend = null;
        this.listeners.onloadstart = null;
        this.listeners.onprogress = null;
        this.listeners.ontimeout = null;
        this.listeners.onabort = null;
    };

    Object.defineProperty(GDXMLHttpRequestEventTarget, 'toString', {
        value: function() {
            return 'function GDXMLHttpRequestEventTarget() { [native code] }';
        },
        writable: false
    });

    GDXMLHttpRequestEventTarget.prototype = Object.create(EventTarget.prototype);
    GDXMLHttpRequestEventTarget.prototype.constructor = GDXMLHttpRequestEventTarget;

    Object.defineProperties(GDXMLHttpRequestEventTarget.prototype, {
        'onabort': {
            get: function() {
                return this.listeners.onabort;
            },
            set: function(callback) {
                this.listeners.onabort = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'onerror': {
            get: function() {
                return this.listeners.onerror;
            },
            set: function(callback) {
                this.listeners.onerror = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'onload': {
            get: function() {
                return this.listeners.onload;
            },
            set: function(callback) {
                this.listeners.onload = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'onloadend': {
            get: function() {
                return this.listeners.onloadend;
            },
            set: function(callback) {
                this.listeners.onloadend = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'onloadstart': {
            get: function() {
                return this.listeners.onloadstart;
            },
            set: function(callback) {
                this.listeners.onloadstart = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'onprogress': {
            get: function() {
                return this.listeners.onprogress;
            },
            set: function(callback) {
                this.listeners.onprogress = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
        'ontimeout': {
            get: function() {
                return this.listeners.ontimeout;
            },
            set: function(callback) {
                this.listeners.ontimeout = typeof callback === 'function' ? callback : null;

                return callback;
            },
            enumerable: true,
            configurable: true
        },
    });

    // =====================================================================================
    //      GDXMLHttpRequestUpload
    //  Implementation of GDXMLHttpRequestUpload prototype for the 'upload' property of
    //  GDXMLHttpRequest instance. Used as a place holder for the callbacks and event handlers
    //  of GDXMLHttpRequest and GDXMLHttpRequestUpload. Inherits the prototype functions of
    //  EventTarget interface implementation and own properties of EventTarget constructor
    // =====================================================================================

    var GDXMLHttpRequestUpload = function() {
        GDXMLHttpRequestEventTarget.call(this);
        this.listeners = {};
        this.listeners.onabort = null;
        this.listeners.onerror = null;
        this.listeners.onload = null;
        this.listeners.onloadend = null;
        this.listeners.onloadstart = null;
        this.listeners.onprogress = null;
        this.listeners.ontimeout = null;
        this.listeners.onabort = null;

        Object.defineProperty(this, 'toString', {
            value: function() {
                return '[object GDXMLHttpRequestUpload]';
            }
        });
    }

    GDXMLHttpRequestUpload.prototype = Object.create(GDXMLHttpRequestEventTarget.prototype);
    GDXMLHttpRequestUpload.prototype.constructor = GDXMLHttpRequestUpload;

    Object.defineProperty(GDXMLHttpRequestUpload, 'toString', {
        value: function() {
            return 'function GDXMLHttpRequestUpload() { [native code] }';
        },
        writable: false
    });
    // =====================================================================================
    //      GDXMLHttpRequest
    //  Inherits the own properties and prototype own properties of EventTarget,
    //  GDXMLHttpRequestEventTarget
    // =====================================================================================

    /**
     * @class XMLHttpRequest
     * @classdesc XMLHttpRequest is a JavaScript object that provides an easy way
     * to retrieve data from a URL without having to do a full page refresh.
     * A Web page can update just a part of the page without disrupting what the user is doing.
     * XMLHttpRequest is used heavily in AJAX programming.
     *
     * @property {string} onreadystatechange A JavaScript function object that is called whenever the readyState attribute changes.
     * The callback is called from the user interface thread.
     *
     * @property {number} readyState The state of the request. Possible values are:
     * 0 - when open() method has not been called yet
     * 1 - when send() methos has not been called yet
     * 2 - when send() method has been called, and headers and status are available
     * 3 - downloading; responseText holds partial data
     * 4 - operation is complete
     *
     * @property {string} response The response entity body according to responseType,
     * as an ArrayBuffer, Blob, Document, JavaScript object (for "json"), or string.
     * This is null if the request is not complete or was not successful.
     *
     * @property {string} responseText The response to the request as text, or null if the request was unsuccessful or has not yet been sent.
     *
     * @property {string} responseType Can be set to change the response type. Possible values are:
     * "" (empty string) - String (this is the default)
     * "document" - Document
     * "json" - JavaScript object, parsed from a JSON string returned by the server
     * "text" - String
     * "blob" - JavaScript object, parsed from readable stream of binary data responded by the server
     *
     * @property {string} responseXML The response to the request as a DOM Document object, or null if the request was unsuccessful, has not yet been sent, or cannot be parsed as XML or HTML.
     * The response is parsed as if it were a text/xml stream.
     * When the responseType is set to "document" and the request has been made asynchronously, the response is parsed as a text/html stream.
     *
     * @property {number} status The status of the response to the request. This is the HTTP result code (for example, status is 200 for a successful request).
     *
     * @property {string} statusText The response string returned by the HTTP server. Unlike status, this includes the entire text of the response message ("200 OK", for example).
     *
     * @property {string} timeout The number of milliseconds a request can take before automatically being terminated. A value of 0 (which is the default) means there is no timeout.
     *
     * @property {string} ontimeout A JavaScript function object that is called whenever the request times out.
     *
     * @property {string} upload The upload process can be tracked by adding an event listener to upload.
     *
     * @property {string} withCredentials Indicates whether or not cross-site Access-Control requests should be made using credentials such as cookies or authorization headers.
     * The default is false.
     */
    var _realXMLHttpRequest = XMLHttpRequest,
        originOpenMethod = _realXMLHttpRequest.prototype.open;

    // prevent calling the open method of XMLHttpRequest for non local resources
    _realXMLHttpRequest.prototype.open = function() {
        if (arguments.length < 2) {
            throw new Error("TypeError: Failed to execute 'open' on 'XMLHttpRequest': 2 arguments required, but only " + arguments.length + " present.");
        }
        var parsedURL = parseURL(arguments[1]);

        if (parsedURL.protocol === 'file:') {
            originOpenMethod.apply(this, arguments);
        }

        return false;
    }

    Object.defineProperty(_realXMLHttpRequest.prototype.open, 'toString', {
        value: function() {
            return 'function open() { [native code] }';
        },
        writable: false
    });

    var events = [
        'onabort', 'onerror', 'onload', 'onloadstart', 'onloadend', 'onprogress', 'ontimeout', 'onreadystatechange'
    ];

    var GDXMLHttpRequest = function() {
        GDXMLHttpRequestEventTarget.call(this);

        this.listeners.onreadystatechange = null;

        var realXMLHttpRequest = new _realXMLHttpRequest(),
            options = {
                sendOptions: { "RequestHeaders": null, "PostParameters": null, "HttpBody": null },
                readyState: 0,
                response: '',
                responseText: '',
                responseType: '',
                responseURL: '',
                responseXML: '',
                status: 0,
                statusText: '',
                timeout: 0,
                withCredentials: false,
                isRealUsed: false
            };

        Object.defineProperties(this, {
            '_realXMLHttpRequest': {
                get: function() {
                    return realXMLHttpRequest;
                },
                enumerable: false
            },
            'options': {
                get: function() {
                    return options;
                },
                enumerable: false
            },
            'upload': {
                value: new GDXMLHttpRequestUpload(),
                enumerable: true
            },
            'toString': {
                value: function() {
                    return '[object GDXMLHttpRequest]';
                }
            }
        });
    };

    Object.defineProperties(GDXMLHttpRequest, {
        'DONE': {
            value: 4,
            enumerable: true
        },
        'HEADERS_RECEIVED': {
            value: 2,
            enumerable: true
        },
        'LOADING': {
            value: 3,
            enumerable: true
        },
        'OPENED': {
            value: 1,
            enumerable: true
        },
        'UNSENT': {
            value: 0,
            enumerable: true
        },
        'toString': {
            value: function() {
                return 'function GDXMLHttpRequest() { [native code] }';
            },
            enumerable: false
        }
    });

    GDXMLHttpRequest.prototype = Object.create(GDXMLHttpRequestEventTarget.prototype);

    GDXMLHttpRequest.prototype.constructor = GDXMLHttpRequest;

    Object.defineProperties(GDXMLHttpRequest.prototype, {
        'DONE': {
            value: 4,
            enumerable: true
        },
        'HEADERS_RECEIVED': {
            value: 2,
            enumerable: true
        },
        'LOADING': {
            value: 3,
            enumerable: true
        },
        'OPENED': {
            value: 1,
            enumerable: true
        },
        'UNSENT': {
            value: 0,
            enumerable: true
        },
        'onreadystatechange': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.listeners.onreadystatechange;
            },
            set: function(callback) {
                this.listeners.onreadystatechange = callback;
            },
            enumerable: true
        },
        'readyState': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.readyState;
            },
            enumerable: true
        },
        'response': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.response;
            },
            enumerable: true
        },
        'responseText': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.responseText;
            },
            enumerable: true
        },
        'responseType': {
            get: function() {
                if (this.options.isRealUsed) {
                    return this._realXMLHttpRequest.responseType;
                }
                return this.options.responseType;
            },
            set: function(type) {
                if (this.options.isRealUsed && this._realXMLHttpRequest.readyState < this.HEADERS_RECEIVED) {
                    this._realXMLHttpRequest.responseType = type;
                }
                this.options.responseType = type;
            },
            enumerable: true
        },
        'responseURL': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.responseURL;
            },
            enumerable: true
        },
        'responseXML': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.responseXML;
            },
            enumerable: true
        },
        'status': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.status;
            },
            enumerable: true
        },
        'statusText': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.statusText;
            },
            enumerable: true
        },
        'timeout': {
            get: function() {
                if (this.options.isRealUsed) {
                    onRequestUpdated(this);
                }
                return this.options.timeout;
            },
            set: function(delay) {
                if (this.options.isRealUsed && this._realXMLHttpRequest.readyState < this.HEADERS_RECEIVED) {
                    this._realXMLHttpRequest.timeout = delay;
                }
                this.options.timeout = delay;
            },
            enumerable: true
        },
        'withCredentials': {
            get: function() {
                return this.options.withCredentials;
            },
            set: function(value) {
                if (this.options.isRealUsed && this._realXMLHttpRequest.readyState < this.HEADERS_RECEIVED) {
                    this._realXMLHttpRequest.withCredentials = value;
                }
                this.options.withCredentials = value;
            },
            enumerable: true
        }
    });

    // ***** BEGIN: MODULE METHOD DEFINITIONS - XMLHttpRequest *****

    /**
     * @function XMLHttpRequest#open
     *
     * @description Initializes a request.
     * This method is to be used from JavaScript code; to initialize a request from native code.
     *
     * @param {string} method The HTTP method to use, such as "GET", "POST", "PUT", "DELETE".
     *
     * @param {string} url The URL to send the request to.
     *
     * @param {boolean} async An optional boolean parameter, defaulting to true, indicating whether or not to perform the operation asynchronously.
     * If this value is false, the send() method does not return until the response is received.
     * If true, notification of a completed transaction is provided using event listeners.
     * This must be true if the multipart attribute is true, or an exception will be thrown.
     *
     * @param {string} user The optional user name to use for authentication purposes; by default, this is an empty string.
     *
     * @param {string} password The optional password to use for authentication purposes; by default, this is an empty string.
     */

    GDXMLHttpRequest.prototype.open = function(method, url, optAsync, optUser, optPassword) {

        if (arguments.length < 2) {
            throw new Error("TypeError: Failed to execute 'open' on 'XMLHttpRequest': 2 arguments required, but only " + arguments.length + " present.");
        }

        var parsedURL = parseURL(url);

        this.options.method = method;
        this.options.url = parsedURL.href;

        if (parsedURL.protocol === 'file:') {
            //call native OPEN function
            this._realXMLHttpRequest.open.apply(this._realXMLHttpRequest, arguments);

            this.options.isRealUsed = true;

            onRequestUpdated(this);
        }

        this.options.readyState = this.OPENED;

        if (typeof optAsync === "undefined")
            this.options.async = true;
        else
            this.options.async = optAsync;

        if (typeof optUser === "undefined")
            this.options.user = '';
        else
            this.options.user = optUser;

        if (typeof optPassword === "undefined")
            this.options.password = '';
        else
            this.options.password = optPassword;
    };

    /**
     * @function XMLHttpRequest#abort
     *
     * @description Aborts the request if it has already been sent.
     */

    GDXMLHttpRequest.prototype.abort = function() {

        var async = (this.options.async === false) ? "false" : "true";

        if (this.options.isRealUsed) {

            //call native ABORT function
            this._realXMLHttpRequest.abort.apply(this._realXMLHttpRequest);

            this.options.isAborted = true;

            onRequestUpdated(this);
        }

        if (this.readyState == this.UNSENT ||
            this.readyState == this.OPENED ||
            this.readyState == this.DONE) {
            return;
        }

        this.options.readyState = this.DONE;
        this.options.status = 0;

        cordovaExec(function() {}, function() {}, "GDXMLHttpRequest", "abort", [async, this.options.requestTag]);
        if (typeof this.onabort == 'function') {
            this.onabort();
        }
        this.fireEvent('abort');
    };

    /**
     * @function XMLHttpRequest#send
     *
     * @description Sends the request. If the request is asynchronous (which is the default), this method returns as soon as the request is sent.
     * If the request is synchronous, this method doesn't return until the response has arrived.
     * It takes optional parameter data.
     * Optional parameter data can contain following types of data:
     * ArrayBuffer
     * Document
     * DOMString
     * FormData - object with key/value pairs that can be passed to send method as parameter. User can append file from GDFileSystem by passing valid fullPath to this file as key/value
     */

    GDXMLHttpRequest.prototype.send = function(optData) {

        if (this.options.isRealUsed) {

            // update properties on native object
            updateNativeXHR(this);

            //call native SEND function
            this._realXMLHttpRequest.send.apply(this._realXMLHttpRequest, arguments);
            this.options.isRealUsed = true;

            onRequestUpdated(this);

            return;
        }

        if (this.readyState != this.OPENED) {
            throw new Error("DOMException: Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.");
        }

        if (optData) {
            if (typeof this.options.sendOptions.HttpBody === 'undefined' ||
                this.options.sendOptions.HttpBody === null) {

                this.options.HttpBody = {};
            }

            if (typeof optData === 'string') {
                this.options.sendOptions.HttpBody = optData;
            } else if (optData instanceof ArrayBuffer) {
                this.options.sendOptions.HttpBody = fromArrayBuffer(optData);
            } else if (optData instanceof GDFormData) {
                var boundary = "---------------------------" + uniqueStr(),
                    body = '--' + boundary + '\r\n';
                // set request header Content-Type: multipart/form-data
                this.setRequestHeader("Content-Type", "multipart/form-data");
                this.setRequestHeader("Content-Type", "boundary=" + boundary);

                // prepare HTTP Body
                for (var key in optData) {
                    if (optData.hasOwnProperty(key)) {
                        // if user appended file from GDFileSystem by passing valid fullPath to this file as parameter
                        if (optData[key].indexOf("file:///data/") > -1) {
                            body = body + 'Content-Disposition: form-data; name="' + key + '"; ' + 'filename="' + optData[key] + '"' + '\n' + 'Content-Type: text/plain' + '\n\n\n--' + boundary + '\r\n';
                        } else {
                            body = body + 'Content-Disposition: form-data; name="' + key + '"' + '\n\n' + optData[key] + '\n--' + boundary + '\r\n';
                        }
                    }
                }
                this.options.sendOptions.HttpBody = body;
            }
        }

        this.options.requestTag = guid();

        var parms = [
            this.options.method,
            this.options.url,
            this.options.async,
            this.options.user,
            this.options.password,
            this.options.timeout,
            this.withCredentials,
            this.responseType,
            this.options.requestTag,
            this.options.sendOptions
        ];

        var that = this;

        var uploadCallsCount = 0;

        function successCallback(data) {
            var obj = JSON.parse(data);
            var escapedJson = {};

            for (var i in obj) {
                escapedJson[i] = unescape(obj[i]);
            }

            // handling upload events
            if (escapedJson.lengthComputable && escapedJson.total && escapedJson.loaded) {
                uploadCallsCount++;
                if (uploadCallsCount === 1) {
                    if (typeof that.upload.onloadstart === "function") {
                        that.upload.onloadstart.call(that, new ProgressEvent("loadstart", {
                            target: that.upload,
                            loaded: escapedJson.loaded,
                            total: escapedJson.total
                        }));
                    }
                    that.upload.fireEvent(new ProgressEvent("loadstart", {
                        loaded: escapedJson.loaded,
                        total: escapedJson.total
                    }));
                }

                // skip first call. "loadstart" callback triggered
                if (uploadCallsCount !== 1) {
                    if (typeof that.upload.onprogress === "function") {
                        that.upload.onprogress.call(that, new ProgressEvent("progress", {
                            target: that.upload,
                            loaded: escapedJson.loaded,
                            total: escapedJson.total
                        }));
                    }

                    that.upload.fireEvent(new ProgressEvent("progress", {
                        loaded: escapedJson.loaded,
                        total: escapedJson.total
                    }));
                }

                if (escapedJson.loaded === escapedJson.total) {
                    if (typeof that.upload.onload === "function") {
                        that.upload.onload.call(that, new ProgressEvent("load", {
                            target: that.upload,
                            loaded: escapedJson.loaded,
                            total: escapedJson.total
                        }));
                    }

                    that.upload.fireEvent(new ProgressEvent("load", {
                        loaded: escapedJson.loaded,
                        total: escapedJson.total
                    }));

                    if (typeof that.upload.onloadend === "function") {
                        that.upload.onloadend.call(that, new ProgressEvent("loadend", {
                            target: that.upload,
                            loaded: escapedJson.loaded,
                            total: escapedJson.total
                        }));
                    }

                    that.upload.fireEvent(new ProgressEvent("loadend", {
                        loaded: escapedJson.loaded,
                        total: escapedJson.total
                    }));
                }

                // this code should be reenabled after implementation of GD-29876
                // // If ontimeout callback
                // if (typeof that.upload.ontimeout === "function") {
                //     that.upload.ontimeout.call(that, new ProgressEvent("timeout", { target: escapedJson }));
                // }
                // // If onerror callback
                // if (typeof that.upload.onerror === "function") {
                //     that.upload.onerror.call(that, new ProgressEvent("error", { target: escapedJson }));
                // }
                // // If onabort callback
                // if (typeof that.upload.onabort === "function") {
                //     that.upload.onabort.call(that, new ProgressEvent("abort", { target: escapedJson }));
                // }
                return;
            }

            // handling response... if request was aborted or failed on timeout
            if (escapedJson.isAborted == "true" || escapedJson.isTimeout == "true") {
                that.options.statusText = "";
                that.options.status = 0;
                that.options.response = "";
                that.responseType = "";
                that.options.responseXML = null;
                that.options.responseText = "";
                that.options.readyState = that.DONE;
            } else {
                that.options.headers = escapedJson.headers;

                that.options.readyState = that.HEADERS_RECEIVED;
                if (typeof that.onreadystatechange === "function") {
                    that.onreadystatechange.call(that);
                }
                that.fireEvent('readystatechange');

                that.options.readyState = that.LOADING;
                if (typeof that.onreadystatechange === "function") {
                    that.onreadystatechange.call(that);
                }
                that.fireEvent('readystatechange');

                if (typeof that.onprogress === "function") {
                    that.onprogress.call(that);
                }
                that.fireEvent('progress');

                that.options.responseText = escapedJson.responseText.trim();
                that.options.responseURL = escapedJson.responseURL;
                that.options.status = parseInt(escapedJson.status, 10);
                that.options.statusText = escapedJson.statusText;
                that.options.readyState = that.DONE;

                // handling response property
                var contentType = that.getResponseHeader("Content-Type");

                if (that.responseType === "" || that.responseType === "text") {
                    that.options.response = escapedJson.responseText.toString();
                } else if (that.responseType === "json") {
                    that.options.response = JSON.parse(escapedJson.responseText);
                } else if (that.responseType === "document") {
                    if (window.DOMParser) {
                        var parser = new DOMParser();
                        var xmlDoc = parser.parseFromString(escapedJson.responseText, "text/xml");
                        var htmlDoc = parser.parseFromString(escapedJson.responseText, "text/html");

                        if (xmlDoc && xmlDoc instanceof Document) {
                            that.options.response = xmlDoc;
                            that.options.responseXML = escapedJson.responseText;
                        } else if (htmlDoc && htmlDoc instanceof HTMLDocument) {
                            that.options.response = htmlDoc;
                            that.options.responseXML = escapedJson.responseText;
                        } else {
                            that.options.responseXML = null;
                        }
                    }
                } else if (that.responseType === "blob") {
                    var contentType = that.getResponseHeader("Content-Type");

                    that.options.response = b64toBlob(escapedJson.responseBase64, contentType);
                }

                // handling responseXML property
                if (contentType != null && (contentType == "text/xml" || (contentType.indexOf('application/xml') > -1) || contentType == "text/html")) {
                    if (window.DOMParser) {
                        var parser = new DOMParser(),
                            xmlDoc = parser.parseFromString(escapedJson.responseText, "text/xml"),
                            htmlDoc = parser.parseFromString(escapedJson.responseText, "text/html");

                        if (xmlDoc || htmlDoc) {
                            that.options.responseXML = that.options.responseXML = (xmlDoc) ? xmlDoc : htmlDoc;
                        } else {
                            that.options.responseXML = null;
                        }
                    }
                }
            }

            if (escapedJson.isTimeout === "true") {
                if (typeof that.ontimeout === "function") {
                    that.ontimeout.call(that);
                }
                that.fireEvent('timeout');
            } else {
                if (typeof that.onreadystatechange === "function") {
                    that.onreadystatechange.call(that);
                }
                if (typeof that.onload === "function") {
                    that.onload.call(that);
                }
                that.fireEvent('load');
            }

            if (typeof that.onloadend == 'function') {
                that.onloadend();
            }

            that.fireEvent('loadend');
        };

        function errorCallback(error) {
            that.options.readyState = that.DONE;
            that.options.status = 0;

            if (typeof that.onerror == 'function') {
                that.onerror();
            }

            that.fireEvent('error');
        }

        this.options.readyState = this.LOADING;

        cordovaExec(successCallback, errorCallback, "GDXMLHttpRequest", "send", parms);

        if (typeof this.onloadstart == 'function') {
            this.onloadstart();
        }

        this.fireEvent('loadstart');
    };

    /**
     * @function XMLHttpRequest#setRequestHeader
     *
     * @description Sets the value of an HTTP request header. You must call setRequestHeader() after open(), but before send().
     * If this method is called several times with the same header, the values are merged into one single request header.
     */

    GDXMLHttpRequest.prototype.setRequestHeader = function(header, value) {

        if (this.options.isRealUsed) {
            //call native setRequestHeader function
            this._realXMLHttpRequest.setRequestHeader.apply(this._realXMLHttpRequest, arguments);

            return;
        }

        if (arguments.length < 2) {
            throw new Error("TypeError: Failed to execute 'setRequestHeader' on 'XMLHttpRequest': 2 arguments required, but only " + arguments.length + " present.");
        }

        if (typeof this.options.sendOptions.RequestHeaders === 'undefined' ||
            this.options.sendOptions.RequestHeaders === null) {

            this.options.sendOptions.RequestHeaders = {};
        }

        if (this.options.sendOptions.RequestHeaders[header]) {
            this.options.sendOptions.RequestHeaders[header] += '; ' + value;
        } else {
            this.options.sendOptions.RequestHeaders[header] = value;
        }
    };

    /**
     * @function XMLHttpRequest#getResponseHeader
     *
     * @description Returns the string containing the text of the specified header,
     * or null if either the response has not yet been received or the header doesn't exist in the response.
     */

    GDXMLHttpRequest.prototype.getResponseHeader = function(header) {

        if (this.options.isRealUsed) {
            //call native getResponseHeader function
            this._realXMLHttpRequest.getResponseHeader.apply(this._realXMLHttpRequest, arguments);

            return;
        }

        if (arguments.length == 0) {
            throw new Error("TypeError: Failed to execute 'getResponseHeader' on 'XMLHttpRequest': 1 argument required, but only 0 present.");
        }

        if (this.readyState == this.DONE) {
            try {
                var headersArr = this.options.headers.split('\n'),
                    headersObj = {};

                for (var i = 0; i < headersArr.length; i++) {
                    var key = headersArr[i].slice(0, headersArr[i].indexOf(':')),
                        value = headersArr[i].slice(headersArr[i].indexOf(':') + 1, headersArr[i].length);

                    headersObj[key] = value;
                }

                var headers = Object.keys(headersObj);

                return headersObj[getMatchHeader(headers, header)];

            } catch (e) {
                return null;
            }
        } else {
            return null;
        }
    };

    /**
     * @function XMLHttpRequest#getAllResponseHeaders
     *
     * @description Returns all the response headers as a string, or null if no response has been received.
     * Note: For multipart requests, this returns the headers from the current part of the request, not from the original channel.
     */

    GDXMLHttpRequest.prototype.getAllResponseHeaders = function() {

        if (this.options.isRealUsed) {

            //call native getResponseHeader function
            this._realXMLHttpRequest.getAllResponseHeaders.apply(this._realXMLHttpRequest, arguments);

            return;
        }

        return (this.readyState == this.DONE) ? this.options.headers : null;
    };

    /**
     * @function XMLHttpRequest#overrideMimeType
     *
     * @description Overrides the MIME type returned by the server.
     * This may be used, for example, to force a stream to be treated and parsed as text/xml, even if the server does not report it as such. This method must be called before send().
     */

    GDXMLHttpRequest.prototype.overrideMimeType = function(mimeType) {

        if (this.options.isRealUsed) {

            //call native getResponseHeader function
            this._realXMLHttpRequest.overrideMimeType.apply(this._realXMLHttpRequest, arguments);

            return;
        }

        if (arguments.length == 0) {
            throw new Error("TypeError: Failed to execute 'overrideMimeType' on 'XMLHttpRequest': 1 argument required, but only 0 present.");
        }

        if (this.readyState == this.OPENED) {
            this.setRequestHeader("Content-Type", mimeType);
        }
    };

    hideOwnPropertiesImplementation(GDXMLHttpRequest.prototype);

    // helper functions
    function getMatchHeader(headers, header) {
        for (var i = 0; i < headers.length; i++) {
            if (isMatch(headers[i], header))
                return headers[i];
        }
    }

    function isMatch(currentValue, value) {
        return currentValue.match(new RegExp(value, 'i'));
    }

    function fromArrayBuffer(arrayBuffer) {
        var array = new Uint8Array(arrayBuffer);

        return uint8ToBase64(array);
    };

    var b64_6bit = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        b64_12bit;

    function uint8ToBase64(rawData) {
        var numBytes = rawData.byteLength,
            output = "",
            segment,
            table = b64_12bitTable();

        for (var i = 0; i < numBytes - 2; i += 3) {
            segment = (rawData[i] << 16) + (rawData[i + 1] << 8) + rawData[i + 2];
            output += table[segment >> 12];
            output += table[segment & 0xfff];
        }
        if (numBytes - i == 2) {
            segment = (rawData[i] << 16) + (rawData[i + 1] << 8);
            output += table[segment >> 12];
            output += b64_6bit[(segment & 0xfff) >> 6];
            output += '=';
        } else if (numBytes - i == 1) {
            segment = (rawData[i] << 16);
            output += table[segment >> 12];
            output += '==';
        }

        return output;
    }

    function b64_12bitTable() {
        b64_12bit = [];

        for (var i = 0; i < 64; i++) {
            for (var j = 0; j < 64; j++) {
                b64_12bit[i * 64 + j] = b64_6bit[i] + b64_6bit[j];
            }
        }
        b64_12bitTable = function() {
            return b64_12bit;
        };

        return b64_12bit;
    };

    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
            s4() + '-' + s4() + s4() + s4();
    };

    function uniqueStr() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
    };

    function fixedEncodeURIComponent(str) {
        return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
            return '%' + c.charCodeAt(0).toString(16);
        });
    };

    function b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        var byteCharacters = atob(b64Data),
            byteArrays = [];

        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize),
                byteNumbers = new Array(slice.length);

            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            var byteArray = new Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        var blob = new Blob(byteArrays, { type: contentType });

        return blob;
    };

    function onRequestUpdated(context) {
        context.options.readyState = context._realXMLHttpRequest.readyState;
        context.options.response = context._realXMLHttpRequest.response;
        context.options.responseURL = context._realXMLHttpRequest.responseURL;
        if (context._realXMLHttpRequest.responseType == "" || context._realXMLHttpRequest.responseType == 'text') {
            context.options.responseText = context._realXMLHttpRequest.responseText;
        }
        if (context._realXMLHttpRequest.responseType == "" || context._realXMLHttpRequest.responseType == 'document') {
            context.options.responseXML = context._realXMLHttpRequest.responseXML;
        }
        context.options.status = context._realXMLHttpRequest.status;
        context.options.statusText = context._realXMLHttpRequest.statusText;
    }

    function updateNativeXHR(context) {
        events.forEach(function(eventHandler) {
            if (eventHandler === 'onreadystatechange') { return; }
            context._realXMLHttpRequest[eventHandler] = context[eventHandler];
            context._realXMLHttpRequest.upload[eventHandler] = context.upload[eventHandler];
        });
        context._realXMLHttpRequest.onreadystatechange = context.onreadystatechange;
    }

    function parseURL(url) {
        try {
            return new URL(url);
        } catch (err) {
            return {
                protocol: "file:",
                href: url
            }
        }
    }

    // hide functions implementation in web inspector
    function hideOwnPropertiesImplementation(prototypeObject) {
        var propertiesToSkip = [
                'readyState', 'response', 'responseText', 'responseType', 'responseURL', 'responseXML',
                'status', 'statusText', 'timeout', 'withCredentials'
            ]
            .concat(events);
        for (ownProperty in prototypeObject) {
            if (ownProperty === 'constructor' || propertiesToSkip.indexOf(ownProperty) > -1) {
                continue;
            }

            if (prototypeObject.hasOwnProperty(ownProperty) &&
                typeof prototypeObject[ownProperty] == 'function') {

                // Checking, if function property 'name' is configurable
                // (for old browser, which has pre-ES2015 implementation(Android 5.0) function name property isn't configurable)
                var objProtoProperty = prototypeObject[ownProperty],
                    isFuncNamePropConfigurable = Object.getOwnPropertyDescriptor(objProtoProperty, 'name').configurable;

                if (isFuncNamePropConfigurable) {
                    Object.defineProperty(prototypeObject[ownProperty],
                        'name', {
                            value: ownProperty,
                            configurable: false
                        }
                    );
                }

                Object.defineProperty(prototypeObject[ownProperty],
                    'toString', {
                        value: function() {
                            var funcName = this.name || ownProperty;
                            return 'function ' + funcName + '() { [native code] }';
                        },
                        writable: false,
                        configurable: false
                    });

            }
        }
    }

    XMLHttpRequest = GDXMLHttpRequest;

    module.exports = XMLHttpRequest;
}());
// End the Module Definition.
//************************************************************************************************
});
