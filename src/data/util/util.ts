import { Component } from '@angular/core';
import { AlertController, LoadingController, Loading  } from 'ionic-angular';

export class Util {

    public loading: Loading;
    public alertCtrl: AlertController;
	public loadingCtrl: LoadingController;

	constructor() {
	}

    public alert(title,text) {
    	if(this.loading != undefined)
    		this.loading.dismiss();
        let alert = this.alertCtrl.create({
            title: title,
            subTitle: text,
            buttons: ['OK']
        });
        alert.present();
        return alert;
    }

	public showLoading($s) {
        this.loading = this.loadingCtrl.create({
            content: $s
        });
        this.loading.present();
        return this.loading;
    }
}