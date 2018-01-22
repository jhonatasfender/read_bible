import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class SqlProvider {

	constructor(
		public http: HttpClient
	) {
		
	}

	public sql() {
		return this.http.get("assets/json/acf.json");
	}
}
