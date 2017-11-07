import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JsonProvider } from '../../providers/json/json';

import { lightBootstrapDashboard } from '../../app/light-bootstrap-dashboard';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage extends lightBootstrapDashboard {

	private list: Array<{
		abrev: string,
		name: string
	}>;

	constructor(
		public navCtrl: NavController,
		public _json: JsonProvider
	) {
		super();
		this._list();
	}

	ngAfterViewInit() {
        this.init();
    }

    private _list() {
    	this.list = new Array();
    	this._json.get().subscribe((t) => {
    		for (let i in t) {
    			let a = t[i]
    			this.list.push({
    				abrev: a.abbrev,
    				name: a.book
    			});
    		}
    	});
    }

    public validInt($n) {
    	return /\d/g.test($n);
    }

    public returnInt(s) {
    	return s.substring(0,1);
    }

    public abrev($n) {
    	console.log(/\d/g.test($n));
    	let s = $n.replace(/\d/g,'');
    	return s.substring(0,1).toUpperCase() + s.substring(1,s.length);
    }

}
