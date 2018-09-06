/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import "NSArray+Comparisons.h"
#import <GD/GDFileManager.h>

@interface GDCFileTransferPlugin : CDVPlugin

- (void) upload:(CDVInvokedUrlCommand *)command;
- (void) download:(CDVInvokedUrlCommand *)command;

@end


