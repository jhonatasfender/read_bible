import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	public print: string = "aguarde está executando";

	constructor(
        private sqlite: SQLite,
		public navCtrl: NavController,
        private alertCtrl: AlertController,
		public http: Http
	) {
		try {
	        this.sqlite.create({
	            name: "data.db",
	            location: "default"
	        }).then((db: SQLiteObject) => {
	        	this.list().then((t) => {
	        		this.print = JSON.stringify(t);
		            db.executeSql(t, {}).then((data) => {
		                this.print = "Mensagem",JSON.stringify({title: "TABLE CREATED: ", success: data});
		            }, (error) => {
		                this.print = JSON.stringify({title:"Unable to execute sql", erro: error});
		            })
	        	});
	        }, (error) => {
	            this.print = JSON.stringify(error);
	        });
		} catch (e) {
	        this.print = JSON.stringify(e);
		}
	}

	public list() {
        try { 
            return this.http.get("https://raw.githubusercontent.com/thiagobodruk/biblia/master/sql/aa.sql")
                .toPromise()
                .then(response => {                	
                        return response.json();
                    },
                    e => {
                        console.log(e)
                    });
        } catch(e) {
            console.log(e);
        }
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
