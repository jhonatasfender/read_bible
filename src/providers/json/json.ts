import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JsonProvider {

	constructor(public http: Http) {
		console.log('Hello JsonProvider Provider');
	}

	public get() {
		return this.http.get("./assets/json/aa.json").map(res => res.json());
	}
}
