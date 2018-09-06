/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDUtility.h>

@interface GDTokenHelperPlugin : GDCBasePlugin

-(void)getGDAuthToken:(CDVInvokedUrlCommand*)command;

@end
