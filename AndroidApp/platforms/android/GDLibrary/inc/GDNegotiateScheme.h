/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 *
 */

#ifndef GD_GSS_API_NEGOTIATESCHEME_H_
#define GD_GSS_API_NEGOTIATESCHEME_H_

#include <stdint.h>

#if defined(_WIN32)
# define GD_ATTRIBUTE(ignore)
#else
# define GD_ATTRIBUTE __attribute__
#endif

namespace  GD
{

namespace GSS_API
{

/** \defgroup gssstatuscodes Generic Security Service Application Program Interface constants.
 * Use these constants with the BlackBerry Dynamics programming interface for
 * the Generic Security Service Application Program Interface (GSS-API).
 * 
 * \{
 */

/** Generic Security Service Application Program Interface status code.
 * 
 * This enumeration represents the status of a BlackBerry Dynamics GSS-API
 * operation. The
 * \link GD.GSS_API.NegotiateScheme.getGssApiStatus getGssApiStatus\endlink
 * function returns one of these values.
 *
 * \copydetails GSSGssStatusCodeDefinition
 */
enum class GssStatusCode
{
    /* Major status codes. */

    /** GSS-API status code: GSS_S_COMPLETE.
     */
    STATUS_GSS_S_COMPLETE,
    
    /*
     * Calling errors.
     */

    /** GSS-API status code: GSS_S_CALL_INACCESSIBLE_READ.
     */
    STATUS_GSS_S_CALL_INACCESSIBLE_READ,

    /** GSS-API status code: GSS_S_CALL_INACCESSIBLE_WRITE.
     */
    STATUS_GSS_S_CALL_INACCESSIBLE_WRITE,

    /** GSS-API status code: GSS_S_CALL_BAD_STRUCTURE.
     */
    STATUS_GSS_S_CALL_BAD_STRUCTURE,
    
    /*
     * Routine errors.
     */

    /** GSS-API status code: GSS_S_BAD_MECH.
     */
    STATUS_GSS_S_BAD_MECH,
    
    /** GSS-API status code: GSS_S_BAD_NAME.
     */
    STATUS_GSS_S_BAD_NAME,
    
    /** GSS-API status code: GSS_S_BAD_NAMETYPE.
     */
    STATUS_GSS_S_BAD_NAMETYPE,
    

    /** GSS-API status code: GSS_S_BAD_BINDINGS.
     */
    STATUS_GSS_S_BAD_BINDINGS,

    /** GSS-API status code: GSS_S_BAD_STATUS.
     */
    STATUS_GSS_S_BAD_STATUS,

    /** GSS-API status code: GSS_S_BAD_SIG.
     */
    STATUS_GSS_S_BAD_SIG,

    /** GSS-API status code: GSS_S_BAD_MIC.
     */
    STATUS_GSS_S_BAD_MIC,

    /** GSS-API status code: GSS_S_NO_CRED.
     */
    STATUS_GSS_S_NO_CRED,

    /** GSS-API status code: GSS_S_NO_CONTEXT.
     */
    STATUS_GSS_S_NO_CONTEXT,

    /** GSS-API status code: GSS_S_DEFECTIVE_TOKEN.
     */
    STATUS_GSS_S_DEFECTIVE_TOKEN,

    /** GSS-API status code: GSS_S_DEFECTIVE_CREDENTIAL.
     */
    STATUS_GSS_S_DEFECTIVE_CREDENTIAL,

    /** GSS-API status code: GSS_S_CREDENTIALS_EXPIRED.
     */
    STATUS_GSS_S_CREDENTIALS_EXPIRED,

    /** GSS-API status code: GSS_S_CONTEXT_EXPIRED.
     */
    STATUS_GSS_S_CONTEXT_EXPIRED,

    /** GSS-API status code: GSS_S_FAILURE.
     */
    STATUS_GSS_S_FAILURE,

    /** GSS-API status code: GSS_S_BAD_QOP.
     */
    STATUS_GSS_S_BAD_QOP,

    /** GSS-API status code: GSS_S_UNAUTHORIZED.
     */
    STATUS_GSS_S_UNAUTHORIZED,

