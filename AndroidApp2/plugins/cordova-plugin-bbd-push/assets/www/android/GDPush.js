/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    /**
     * @class GDPushChannelResponse
     * @classdesc This class encapsulates the response returned from the GDPush class.
     *
     * @param {string} json The input data (formatted as JSON text) used to construct the
     * response object.
     *
     * @property {string} channelID The unique ID for the push channel that generated this response.
     *
     * @property {string} responseType This value is used to distinguish what action triggered this response.
     * Valid values are:
     * <ul>
     *   <li>open - The channel was just successfully opened.</li>
     *   <li>message - A new message was received from the server.  The responseData property will be
     *   populated with the data from the server.</li>
     *   <li>error - A channel error occurred.  The responseData may or may not be populated with a
     *   description of the error.</li>
     *   <li>close - The channel connection was closed.</li>
     *   <li>pingFail - Ping Failure is an optional feature of the Push Channel framework. The application
     *   server registers for ping after receiving the Push Channel token from the client.  If an
     *   application server registers for ping, then the server will be periodically checked ("pinged") by
     *   the BlackBerry Dynamics Network Operating Center (NOC). If the application server does not respond to a
     *   ping, then the NOC notifies the client.</li>
     * </ul>
     *
     * @property {string} responseData This field will be populated with data from the server if the
     * response contained data what was intended to be processed by the client.
     *
     * @return {GDPushChannelResponse}
     *
     * @example
     * // This object is used by GDPushConnection.parseChannelResponse() method and is not used directly
     */
    var GDPushChannelResponse = function(json) {
        var channelID = null,
            responseType = null,
            responseData = null;

        try {
            var obj = JSON.parse(unescape(json));
            channelID = obj.channelID;
            responseType = obj.responseType;

            /*
             * The response could have been JSON text, which we might need to revert to it's
             * string representation.
             */
            try {
                if (typeof obj.responseData === 'Object') {
                    responseData = JSON.stringify(obj.responseData);
                } else {
                    responseData = obj.responseData;
                }
            } catch (e) {
                responseData = obj.responseData;
            }
        } catch (e) {
            responseType = "error";
        }
        Object.defineProperties(this, {
            'channelID': {
                get: function() {
                    return channelID;
                }
            },
            'responseType': {
                get: function() {
                    return responseType;
                }
            },
            'responseData': {
                get: function() {
                    return responseData;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDPushChannelResponse]';
                }
            }
        })
    };

    Object.preventExtensions(GDPushChannelResponse);

    /**
     * @class GDPushChannel
     * @classdesc This class encapsulates the GD Push Channel object.  The Push Channel framework is a
     * BlackBerry Dynamics (GD) feature used to receive notifications from an application server.  Note that
     * the GD Push Channel feature is not part of the native iOS notification feature set; however,
     * Push Channels are dependent on the Push Connection, and Push Channels can only be established when
     * the Push Connection is open and operating.<br/>
     * <br/>
     * Push Channels are established from the client end, then used by the server when needed. The sequence
     * of events is as follows:<br/>
     * <ol>
     * <li>The client sets an event handler for Push Channel notifications</li>
     * <li>The client application requests a Push Channel token from the BlackBerry Dynamics proxy infrastructure</li>
     * <li>The client application sends the token to its server using, for example, a socket or HTTP request</li>
     * <li>The client can now wait for a Push Channel notification</li>
     * </ol>
     * The BlackBerry Dynamics platform keeps data communications between client and server alive while the client is
     * waiting for a Push Channel notification. This is achieved by sending "heartbeat" messages at an interval
     * that is dynamically optimized for battery and network performance.<br/>
     * <br/>
     * NOTE: Create a new push channel by calling <a href="GDPushConnection.html#createPushChannel">GDPushConnection.createPushChannel</a>.
     *
     * @property {function} onChannelResponse This function is the callback handler that is called
     * whenever a response is returned from the channel connection.  This function should check
     * the value of the responseType returned and determine the required action to take.  If the
     * responseType = "open", then the channelID returned in the response should be used to reference this
     * channel in subsequent calls over this connection (see <a href="#close">GDPushChannel.close</a>).  NOTE: This
     * function is required to be a non-null value.
     */
    var GDPushChannel = function(responseCallback) {
        var channelResponseCallback = null;
        if (typeof responseCallback === 'function') {
            channelResponseCallback = responseCallback;
        }

        Object.defineProperties(this, {
            'onChannelResponse': {
                get: function() {
                    return channelResponseCallback;
                },
                configurable: false
            },
            'toString': {
                value: function() {
                    return '[object GDPushChannel]';
                }
            }
        });
    };

    Object.defineProperty(GDPushChannel, 'toString', {
        value: function() {
            return 'function GDPushChannel() { [native code] }';
        }
    });

    Object.preventExtensions(GDPushChannel);

    /**
     * @function GDPushChannel#open
     *
     * @description Call this function to open the Push Channel. This function can only be called when
     * the channel is not open.  This function causes a request for a Push Channel to be sent to the Good
     * Dynamics proxy infrastructure Network Operating Center (NOC). The NOC will create the channel, and
     * issue a Push Channel token, which can then be used to identify the channel.  Logically, Push
     * Channels exist within the Push Connection. Opening a Push Channel will not succeed if the Push
     * Connection is not open and operating.
     *
     * @return {GDPushChannelResponse} A push channel response object in JSON format.  The result should be
     * parsed and saved as a GDPushChannelResponse object in the callback handler.  If the channel was
     * opened then the response object will be initialize with a channelID property that can be used to
     * reference this channel connection.  Additionally, the response will also contain a token that uniquely
     * identifies the device associated with this push channel.  Since this is an asynchronous call, the
     * response will be returned via the onChannelResponse callback.
     *
     *
     * @example
     * function myPushConnection(){
     *     var myConnection;
     *     var channel = null;
     *     var savedChannelID = null;
     *     //--GDPushConnection
     *     myConnection = window.plugins.GDPushConnection;
     *
     *     try {
     *         myConnection = window.plugins.GDPushConnection;
     *     } catch(e) {
     *         throw new Error("Unable to initialize the GD Connection (mConnection).");
     *     }
     *
     *    //-- GDPushChannelResponse
     *    function pushChannelResponse(response){
     *        try {
     *            var channelResponse = mConnection.parseChannelResponse(response);
     *            throw new Error("Got response channelID: " + channelResponse.channelID);
     *            throw new Error("Got response responseType: " + channelResponse.responseType);
     *            throw new Error("Got response responseData: " + channelResponse.responseData);
     *            switch(channelResponse.responseType) {
     *            case "open":
     *                savedChannelID = channelResponse.channelID;
     *                throw new Error("Channel connection opened with ID :" + savedChannelID);
     *
     *                // send application server the savedChannelID (token) here
     *
     *            case "message":
     *                // handle pushed message from the server
     *                channel.close(channelResponse.channelID);
     *                break;
     *            case "error":
     *                throw new Error("Received an error status from the channel connection.");
     *                break;
     *            case "close":
     *                throw new Error("Channel connection closed successfully.");
     *            case "pingFail":
     *                break;
     *            default:
     *                break;
     *            }
     *        } catch(e) {
     *            throw new Error("Invalid response object sent to channel response callback handler.");
     *        }
     *    };
     *
     *    function pushConnectionOk(){
     *        //-- GDPushChannel
     *        channel = myConnection.createPushChannel(pushChannelResponse);
     *        channel.open();
     *    };
     *
     *    if(myConnection !== "undefined"){
     *        myConnection.isConnected(
     *        function(result) {
     *            throw new Error("Push connection is established.");
     *            pushConnectionOk();
     *        },
     *        function(result) {
     *            throw new Error("An error occurred while checking the status of the push connection: " + result);
     *        });
     *    };
     * };
     */
    GDPushChannel.prototype.open = function() {
        // Make sure that the response callback handler is not null.
        if (this.onChannelResponse === null ||
            typeof this.onChannelResponse === 'undefined') {
            throw new Error("onChannelResponse callback handler for GDPushChannel object is null.");
        }

        cordovaExec(this.onChannelResponse, null, "GDPush", "open", ["none"]);
    };

    /**
     * @function GDPushChannel#close
     *
     * @description Call this function to initiate permanent disconnection of the Push Channel.  This function
     * causes a request for Push Channel termination to be sent to the BlackBerry Dynamics proxy infrastructure Network
     * Operating Center (NOC). The NOC will delete the channel, and invalidate the Push Channel token that was
     * issued when the channel was initially opened.
     *
     * @param {string} channelID The unique ID for the push channel to close.
     *
     * @example
     * See the example below (it is added to GDPushChannel.open() method).
     */
    GDPushChannel.prototype.close = function(channelID) {
        if (channelID === null || typeof channelID === 'undefined') {
            throw new Error("Null channelID passed to GDPushChannel.close.");
        }

        var parms = [channelID];
        cordovaExec(this.onChannelResponse, this.onChannelResponse, "GDPush", "close", parms);
    };

    hideJSFunctionsImplementationInConsoleForObject(GDPushChannel.prototype);

    /**
     * @class GDPushConnection
     *
     * @classdesc The Push Connection is the container and conduit for the device's Push Channels. An
     * application may open multiple Push Channels; all will be managed within a single Push Connection.
     * The Push Connection is automatically established during BlackBerry Dynamics authorization processing,
     * and then maintained by the BlackBerry Dynamics run-time under application control. The application can
     * instruct the run-time to switch the Push Connection off and on.  When instructed to switch off,
     * the GD run-time will terminate the Push Connection, and suspend its maintenance. When instructed
     * to switch back on, the GD run-time will re-establish the Push Connection, and resume maintenance.
     * Switching off the Push Connection might be an option that the application offers to the end user,
     * for example, allowing them to reduce power consumption on the device.
     *
     * @property {function} onConnected Callback function to invoke after the connection is established.
     *
     * @property {function} onDisconnected Callback function to invoke after the connection is terminated.
     */
    var GDPushConnection = function() {
        var onConnected = null,
            onDisconnected = null;

        Object.defineProperties(this, {
            'onConnected': {
                get: function() {
                    return onConnected;
                },
                set: function(callback) {
                    onConnected = callback;
                }
            },
            'onDisconnected': {
                get: function() {
                    return onDisconnected;
                },
                set: function(callback) {
                    onDisconnected = callback;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDPushConnection]';
                }
            }
        })
    };

    Object.defineProperty(GDPushConnection, 'toString', {
        value: function() {
            return 'function GDPushConnection() { [native code] }';
        }
    });

    Object.preventExtensions(GDPushConnection);

    // ***** BEGIN: MODULE METHOD DEFINITIONS - GDPushConnection *****

    /**
     * @function GDPushConnection#initialize
     * @description Initialize the push connection in prior to establishing the connection.  This function
     * should be called before calling <a href="#connect">GDPushConnection.connect</a>.
     *
     * @param {function} onConnected Callback function to invoke after the connection is established.
     *
     * @param {function} onDisconnected Callback function to invoke after the connection is terminated.
     *
     * @example
     * window.plugins.GDPushConnection.initialize(function(result) {
     *     // onConnected code here
     * }, function(result) {
     *     // onDisconnected code here
     * });
     */
    GDPushConnection.prototype.initialize = function(onConnected, onDisconnected) {
        if (typeof onConnected !== 'function') {
            throw new Error("ERROR in GDPushConnection.initialize: onConnected parameter " +
                "is not a function.");
        }

        if (typeof onDisconnected !== 'function') {
            throw new Error("ERROR in GDPushConnection.initialize: onDisconnected parameter " +
                "is not a function.");
        }

        this.onConnected = onConnected;
        this.onDisconnected = onDisconnected;
    };

    /**
     * @function GDPushConnection#connect
     *
     * @description Call this function to establish, or re-establish, the Push Channel connection with the
     * BlackBerry Dynamics proxy infrastructure Network Operating Center (NOC).
     *
     * @example
     * window.plugins.GDPushConnection.initialize(function(result) {
     *     // onConnected code here
     * }, function(result) {
     *     // onDisconnected code here
     *     window.plugins.GDPushConnection.connect();
     * });
     */
    GDPushConnection.prototype.connect = function() {
        if (this.onConnected === null || typeof this.onConnected === 'undefined') {
            throw new Error("ERROR: GDPushConnection has no onConnected handler defined.");
        }

        cordovaExec(this.onConnected, this.onDisconnected, "GDPush", "connect", ["none"]);
    };

    /**
     * @function GDPushConnection#disconnect
     *
     * @description Call this function to terminate the Push Channel connection with the BlackBerry Dynamics
     * proxy infrastructure Network Operating Center (NOC).
     *
     * @example
     * window.plugins.GDPushConnection.initialize(function(result) {
     *     // onConnected code here
     *     window.plugins.GDPushConnection.disconnect();
     * }, function(result) {
     *     // onDisconnected code here
     * });
     */
    GDPushConnection.prototype.disconnect = function() {
        cordovaExec(this.onConnected, this.onDisconnected, "GDPush", "disconnect", ["none"]);
    };

    /**
     * @function GDPushConnection#createPushChannel
     *
     * @description Call this function to create a new push channel to receive notifications
     * from an application server.  Push Channels can only be established when the Push Connection
     * is open and operating.
     *
     * @param {function} responseCallback Callback function to invoke whenever a response is received by
     * this push channel.
     *
     * @returns {GDPushChannel}
     *
     * @example
     * See the exaple <a href="./GDPushChannel.html">here</a>
     */
    GDPushConnection.prototype.createPushChannel = function(responseCallback) {
        return new GDPushChannel(responseCallback);
    };

    /**
     * @function GDPushConnection#parseChannelResponse
     *
     * @description Call this function to transform the push channel response text into a
     * GDPushChannelResponse object.
     *
     * @param {string} responseText A string representing the push channel response text.
     *
     * @return {GDPushChannelResponse} The push channel response object.
     *
     * @example
     * See the exaple <a href="./GDPushChannel.html">here</a>
     */
    GDPushConnection.prototype.parseChannelResponse = function(responseText) {
        return new GDPushChannelResponse(responseText);
    };

    /**
     * @function GDPushConnection#isConnected
     *
     * @description This function returns the current status of the Push Channel connection.
     *
     * @param {function} responseCallback Callback function to invoke when the function returns.
     * A single result string will be passed as the input to the callback function: "true" or
     * "false".
     *
     * @return {boolean} "true" or "false".
     *
     * @example
     * See the exaple <a href="./GDPushChannel.html">here</a>
     */
    GDPushConnection.prototype.isConnected = function(responseCallback) {
        cordovaExec(responseCallback, responseCallback, "GDPush", "isConnected", ["none"]);
    };

    // ***** END: MODULE METHOD DEFINITIONS - GDPushConnection *****
    function hideJSFunctionsImplementationInConsoleForObject(prototypeObject) {
        for (protoFunction in prototypeObject) {
            if (prototypeObject.hasOwnProperty(protoFunction)) {

                // Checking, if function property 'name' is configurable
                // (for old browser, which has pre-ES2015 implementation(Android 5.0) function name property isn't configurable)
                var objProtoProperty = prototypeObject[protoFunction],
                    isFuncNamePropConfigurable = Object.getOwnPropertyDescriptor(objProtoProperty, 'name').configurable;

                if (isFuncNamePropConfigurable) {
                    Object.defineProperty(prototypeObject[protoFunction],
                        'name', {
                            value: protoFunction,
                            configurable: false
                        }
                    );
                }

                Object.defineProperty(prototypeObject[protoFunction],
                    'toString', {
                        value: function() {
                            var funcName = this.name || protoFunction;
                            return 'function ' + funcName + '() { [native code] }';
                        },
                        writable: false,
                        configurable: false
                    });
            }
        }

        Object.preventExtensions(prototypeObject);
    }

    // hide functions implementation in web inspector
    hideJSFunctionsImplementationInConsoleForObject(GDPushConnection.prototype);

    var gdPushConnection = new GDPushConnection();
    Object.preventExtensions(gdPushConnection);
    // Install the plugin.
    module.exports = gdPushConnection;
}()); // End the Module Definition.
//************************************************************************************************