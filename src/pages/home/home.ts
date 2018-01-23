import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { db } from '../../db/db';

import { lib } from '../../lib';

declare var d3;

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

    ngOnInit() {
        var width = 960,
        height = 500,
        radius = 30;

        var p0 = [250, 200, 60],
        p1 = [560, 300, 120];

        var svg = d3.select(".conteiner").append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g");

		svg.append("path")
		.attr("class", "mesh")
		// .attr("d", d3.hexbin().size([width, height]).radius(radius).mesh);
		.attr("d", () => {
			return "M 130,50 100,0 30,0 0,50 30,100 100,100 130,50"
		});

    }

}
