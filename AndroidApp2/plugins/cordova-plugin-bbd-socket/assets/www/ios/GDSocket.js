/*
 * (c) 2018 BlackBerry Limited. All rights reserved.
 */

;
(function() {
    var cordovaExec = require('cordova/exec');

    /**
     * @class GDSocketResponse
     * @classdesc This class encapsulates the response returned from the GDSocket class.
     *
     * @param {string} json The input data (formatted as JSON text) used to construct the
     * response object.
     *
     * @property {string} socketID The unique ID for the socket connection that generated this response.
     *
     * @property {string} responseType This value is used to distinguish what action triggered this response.
     * Valid values are:
     * <ul>
     *   <li>open - The socket was just successfully opened.</li>
     *   <li>message - A new message was received from the server.  The responseData property will be
     *   populated with the data from the server.</li>
     *   <li>error - A socket error occurred.  The responseData may or may not be populated with a
     *   description of the error.</li>
     *   <li>close - The socket connection was closed.</li>
     * </ul>
     *
     * @property {string} responseData This field will be populated with data from the server if the
     * response contained data what was intended to be processed by the client.
     *
     * @return {GDSocketResponse}
     */
    var GDSocketResponse = function(json) {
        var socketID = null,
            responseType = null,
            responseData = null;

        try {
            var obj = JSON.parse(unescape(json));
            socketID = obj.socketID;
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
                this.responseData = obj.responseData;
            }
        } catch (e) {
            responseType = "error";
        }

        Object.defineProperties(this, {
            'socketID': {
                get: function() {
                    return socketID;
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
                    return '[object GDSocketResponse]';
                }
            }
        });
    };

    Object.defineProperty(GDSocketResponse, 'toString', {
        value: function() {
            return 'function GDSocketResponse() { [native code] }';
        }
    })

    Object.preventExtensions(GDSocketResponse);

    /**
     * @class GDSocket
     * @classdesc Implements the secure Socket communications APIs.
     *
     * @property {string} url The address of the server. Can be either an Internet Protocol
     * address (IP address, for example "192.168.1.10"), or a fully qualified domain name
     * (for example "www.example.com").
     *
     * @property {number} port Number of the server port to which the socket will connect.
     *
     * @property {boolean} useSSL This value determines whether or not to use SSL/TLS security.
     *
     * @property {boolean} disableHostVerification Disable host name verification, when
     * making an HTTPS request. Host name verification is an SSL/TLS security option.
     *
     * @property {boolean} disablePeerVerification Disable certificate authenticity verification,
     * when making an SSL/TLS connection. Authenticity verification is an SSL/TLS security option.
     *
     * @property {function} onSocketResponse This function is the callback handler that is called
     * whenever a response is returned from the socket connection.  This function should check
     * the value of the responseType returned and determine the required action to take.  If the
     * responseType = "open", then the socketID returned in the response should be used to send
     * data in subsequent calls for this socket connection (see GDSocket.send).  NOTE: This
     * function is required to be a non-null value.
     *
     * @property {function} onSocketError This function is the callback handler that is called
     * whenever a socket error occurs.  This function should check the value of the responseType
     * returned and determine the required action to take.
     */
    var GDSocket = function() {
        var url = null,
            port = -1,
            useSSL = false,
            disableHostVerification = false,
            disablePeerVerification = false,
            onSocketResponse = null,
            onSocketError = null;

        Object.defineProperties(this, {
            'url': {
                get: function() {
                    return url;
                },
                set: function(socketUrl) {
                    url = socketUrl;
                }
            },
            'port': {
                get: function() {
                    return port;
                },
                set: function(socketPort) {
                    port = socketPort;
                }
            },
            'useSSL': {
                get: function() {
                    return useSSL;
                },
                set: function(socketUseSSL) {
                    useSSL = socketUseSSL;
                }
            },
            'disableHostVerification': {
                get: function() {
                    return disableHostVerification;
                },
                set: function(socketShouldDisableHostVerification) {
                    disableHostVerification = socketShouldDisableHostVerification;
                }
            },
            'disablePeerVerification': {
                get: function() {
                    return disablePeerVerification;
                },
                set: function(socketShouldDisablePeerVerification) {
                    disablePeerVerification = socketShouldDisablePeerVerification;
                }
            },
            'onSocketResponse': {
                get: function() {
                    return onSocketResponse;
                },
                set: function(callback) {
                    onSocketResponse = callback;
                }
            },
            'onSocketError': {
                get: function() {
                    return onSocketError;
                },
                set: function(callback) {
                    onSocketError = callback;
                }
            },
            'toString': {
                value: function() {
                    return '[object GDSocket]';
                }
            }
        })
    };

    Object.defineProperty(GDSocket, 'toString', {
        value: function() {
            return 'function GDSocket() { [native code] }';
        }
    });

    Object.preventExtensions(GDSocket);


    // ***** BEGIN: MODULE METHOD DEFINITIONS - GDSocket *****

    /**
     * @function GDSocket#createSocket
     *
     * @description Call this function to create a socket and set the main parameters.  NOTE: This
     * funtion only initializes the socket parameters; it does not initiate data transfer nor does
     * it make the initial socket connection (see GDSocket.connect).
     *
     * @param {string} url The address of the server. Can be either an Internet Protocol
     * address (IP address, for example "192.168.1.10"), or a fully qualified domain name
     * (for example "www.example.com").
     *
     * @param {number} port Number of the server port to which the socket will connect.
     *
     * @param {boolean} useSSL his value determines whether or not to use SSL/TLS security.
     *
     * @return {GDSocket}
     *
     * @example
     * See the example below (it is added to GDSocket.send() method).
     */
    GDSocket.prototype.createSocket = function(url, port, useSSL) {
        var result = new GDSocket();
        result.url = url;
        result.port = port;
        result.useSSL = useSSL;
        return result;
    };

    /**
     * @function GDSocket#connect
     *
     * @description Open a new socket connection.
     *
     * @return {GDSocketResponse} A socket response object in JSON format.  The result should be
     * parsed and saved as a GDSocketResponse object in the callback handler.  If the connection
     * was successful then the response object will be initialize with a socketID property that
     * can be used to send data using this socket connection (see GDSocket.send).  Since this is
     * an asynchronous call, the response will be returned via the onSocketResponse callback or
     * the onSocketError callback (whichever is applicable).
     *
     * @example
     * See the example below (it is added to GDSocket.send() method).
     */
    GDSocket.prototype.connect = function() {
        // Make sure that the response callback handler is not null.
        if (this.onSocketResponse === null) {
            throw new Error("onSocketResponse callback handler for GDSocket object is null.");
        }

        var lUseSSL = (this.useSSL === true) ? "true" : "false",
            lHost = (this.disableHostVerification === true) ? "true" : "false",
            lPeer = (this.disablePeerVerification === true) ? "true" : "false",

            parms = [this.url, this.port.toString(), lUseSSL, lHost, lPeer];

        cordovaExec(this.onSocketResponse, this.onSocketError, "GDSocket", "connect", parms);
    };

    /**
     * @function GDSocket#send
     *
     * @description Call this function to send data using the open socket connection.
     *
     * @param {string} socketID The identifier for the open socket connection.  This value
     * is returned from a successful call to GDSocket.connect.
     *
     * @param {string} data The data to transmit using the open socket.
     *
     * @example
     * <pre class="prettyprint"><code>
     * function mySocketRequest(){
     *  var url = socket_url;
     *  var port = socket_port;
     *  var useSSL = false;
     *  //--createSocket
     *  var aSocket = window.plugins.GDSocket.createSocket(url, port, useSSL);
     *
     *  aSocket.onSocketResponse = function(obj) {
     *      console.log("Socket response is valid.");
     *      var socketResponse = window.plugins.GDSocket.parseSocketResponse(obj);
     *
     *      // Once the socket is open, attempt to send some data, then close the connection.
     *  switch(socketResponse.responseType) {
     *     case "open":
     *          console.log("Socket connection opened.");
     *
     *          // Format a string for the current time.
     *          var now = new Date();
     *          var localTime = now.toLocaleTimeString();
     *          var re = new RegExp("^[0-9]*:[0-9]*:[0-9]*");
     *          var matches = re.exec(localTime);
     *          var time = matches[0];
     *
     *          // Send some data to the server then close the connection.
     *          //-- send
     *          window.plugins.GDSocket.send(socketResponse.socketID, "Hello There! [" + time + "]");
     *          //-- close
     *          window.plugins.GDSocket.close(socketResponse.socketID);
     *          break;
     *      case "message":
     *          //-- close
     *          window.plugins.GDSocket.close(socketResponse.socketID);
     *          break;
     *      case "error":
     *          console.log("Received an error status from the socket connection.");
     *          break;
     *      case "close":
     *          console.log("Socket connection closed successfully.");
     *          break;
     *     default:
     *          console.log( "Unknown Socket response type: " + socketResponse.responseType);
     *     }
     *  };
     *  //-- onSocketError
     *  aSocket.onSocketError = function(err) {
     *      console.log("The socket connection failed: " + err);
     *  };
     *  //-- connect
     *  aSocket.connect();
     *
     * }
     * </code></pre>
     */
    GDSocket.prototype.send = function(socketID, data, success, failure) {
        if (socketID === null) {
            console.log("Null socketID passed to GDSocket.send.");
            return;
        }

        var parms = [socketID,
            data
        ];

        cordovaExec(success, failure, "GDSocket", "send", parms);
    };

    /**
     * @function GDSocket#close
     *
     * @description Call this function to close the socket connection.
     *
     * @param {string} socketID The identifier for the open socket connection.  This value
     * is returned from a successful call to GDSocket.connect.
     *
     * @example
     * See the example below (it is added to GDSocket.send() method).
     */
    GDSocket.prototype.close = function(socketID, success, failure) {
        if (socketID === null) {
            throw new Error("Null socketID passed to GDSocket.close.");
        }

        var parms = [socketID];

        cordovaExec(success, failure, "GDSocket", "close", parms);
    };


    /**
     * @function GDSocket#parseSocketResponse
     *
     * @description Call this function to transform the socket response text into a
     * GDSocketResponse object.
     *
     * @param {string} responseText A string representing the socket response text.
     *
     * @return {GDSocketResponse} The socket response object.
     *
     * @example
     * See the example below (it is added to GDSocket.send() method).
     */
    GDSocket.prototype.parseSocketResponse = function(responseText) {
        return new GDSocketResponse(responseText);
    };

    // ***** END: MODULE METHOD DEFINITIONS - GDSocket *****
    // hide functions implementation in web inspector
    for (protoFunction in GDSocket.prototype) {
        if (GDSocket.prototype.hasOwnProperty(protoFunction)) {
            Object.defineProperty(GDSocket.prototype[protoFunction],
                'name', { value: protoFunction, writable: false }
            );

            Object.defineProperty(GDSocket.prototype[protoFunction],
                'toString', {
                    value: function() {
                        return 'function ' + this.name + '() { [native code] }';
                    },
                    writable: false
                });
        }
    }

    Object.preventExtensions(GDSocket.prototype);

    var gdSocket = new GDSocket();
    Object.preventExtensions(gdSocket);
    // Install the plugin.
    module.exports = gdSocket;
}()); // End the Module Definition.
//************************************************************************************************
