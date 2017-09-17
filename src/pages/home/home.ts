import { Component, ViewChild, ElementRef  } from '@angular/core';
import { NavController } from 'ionic-angular';

import { lightBootstrapDashboard } from '../../app/light-bootstrap-dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage extends lightBootstrapDashboard {

	private list: Array<{
		value: string,
		icon: string
	}>;

	constructor(
		public navCtrl: NavController
	) {
		super();
		this._list();
	}

	ngAfterViewInit() {
        this.init();
    }

    private _list() {
    	this.list = new Array();
		this.list.push({
			value: 'Agenda',
			icon: 'pe-7s-date'
		});
		this.list.push({
			value: 'Credencial',
			icon: 'pe-7s-id'
		});
		this.list.push({
			value: 'O Evento',
			icon: 'pe-7s-light'
		});
		this.list.push({
			value: 'Alertas',
			icon: 'pe-7s-bell'
		});
		this.list.push({
			value: 'Palestrantes',
			icon: 'pe-7s-user'
		});
		this.list.push({
			value: 'REGISTRAR',
			icon: 'pe-7teste fa fa-qrcode'
		});
    }

}
