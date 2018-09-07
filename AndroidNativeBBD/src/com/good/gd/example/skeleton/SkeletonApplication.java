package com.wellsfargo.internalapps.gd.androidnativebbd;

import com.good.gd.GDAndroid;

import android.app.Application;

public class SkeletonApplication extends Application {

	@Override
	public void onCreate() {
		super.onCreate();

		//Singleton AppEvent listener is set in Application class so it receives events independantly of Activity lifecycle
		GDAndroid.getInstance().setGDStateListener(new GDEventListener());
		
		//Also set GDService/GDServiceClient listeners in Application class if AppKinetics Service framework is used in the app
	}

	
	
	
}
