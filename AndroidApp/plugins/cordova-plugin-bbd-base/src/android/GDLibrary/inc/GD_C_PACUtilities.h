/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#ifndef GD_C_PACUTILITIES_H
#define GD_C_PACUTILITIES_H

/** \addtogroup capilist
 * @{
 */

/** End point IP address retrieval completion callback.
 * 
 * Pass a reference to a \ss_function of this type as the <tt>callback</tt>
 * parameter to the GD_myipaddress() \ss_function.
 *
 * The callback receives one parameter.
 * @param myIP <tt>char *</tt> containing an IP address, or an empty string, or
 *             NULL. See GD_myipaddress() for details.
 */
typedef void (*completionCallback)(const char *myIP);

/** End point IP address retrieval completion extended callback.
 * 
 * Pass a reference to a \ss_function of this type as the <tt>callback</tt>
 * parameter to the GD_myipaddressEx() \ss_function.
 *
 * The callback receives two parameters.
 * 
 * @param myIP <tt>char *</tt> containing an IP address, or an empty string, or
 *             NULL. See GD_myipaddress() for details.
 *                     
 * @param data <tt>void *</tt> pointer to the extended data that was passed to
 *             the original \ss_function call.
 */
typedef void (*completionCallbackEx)(const char *myIP, const void *data);

#ifdef __cplusplus
extern "C" {
#endif
    
#ifndef GD_C_API
#   if !defined(_WIN32)
#       define GD_C_API __attribute__((visibility("default")))
#   else
#       define GD_C_API
#   endif
#endif
    
#ifndef GD_C_API_EXT
#   define GD_C_API_EXT
#endif
    
        
/** Get the IP address of the BlackBerry Dynamics end point for a specified
 *  host.
 * 
 * Call this function to retrieve the IP address of the BlackBerry Dynamics
 * end point for a specified host.
 *
 * Only hosts that are listed for client connection in the enterprise management
 * console will have a BlackBerry Dynamics end point. The end point could be a
 * BlackBerry Proxy server, or legacy Good Proxy server, for example.
 * 
 * Retrieval is asynchronous. When retrieval completes, a completion callback
 * will be invoked.\n
 * The callback will be passed a <tt>char *</tt> pointing to a buffer containing
 * the IP address if retrieval was successful. The callback must copy the
 * contents of the buffer if the IP address is to be used later. The memory for
 * the passed buffer will be released when the callback completes.\n
 * If the specified host isn't listed for client connection in the management
 * console then an empty string is passed to the callback instead. If an error
 * occurred then <tt>NULL</tt> is passed.
 *
 * @param host <tt>char *</tt> containing the server address of the host.
 *
 * @param port <tt>unsigned int</tt> containing the port number of the host.
 *
 * @param callback Function to execute when the retrieval completes. The
 *                 function receives one parameter as described above.
 */
GD_C_API void GD_myipaddress(const char* host, unsigned int port, completionCallback callback);
    
/** Get the IP address of the BlackBerry Dynamics end point for a specified host
 *  with a callback extension.
 * 
 * Call this function to retrieve the IP address of the BlackBerry Dynamics
 * end point for a specified host and supply extended data to the results
 * callback. This \ss_function does the same retrieval as the
 * \ref GD_myipaddress() \ss_function, see above.
 *
 * The completion callback will receive extended data, which is passed as a
 * parameter to this \ss_function.
 * 
 * @param host <tt>char *</tt> containing the server address of the host.
 *
 * @param port <tt>unsigned int</tt> containing the port number of the host.
 *
 * @param callback Function to execute when the retrieval completes. The function
 *                 receives a results parameter, as described above under
 *                 \ref GD_myipaddress(), and extended data, as passed in the
 *                 <tt>data</tt> parameter, below.
 *
 * @param data <tt>void *</tt> pointer to the extended data for the callback.
 */
GD_C_API void GD_myipaddressEx(const char* host, unsigned int port, completionCallbackEx callback, const void* data);

#ifdef __cplusplus
}
#endif

/** @}
 */

#endif