    /** GSS-API status code: GSS_S_UNAVAILABLE.
     */
    STATUS_GSS_S_UNAVAILABLE,

    /** GSS-API status code: GSS_S_DUPLICATE_ELEMENT.
     */
    STATUS_GSS_S_DUPLICATE_ELEMENT,

    /** GSS-API status code: GSS_S_NAME_NOT_MN.
     */
    STATUS_GSS_S_NAME_NOT_MN,
    
    /*
     * Supplementary status:
     */

    /** GSS-API status code: GSS_S_CONTINUE_NEEDED.
     */
    STATUS_GSS_S_CONTINUE_NEEDED,

    /** GSS-API status code: GSS_S_DUPLICATE_TOKEN.
     */
    STATUS_GSS_S_DUPLICATE_TOKEN,

    /** GSS-API status code: GSS_S_OLD_TOKEN.
     */
    STATUS_GSS_S_OLD_TOKEN,

    /** GSS-API status code: GSS_S_UNSEQ_TOKEN.
     */
    STATUS_GSS_S_UNSEQ_TOKEN,

    /** GSS-API status code: GSS_S_GAP_TOKEN.
     */
    STATUS_GSS_S_GAP_TOKEN,
    
    /** Initial value.
     */
    STATUS_UNKNOWN
};
    
/** Generic Security Service Application Program Interface negotiation
 *  mechanisms.
 *
 * This enumeration represents the negotiation mechanism in a BlackBerry
 * Dynamics GSS-API operation.
 *
 * Pass one of these values as the <tt>mechanism</tt> parameter of the
 * \link GD.GSS_API.NegotiateScheme.generateGssApiData(const char*,NegotiateMechanism,const char*,const bool)
 * generateGssApiData\endlink method.
 */
enum class NegotiateMechanism
{
    /** Simple and Protected GSS-API Negotiation.
     */
    NEGOTIATE_MECHANISM_SPNEGO,

    /** Raw Kerberos version 5 scheme.
     */
    NEGOTIATE_MECHANISM_KRB5
};

/**
 * \}
 */

/** GSS programming interface, including SPNEGO (C++).
 *
 * \copydetails GSSNegotiateScheme
 */
class GD_ATTRIBUTE((visibility("default")))  NegotiateScheme /* final */
{
    
public:
    /** Constructor.
     * Constructor.
     */
    NegotiateScheme();
    ~NegotiateScheme();
    
public:
    
    /** Generate an authentication token for a GSS-API header for SPNEGO.
     * 
     * Call this function to generate a Generic Security Service (GSS)
     * authentication token that is suitable for use in a GSS-API header for
     * SPNEGO. Pass in the token from a server challenge as a parameter.
     *
     * Token generation depends on there being a suitable Kerberos ticket in the
     * BlackBerry Dynamics secure cache. If there is a suitable cached Kerberos
     * ticket when this function is called, then it is used to generate the
     * token. Otherwise, token generation fails. After failure, the application
     * could take an action that would cause a Kerberos ticket to be cached, for
     * example calling one of the setUpKerberosTicket functions in the
     * \link GD.KRB_API.GDKerberosAuthHandler GDKerberosAuthHandler\endlink
     * class, and then call this function again.
     *
     * This function doesn't return a success or failure code. To discover
     * whether token generation succeeded or failed, call the
     * \ref getGssApiStatus() function every time.
     *
     * It might be necessary to call this function more than once, and to pass
     * different server challenge token values. This could happen if the server
     * requires more than one challenge-response exchange, for example. When
     * <tt>getGssApiStatus</tt> returns <tt>STATUS_GSS_S_COMPLETE</tt> then
     * negotiation is complete.
     *
     * Pass as a parameter a specifier for the authentication host to be used
     * for the negotiation. Format the value as follows:\n
     * <em><tt>server.address.com</tt></em>:<em><tt>portNumber</tt></em>\n
     * Where:
     * - <em><tt>server.address.com</tt></em> is a fully qualified domain name
     *   (FQDN).
     * - <em><tt>portNumber</tt></em> can be omitted if it is 80. If the port
     *   number is omitted, also omit the colon (:) separator.
     * .
     * 
     * @param token <tt>char*</tt> pointer to memory containing the
     *              Base64-encoded initial token from the server challenge, and
     *              a null terminator.
     *
     * @param hostname <tt>char*</tt> pointer to memory containing the
     *                 authentication host specifier, and a null terminator.
     *
     * @param allow_delegation <tt>bool</tt> flag for whether to allow Kerberos
     *                         delegation to be used to obtain the token. Note
     *                         that delegation might not be allowed by the
     *                         authentication service, which would take
     *                         precedence over this parameter value.
     *
     * @return <tt>char*</tt> pointer to memory containing a Base64-encoded
     *         token for a GSS token, and a null terminator.\n
     *         The returned value, if non-null, will be a pointer to memory that
     *         has been allocated from the heap. The caller of this function
     *         must release the memory.
     */
    char* generateGssApiData(const char* token,
                             const char* hostname,
                             const bool allow_delegation);
    
