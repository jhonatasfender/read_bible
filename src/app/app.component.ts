import { Component } from '@angular/core';
import { Platform, AlertController  } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
// import {StatusBar, SQLite} from 'ionic-native';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {

    rootPage: any = HomePage;

    constructor(
        platform: Platform, 
        statusBar: StatusBar, 
        splashScreen: SplashScreen,
        private sqlite: SQLite,
        private alertCtrl: AlertController
    ) {
        
        platform.ready().then(() => {
            statusBar.styleDefault();
            splashScreen.hide();
            
            this.sqlite.create({
                name: "data.db",
                location: "default"
            }).then((db: SQLiteObject) => {
                db.executeSql("CREATE TABLE IF NOT EXISTS people (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT)", {}).then((data) => {
                    this.alert("Mensagem",JSON.stringify({title: "TABLE CREATED: ", erro: data}));
                }, (error) => {
                    this.alert("Mensagem",JSON.stringify({title:"Unable to execute sql", erro: error}));
                })
            }, (error) => {
                this.alert("Mensagem",JSON.stringify({title: "Unable to open database", erro: error}));
            });
        });
    }

    public alert(t,s) {
        let alert = this.alertCtrl.create({
            title: t,
            subTitle: s,
            buttons: ['OK']
        });
        alert.present();
    }
}