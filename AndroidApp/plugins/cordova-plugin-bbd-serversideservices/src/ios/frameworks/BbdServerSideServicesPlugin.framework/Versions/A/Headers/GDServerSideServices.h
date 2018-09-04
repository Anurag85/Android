/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <objc/runtime.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDAppServer.h>
#import <GD/GDiOS.h>
#import <GD/GDServiceProvider.h>

@interface GDServerSideServicesPlugin : GDCBasePlugin

- (void)callGDServerSideService:(CDVInvokedUrlCommand *)command;

@end
