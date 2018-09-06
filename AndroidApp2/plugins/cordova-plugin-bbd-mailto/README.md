BBD Cordova MailTo plugin
==============================
> Plugin provides functionality to send emails with attachments

Location
========
`BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-mailto`

> __Note:__ `BBD Cordova Application plugin` is dependent on
> * `BBD Cordova Base plugin`

Installation
============
To add this plugin to your application, run the following command in the project directory:
```
$ cd <path/to/your/cordova/application>
$ cordova plugin add <path/to/package>/BlackBerry_Dynamics_SDK_for_Cordova_<version>/plugins/cordova-plugin-bbd-mailto
```

Limitation
===========
Max size of content which can be transported via Intent is 1 Mib. Dependent on the string encoding,
this size is equal to string with the length of about 520,000 symbols. In different cases the
additional bytes will be used to store the string references, to store the 'to', 'cc', 'bcc' values.
So the subject and body content length will be cut to 20,000. According to "Internet Message Format"
RFC 5322, the length of the body, subject and other fields can't be longer than 998 symbols. Now,
the email client will display first 20,000 characters but will send only first 998 characters to
the receiver (RFC 5322).