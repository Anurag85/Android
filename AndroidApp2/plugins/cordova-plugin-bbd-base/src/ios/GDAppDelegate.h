//
//  GDAppDelegate.h
//  GDCordova
//
//  (c) 2017 BlackBerry Limited. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "AppDelegate.h"
#import <GD/GDios.h>

@interface GDAppDelegate : AppDelegate <UIApplicationDelegate, GDiOSDelegate>
{
    BOOL started;
}

@property (nonatomic, weak) GDiOS *gdLibrary;

-(void) handleEvent:(GDAppEvent*)anEvent;
-(void) onAuthorised:(GDAppEvent*)anEvent;
-(void) onNotAuthorised:(GDAppEvent*)anEvent;

- (BOOL) application:(UIApplication*)application didFinishLaunchingWithOptions:(NSDictionary*)launchOptions;

@end
