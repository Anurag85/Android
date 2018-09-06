/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <Cordova/CDV.h>
#import <BbdBasePlugin/GDCBasePlugin.h>
#import <GD/GDUtility.h>
#import <GD/GDServices.h>

// Keys for app kinetics dictionary sent to callback for received service
#define kAppKineticsSendingApplicationName  @"applicationName"
#define kAppKineticsServiceNameKey          @"serviceName"
#define kAppKineticsVersionKey              @"version"
#define kAppKineticsMethodKey               @"method"
#define kAppKineticsParametersKey           @"parameters"
#define kAppKineticsAttachmentsKey          @"attachments"

@interface GDAppKineticsPlugin : GDCBasePlugin <GDServiceClientDelegate, GDServiceDelegate>

    // All attachments for app kinetics services must be in the secure file system, this helper function will move all files from the bundle to
    // the secure file system.  Other files may be moved via GDCStoragePlugin, returns true if any files moved, false otherwise.  Note, will over write
    // files on subsequent calls.
- (void) copyAllBundledFilesToSecureFileSystem:(CDVInvokedUrlCommand *)command;

    // bring an application to the front
- (void) bringAppToFront:(CDVInvokedUrlCommand*)command;

    // send a file to an application using fileTransfer AppKinetics service
- (void) sendFileToApp:( CDVInvokedUrlCommand *) command;

    // receive any waiting files, calls failure function if no files waiting
- (void) retrieveFiles:( CDVInvokedUrlCommand *) command;

    // provide a callback to receive file from another app
- (void) readyToReceiveFile:( CDVInvokedUrlCommand *) command;

    // Note: call GDInterAppCommunicationPlugin : getGDAppDetails to retrieve application service details


    // Call any app kinetics service using generic parameters and attachments
- (void) callAppKineticsService:( CDVInvokedUrlCommand *) command;

    // provide an AppKinetics service in the form of a callback function.  Register the service name and version here.
    // the transfer file service may be registered here or provided by the readyToReceiveFile function.  The readyToReceiveFile will
    // take precedence if both are provided.
- (void) readyToProvideService:( CDVInvokedUrlCommand *) command;

#pragma mark functions used in Unit Testing to launch external apps to send and receive files, these functions are supported

    // is app able to be launched - returns YES/NO
- (void) canLaunchAppUsingUrlScheme:( CDVInvokedUrlCommand *) command;

    // launch app using url - returns YES/NO
- (void) launchAppUsingUrlScheme:( CDVInvokedUrlCommand *) command;

@end
