/*
 * (c) 2017 BlackBerry Limited. All rights reserved.
 */

#import <Foundation/Foundation.h>
#import <MessageUI/MessageUI.h>
#import <Cordova/CDVPlugin.h>

// inherit from CDVPlugin. There is no JS API for MailTo plugin so we don't need inherits from BasePlugin
@interface GDMailToPlugin : CDVPlugin <MFMailComposeViewControllerDelegate>

-(void)presentMailComposerFromURL:(NSURL *)mailtoURL;

@end

