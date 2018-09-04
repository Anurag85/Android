/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDNETiOS.h>

@interface GDCSocketPlugin : GDCBasePlugin <GDSocketDelegate>

-(void)connect:(CDVInvokedUrlCommand *)command;
-(void)send:(CDVInvokedUrlCommand *)command;
-(void)close:(CDVInvokedUrlCommand *)command;

@end
