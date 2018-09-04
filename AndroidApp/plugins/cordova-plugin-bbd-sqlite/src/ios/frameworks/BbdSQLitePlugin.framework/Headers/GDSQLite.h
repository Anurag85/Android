/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <GD/sqlite3enc.h>

#import <Cordova/CDV.h>

@interface GDCSQLitePlugin : CDVPlugin

// Open / Close
-(void) open: (CDVInvokedUrlCommand*)command;
-(void) close: (CDVInvokedUrlCommand*)command;
-(void) delete: (CDVInvokedUrlCommand*)command;

// Batch processing interface
-(void) backgroundExecuteSqlBatch: (CDVInvokedUrlCommand*)command;
-(void) executeSqlBatch: (CDVInvokedUrlCommand*)command;

// Single requests interface
-(void) backgroundExecuteSql:(CDVInvokedUrlCommand*)command;
-(void) executeSql:(CDVInvokedUrlCommand*)command;

@end

