//
//  GDAppDelegate.m
//  GDCordova
//
//  (c) 2017 BlackBerry Limited. All rights reserved.
//

#import "GDAppDelegate.h"
#import "AppDelegate.h"
#import <GD/sqlite3.h>

// BEGIN: Private interface

@interface GDAppDelegate () {
    UIApplication* __weak savedApplication;
    NSDictionary* savedLaunchOptions;
}

@property (nonatomic, weak) UIApplication* savedApplication;
@property (nonatomic, strong) NSDictionary* savedLaunchOptions;

@end
// ---------------------------



@implementation GDAppDelegate

@synthesize gdLibrary;
@synthesize savedApplication;
@synthesize savedLaunchOptions;

- (BOOL) application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions
{
    self.gdLibrary = [GDiOS sharedInstance];
    self.gdLibrary.delegate = self;

    //Set a flag so that view controllers can check the status
    started = NO;

    // Start up the Good Library.
    [self.gdLibrary authorize];
    [self.window makeKeyAndVisible];

    return YES;
}

-(void)handleEvent:(GDAppEvent*)anEvent
{
    // Called from gdLibrary when events occur, such as system startup.

    switch (anEvent.type)
    {
        case GDAppEventAuthorized:
        {
            [self onAuthorised:anEvent];
            break;
        }
        case GDAppEventNotAuthorized:
        {
            [self onNotAuthorised:anEvent];
            break;
        }
        case GDAppEventRemoteSettingsUpdate:
        {
            // handle app config changes
            break;
        }
        case GDAppEventServicesUpdate:
        {
            break;
        }
        case GDAppEventPolicyUpdate:
        {
            break;
        }
    }
}

-(void) onAuthorised:(GDAppEvent*)anEvent
{
    // Handle the Good Libraries authorized event.

    switch (anEvent.code) {
        case GDErrorNone: {
            if (!started) {
                // launch application UI here
                started = YES;
                // *** Now perform your application's primary initialization and show your UI. ***
                [super application:savedApplication didFinishLaunchingWithOptions:savedLaunchOptions];
            }
            break;
        }
        default:
            NSAssert(false, @"Authorised startup with an error");
            break;
    }
}

-(void) onNotAuthorised:(GDAppEvent*)anEvent
{
    // Handle the Good Libraries not authorised event.

    switch (anEvent.code) {
        case GDErrorActivationFailed:
        case GDErrorPushConnectionTimeout: {
            // application can either handle this and show it's own UI or just call back into
            // the GD library and the welcome screen will be shown
            [self.gdLibrary authorize];
            break;
        }
        case GDErrorSecurityError:
        case GDErrorAppDenied:
        case GDErrorBlocked:
        case GDErrorWiped:
        case GDErrorRemoteLockout:
        case GDErrorPasswordChangeRequired: {
            // a condition has occured denying authorisation, an application may wish to log these events
            NSLog(@"onNotAuthorised %@", anEvent.message);
            break;
        }
        case GDErrorIdleLockout: {
            // idle lockout is benign & informational
            break;
        }
        default:
            NSAssert(false, @"Unhandled not authorised event");
            break;
    }
}

@end