    /** Generate an authentication token for a GSS-API header for a specified
     *  negotiation mechanism.
     *
     * Call this function to generate a Generic Security Service (GSS)
     * authentication token that is suitable for use in a GSS-API header for a
     * specified negotiation mechanism. Pass in the token from a server
     * challenge as a parameter.
     * 
     * Token generation depends on there being a suitable Kerberos ticket in the
     * BlackBerry Dynamics secure cache. If there is a suitable cached Kerberos
     * ticket when this function is called, then it is used to generate the
     * token. Otherwise, token generation fails. After failure, the application
     * could take an action that would cause a Kerberos ticket to be cached, for
     * example calling one of the setUpKerberosTicket functions in the
     * \link GD.KRB_API.GDKerberosAuthHandler GDKerberosAuthHandler\endlink
     * class, and then call this function again.
     *
     * This function doesn't return a success or failure code. To discover
     * whether token generation succeeded or failed, call the
     * \ref getGssApiStatus() function every time.
     *
     * It might be necessary to call this function more than once, and to pass
     * different server challenge token values. This could happen if the server
     * requires more than one challenge-response exchange, for example. When
     * <tt>getGssApiStatus</tt> returns <tt>STATUS_GSS_S_COMPLETE</tt> then
     * negotiation is complete.
     *
     * Pass as a parameter the service principal name for the negotiation.
     * 
     * @param token <tt>char*</tt> pointer to memory containing the
     *              Base64-encoded initial token from the server challenge, and
     *              a null terminator.
     *
     * @param mechanism <tt>NegotiateMechanism</tt> value for the negotiation
     *                  mechanism.
     *
     * @param service_principal_name <tt>char*</tt> pointer to memory containing
     *                               the service principal name, and a null
     *                               terminator.
     *
     * @param allow_delegation <tt>bool</tt> flag for whether to allow Kerberos
     *                         delegation to be used to obtain the token. Note
     *                         that delegation might not be allowed by the
     *                         authentication service, which would take
     *                         precedence over this parameter value.
     *
     * @return <tt>char*</tt> pointer to memory containing a Base64-encoded GSS
     *         token for the specified negotiation scheme and mechanism, and a
     *         null terminator.\n
     *         The returned value, if non-null, will be a pointer to memory that
     *         has been allocated from the heap. The caller of this function
     *         must release the memory.
     */
    char* generateGssApiData(const char* token,
                             NegotiateMechanism mechanism,
                             const char* service_principal_name,
                             const bool allow_delegation);
    
    /** Get the status of the last GSS-API operation.
     *
     * \copydetails GSSgetGssApiStatus
     */
    GssStatusCode getGssApiStatus() const;
    
    /** Check whether GSS security context establishment has been initiated.
     *
     * \copydetails GSSgssContextEstablishmentInitiated
     */
    bool gssContextEstablishmentInitiated() const;

    
private:
    void* _impl;
};


} // end of namespace GSS_API
    
} // end of namespace GD

#endif /* GDNEGOTIATESCHEME_H_ */
