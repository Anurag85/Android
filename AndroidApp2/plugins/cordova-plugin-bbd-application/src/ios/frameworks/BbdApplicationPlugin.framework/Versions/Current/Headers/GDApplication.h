/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDiOS.h>

@interface GDCApplicationPlugin : GDCBasePlugin

-(void)getApplicationConfig:(CDVInvokedUrlCommand*)command;
-(void)showPreferenceUI:(CDVInvokedUrlCommand*)command;
-(void)getVersion:(CDVInvokedUrlCommand*)command;

@end
