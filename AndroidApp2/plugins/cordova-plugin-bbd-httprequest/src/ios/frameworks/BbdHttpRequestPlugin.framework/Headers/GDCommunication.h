/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>

@interface GDCHttpRequestPlugin : GDCBasePlugin

-(void)enableClientCertAuthOnUIWebView:(CDVInvokedUrlCommand*)command;
-(void)send:(CDVInvokedUrlCommand*)command;
-(void)abort:(CDVInvokedUrlCommand*)command;
-(void)clearCredentialsForMethod:(CDVInvokedUrlCommand*)command;
-(void)kerberosAllowDelegation:(CDVInvokedUrlCommand*)command;

@end
