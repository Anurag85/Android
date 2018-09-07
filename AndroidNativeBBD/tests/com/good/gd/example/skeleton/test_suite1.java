/*
 *  This file contains Good Sample Code subject to the Good Dynamics SDK Terms and Conditions.
 *  (c) 2016 Good Technology Corporation. All rights reserved.
 */
package com.wellsfargo.internalapps.gd.androidnativebbd;

import android.support.test.runner.AndroidJUnit4;

import com.good.automated.general.helpers.BBDActivationHelper;
import com.good.automated.general.utils.AbstractUIAutomatorUtils;
import com.good.automated.general.utils.UIAutomatorUtilsFactory;

import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;

import static org.junit.Assert.assertTrue;

/**
 * Tests purpose - Ensure SecureSQL sample app correct basic operation
 */
@RunWith(AndroidJUnit4.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class test_suite1 {

    /*
    Note - The test order of these tests is significant hence the explict test numbering
     */

    private static AbstractUIAutomatorUtils uiAutomatorUtils = UIAutomatorUtilsFactory.getUIAutomatorUtils();

    /**
     * Setup Test, like all tests makes use of helper functions in GD_UIAutomator_Lib Test library project
     */
    @BeforeClass
    public static void setUpClass() {

        uiAutomatorUtils.wakeUpDeviceIfNeeded();

        //Android Emulator when booted sometimes has error dialogues to dismiss
        uiAutomatorUtils.acceptSystemDialogues();

    }

    /**
     * Test 1, This is a negative test case which will fail because of invalid GDApplicationID. User can manually modifiy the GDApplicationID to get the
     * app activation pass
     */
    @Test
    public void test_1_activation() throws Exception {

        uiAutomatorUtils.launchAppUnderTest();

        assertTrue("Failed to provision Skeleton sample app.", BBDActivationHelper.loginOrActivateApp());

        assertTrue("Failed to check if GD was authorized.", uiAutomatorUtils.checkGDAuthorized());

        uiAutomatorUtils.pressHome();
    }

}