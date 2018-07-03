import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { db } from '../../db/db';

import { lib } from '../../lib';

declare var d3, $;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    public print: any;

    public lib: lib;

    public db: any;

    public list: any;

    constructor(
        public navCtrl: NavController
    ) {
        this.lib = new lib();
        // this.print = this.lib.syntaxHighlight(JSON.stringify(db, undefined, 4));
        this.db = new Array();
        for (let i in db.json) {
            if(Array.isArray(db.json[i].chapters)) { 
                this.db.push({
                    text: db.json[i].abbrev,
                    // abbrev: db.json[i].abbrev,
                    // color: this.lib.generatesColor(),
                    count: db.json[i].chapters.length
                });
            }
        }
        console.log("teste")
    }

    ngAfterViewInit() {
        var bubbleChart = new d3.svg.BubbleChart({
            supportResponsive: true,
            //container: => use @default
            size: 600,
            //viewBoxSize: => use @default
            innerRadius: 600 / 3.5,
            //outerRadius: => use @default
            radiusMin: 50,
            //radiusMax: use @default
            //intersectDelta: use @default
            //intersectInc: use @default
            //circleColor: use @default
            data: {
                items: this.db,
                eval: function(item) {
                    console.log(item)
                    return item.count;
                },
                classed: function(item) {
                    return item.text.split(" ").join("");
                }
            },
            /*plugins: [{
                    name: "central-click",
                    options: {
                        text: "(See more detail)",
                        style: {
                            "font-size": "12px",
                            "font-style": "italic",
                            "font-family": "Source Sans Pro, sans-serif",
                            //"font-weight": "700",
                            "text-anchor": "middle",
                            "fill": "white"
                        },
                        attr: {
                            dy: "65px"
                        },
                        centralClick: function() {
                            alert("Here is more details!!");
                        }
                    }
                },
                {
                    name: "lines",
                    options: {
                        format: [{ // Line #0
                                textField: "count",
                                classed: {
                                    count: true
                                },
                                style: {
                                    "font-size": "28px",
                                    "font-family": "Source Sans Pro, sans-serif",
                                    "text-anchor": "middle",
                                    fill: "white"
                                },
                                attr: {
                                    dy: "0px",
                                    x: function(d) {
                                        return d.cx;
                                    },
                                    y: function(d) {
                                        return d.cy;
                                    }
                                }
                            },
                            { // Line #1
                                textField: "text",
                                classed: {
                                    text: true
                                },
                                style: {
                                    "font-size": "14px",
                                    "font-family": "Source Sans Pro, sans-serif",
                                    "text-anchor": "middle",
                                    fill: "white"
                                },
                                attr: {
                                    dy: "20px",
                                    x: function(d) {
                                        return d.cx;
                                    },
                                    y: function(d) {
                                        return d.cy;
                                    }
                                }
                            }
                        ],
                        centralFormat: [{ // Line #0
                                style: {
                                    "font-size": "50px"
                                },
                                attr: {}
                            },
                            { // Line #1
                                style: {
                                    "font-size": "30px"
                                },
                                attr: {
                                    dy: "40px"
                                }
                            }
                        ]
                    }
                }
            ]*/
        });
    }

}