/*
 * (c) 2017 BlackBerry Limited. All Right Reserved.
 */

#pragma once

/** \addtogroup capilist
 * @{
 */

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

#include <netdb.h>
#include <sys/types.h>
#include <sys/socket.h>

/** Route information constants.
 *
 * Use the constants in this enumeration to check the return value of
 * \ref GD_getRouteInfo.
 */
enum GD_ROUTE
{
    /** The connection information didn't include BlackBerry Dynamics routing
     *  information.
     */
    GD_ROUTE_UNKNOWN,
    
    /** The connection will be routed direct to the Internet.
     */
    GD_ROUTE_INTERNET,
    
    /** The connection will be routed via the BlackBerry Dynamics
     * infrastructure.
     */
    GD_ROUTE_GOOD_PROXY
};

/** C API.
 */
GD_C_API struct hostent* GD_gethostbyname(const char* name);

/** C API.
 */
GD_C_API int GD_getaddrinfo(const char* node,
                            const char* service,
                            const struct addrinfo* hints,
                            struct addrinfo** addresses);

/** C API.
*/
GD_C_API int GD_freeaddrinfo(struct addrinfo* ai);

/** C API.
 */
GD_C_API int GD_getnameinfo(const struct sockaddr* address, socklen_t addressLength,
                            char* node, size_t nodeLength,
                            char* service, size_t serviceLength,
                            int flags);
    
    
/** Check if routing is via the BlackBerry Dynamics infrastructure.
 *
 * Call this function to check how a connection would be routed, either via the
 * BlackBerry Dynamics infrastructure or direct to the Internet. The connection
 * is specified by a socket address, <tt>sockaddr</tt>, structure that is passed
 * as an input parameter.
 *
 * The input socket address structure must have been obtained from the
 * \ref GD_getaddrinfo function.
 *
 * @param address pointer to a <tt>sockaddr</tt> structure for the required
 *                connection.
 *
 * @return \ref GD_ROUTE constant for the result.
 */
GD_C_API enum GD_ROUTE GD_getRouteInfo(const struct sockaddr* address);

#ifdef __cplusplus
}
#endif

/** @}
 */
