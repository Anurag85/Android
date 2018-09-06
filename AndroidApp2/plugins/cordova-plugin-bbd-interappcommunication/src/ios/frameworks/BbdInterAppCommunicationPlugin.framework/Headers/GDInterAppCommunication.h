/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDios.h>
#import <GD/GDServiceProvider.h>

@interface GDInterAppCommunicationPlugin : GDCBasePlugin

-(void)getGDAppDetails:(CDVInvokedUrlCommand*)command;

@end
