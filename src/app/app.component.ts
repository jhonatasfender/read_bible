import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { SqlProvider } from '../providers/sql/sql';

import { db } from '../db/db';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {

	public rootPage:any;
	public print:any;

	constructor(
		private platform: Platform, 
		private statusBar: StatusBar, 
		private splashScreen: SplashScreen,
		private sql: SqlProvider
	) {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
		// localStorage.removeItem("db");
		if(JSON.parse(localStorage.getItem("db")) == null) { 
			this.sql.sql().subscribe((t) => {
				db.json = t;
				localStorage.setItem("db",JSON.stringify(db));
				this.rootPage = HomePage;
			}, e => {
				db.json = e;
				this.rootPage = HomePage;
			});
		} else {
			let j = JSON.parse(localStorage.getItem("db"));
			db.json = j.json;
			this.rootPage = HomePage;
		}
	}

}

