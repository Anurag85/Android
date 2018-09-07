/*
 *  This file contains sample code that is licensed according to the BlackBerry Dynamics SDK terms and conditions.
 *  (c) 2017 BlackBerry Limited. All rights reserved.
 */

package com.wellsfargo.internalapps.gd.androidnativebbd;

import java.util.Map;

import android.os.Bundle;
import android.util.Log;

import android.app.Activity;
import com.good.gd.GDAndroid;
import com.good.gd.GDStateListener;


/* Skeleton - the entry point activity which will start authorization with Good Dynamics
 * and once done launch the application UI.
 */
public class Skeleton extends Activity implements GDStateListener {

	private static final String TAG = Skeleton.class.getSimpleName();
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		
		GDAndroid.getInstance().activityInit(this);
		
	}

	/*
	 * Activity specific implementation of GDStateListener. 
	 * 
	 * If a singleton event Listener is set by the application (as it is in this case) then setting 
	 * Activity specific implementations of GDStateListener is optional   
	 */
	@Override
	public void onAuthorized() {
		//If Activity specific GDStateListener is set then its onAuthorized( ) method is called when 
		//the activity is started if the App is already authorized 
		Log.i(TAG, "onAuthorized()");
	}

	@Override
	public void onLocked() {
		Log.i(TAG, "onLocked()");
	}

	@Override
	public void onWiped() {
		Log.i(TAG, "onWiped()");
	}

	@Override
	public void onUpdateConfig(Map<String, Object> settings) {
		Log.i(TAG, "onUpdateConfig()");
	}

	@Override
	public void onUpdatePolicy(Map<String, Object> policyValues) {
		Log.i(TAG, "onUpdatePolicy()");
	}

	@Override
	public void onUpdateServices() {
		Log.i(TAG, "onUpdateServices()");
	}

    @Override
    public void onUpdateEntitlements() {
        Log.i(TAG, "onUpdateEntitlements()");
    }
}
