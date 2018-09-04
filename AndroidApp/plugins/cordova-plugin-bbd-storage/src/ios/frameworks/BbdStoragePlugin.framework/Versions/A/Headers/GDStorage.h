/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <GD/sqlite3enc.h>

@interface GDCStoragePlugin : CDVPlugin

// Instance Methods
//Sample Template
- (void) dsLog:(CDVInvokedUrlCommand*)command;

//LocalFileSystem
- (void) requestFileSystem:(CDVInvokedUrlCommand*)command;
- (void) resolveLocalFileSystemURI:(CDVInvokedUrlCommand*)command;

//GD Logs
- (void) exportLogFileToDocumentsFolder:(CDVInvokedUrlCommand*)command;
- (void) uploadLogs:(CDVInvokedUrlCommand*)command;

//GDFileReader
- (void) readAsText:(CDVInvokedUrlCommand*)command;
- (void) readAsDataURL:(CDVInvokedUrlCommand*)command;
- (void) readAsArrayBuffer:(CDVInvokedUrlCommand*)command;
- (void) readAsBinaryString:(CDVInvokedUrlCommand*)command;

//GDDirectoryEntry
- (void) getDirectory:(CDVInvokedUrlCommand*)command;
- (void) removeRecursively:(CDVInvokedUrlCommand*)command;
- (void) getFile:(CDVInvokedUrlCommand*)command;

//GDDirectoryEntry & GDFileEntry (Common)
- (void) getMetadata:(CDVInvokedUrlCommand*)command;
- (void) moveTo:(CDVInvokedUrlCommand*)command;
- (void) copyTo:(CDVInvokedUrlCommand*)command;
- (void) remove:(CDVInvokedUrlCommand*)command;
- (void) getParent:(CDVInvokedUrlCommand*)command;

//GDFileEntry
- (void) getFileMetadata:(CDVInvokedUrlCommand*)command;

//GDDirectoryReader
- (void) readEntries:(CDVInvokedUrlCommand*)command;

//GDFileWriter
- (void) write:(CDVInvokedUrlCommand*)command;
- (void) truncate:(CDVInvokedUrlCommand*)command;

//GD Database
- (void) sqlite3enc_import:(CDVInvokedUrlCommand*)command;

//GD LocalStorage
- (void) setItem:( CDVInvokedUrlCommand *)command;
- (void) removeStorageItem:( CDVInvokedUrlCommand *)command;
- (void) getDictionary:( CDVInvokedUrlCommand *)command;
- (void) clearStorage:( CDVInvokedUrlCommand *)command;

@end

