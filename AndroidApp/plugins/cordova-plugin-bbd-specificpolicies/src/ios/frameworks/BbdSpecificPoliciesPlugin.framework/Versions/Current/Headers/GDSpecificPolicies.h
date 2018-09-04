/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDUtility.h>
#import <GD/GDiOS.h>

@interface GDSpecificPoliciesPlugin : GDCBasePlugin

- (void) updatePolicy:(CDVInvokedUrlCommand *)command;

@end
