import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { db } from '../../db/db';

import { lib } from '../../lib';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public print:any;
    
    public lib: lib;

    public db:any;

    public list: any;

    constructor(
        public navCtrl: NavController
    ) {
        this.lib = new lib();
        // this.print = this.lib.syntaxHighlight(JSON.stringify(db, undefined, 4));
        this.db = new Array();
        for(let i in db.json) {
            this.db.push({
                abbrev: db.json[i].abbrev,
                color: this.lib.generatesColor()
            });
        }
    }

}
