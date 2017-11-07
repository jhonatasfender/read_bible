import { ViewChild, ElementRef } from '@angular/core';
import { Util } from '../data/util/util';

declare var $; 
declare var navigator; 
declare var window;

export class misc {
    public navbar_menu_visible: any = 0;
    public active_collapse: boolean = true;
    public disabled_collapse_init: any = 0;

};

export class lbd extends Util {

    @ViewChild('nav') nav: ElementRef;

    protected misc: any = misc;
    protected searchVisible: any = 0;
    protected transparent: boolean = true;

    protected transparentDemo: boolean = true;
    protected fixedTop: boolean = false;

    protected mobile_menu_visible: any = 0;
    protected mobile_menu_initialized: boolean = false;
    protected toggle_initialized: boolean = false;
    protected bootstrap_nav_initialized: boolean = false;
    protected isWindows: any;
    protected $sidebar: any;
    protected $sidebar_wrapper: any;
    protected $navbar: any;
    protected nav_content: any;
    protected mobile_menu_content: any;
    protected content_buff: any;
    protected $sidebar_nav: any;
    protected $toggle: any;
    protected main_panel_height: any;
    protected $layer: any;
    protected window_width: any;
    protected sidebar_container: string;
    protected image_src: any;
    protected $navbar_form: any;
    protected $nav_content: any;


    protected debounce(func: any, wait: any, immediate: any): any {
        let timeout;
        return function() {
            let context = this,
                args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                timeout = null;
                if (!immediate) func.apply(context, args);
            }, wait);
            if (immediate && !timeout) func.apply(context, args);
        };
    }

    protected initSidebarMenu() {
        // return this.debounce(() => {
            this.$sidebar_wrapper = $('.sidebar-wrapper');

            //console.log('aici se face meniu in dreapta');
            if (!this.mobile_menu_initialized) {
                this.$navbar = $(this.nav.nativeElement).find('.navbar-collapse').first().clone(true);

                this.nav_content = '';
                this.mobile_menu_content = '';

                //add the content from the regular header to the mobile menu
                //pas = 1;
                this.$navbar.children('ul').each((k,v) => {
                    this.content_buff = $(v).html();
                    this.nav_content = this.nav_content + this.content_buff;
                    //console.log('pas:' + pas);

                    //pas = pas+1;
                });

                this.nav_content = '<ul class="nav nav-mobile-menu">' + this.nav_content + '</ul>';

                this.$navbar_form = $('nav').find('.navbar-form').clone(true);

                this.$sidebar_nav = this.$sidebar_wrapper.find(' > .nav');

                // insert the navbar form before the sidebar list
                this.$nav_content = $(this.nav_content);
                this.$nav_content.insertBefore(this.$sidebar_nav);
                this.$navbar_form.insertBefore(this.$nav_content);

                $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click((event) => {
                    event.stopPropagation();

                });

                this.mobile_menu_initialized = true;
            } else {
                console.log('window with:' + $(window).width());
                if ($(window).width() > 991) {
                    // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                    this.$sidebar_wrapper.find('.navbar-form').remove();
                    this.$sidebar_wrapper.find('.nav-mobile-menu').remove();

                    // console.log(this.misc.sidebar_mini_active);

                    // if(lbd.misc.sidebar_mini_active == true){
                    //     $('body').addClass('sidebar-mini');
                    // }

                    this.mobile_menu_initialized = false;
                }
            }

            if (!this.toggle_initialized) {
                this.$toggle = $('.navbar-toggle');

                this.$toggle.click(() => {

                    if (this.mobile_menu_visible == 1) {
                        $('html').removeClass('nav-open');

                        $('.close-layer').remove();
                        setTimeout(() => {
                            this.$toggle.removeClass('toggled');
                        }, 400);

                        this.mobile_menu_visible = 0;
                    } else {
                        setTimeout(() => {
                            this.$toggle.addClass('toggled');
                        }, 430);


                        this.main_panel_height = $('.main-panel')[0].scrollHeight;
                        this.$layer = $('<div class="close-layer"></div>');
                        this.$layer.css('height', this.main_panel_height + 'px');
                        this.$layer.appendTo(".main-panel");

                        setTimeout(() => {
                            this.$layer.addClass('visible');
                        }, 100);

                        this.$layer.click(() => {
                            $('html').removeClass('nav-open');
                            this.mobile_menu_visible = 0;

                            this.$layer.removeClass('visible');

                            setTimeout(() => {
                                this.$layer.remove();
                                this.$toggle.removeClass('toggled');

                            }, 400);
                        });

                        $('html').addClass('nav-open');
                        this.mobile_menu_visible = 1;

                    }
                });

                this.toggle_initialized = true;
            }
        // }, 500, null)
    }

    protected initBootstrapNavbarMenu(): any {
        // return this.debounce(() => {

            if (!this.bootstrap_nav_initialized) {
                this.$navbar = $('nav').find('.navbar-collapse').first().clone(true);

                this.nav_content = '';
                this.mobile_menu_content = '';

                //add the content from the regular header to the mobile menu
                this.$navbar.children('ul').each((a, b) => {
                    let _a = $(b);
                    if (_a != undefined) {
                        this.content_buff = $(b).html();
                        this.nav_content = this.nav_content + this.content_buff;
                    }
                });

                this.nav_content = '<ul class="nav nav-mobile-menu">' + this.nav_content + '</ul>';

                this.$navbar.html(this.nav_content);
                this.$navbar.addClass('bootstrap-navbar');

                // append it to the body, so it will come from the right side of the screen
                $('body').append(this.$navbar);

                this.$toggle = $('.navbar-toggle');

                this.$navbar.find('a').removeClass('btn btn-round btn-default');
                this.$navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
                this.$navbar.find('button').addClass('btn-simple btn-block');

                this.$toggle.click(() => {
                    if (this.mobile_menu_visible == 1) {
                        $('html').removeClass('nav-open');

                        $('.close-layer').remove();
                        setTimeout(() => {
                            this.$toggle.removeClass('toggled');
                        }, 400);

                        this.mobile_menu_visible = 0;
                    } else {
                        setTimeout(() => {
                            this.$toggle.addClass('toggled');
                        }, 430);

                        this.$layer = $('<div class="close-layer"></div>');
                        this.$layer.appendTo(".wrapper-full-page");

                        setTimeout(() => {
                            this.$layer.addClass('visible');
                        }, 100);


                        this.$layer.click(() => {
                            $('html').removeClass('nav-open');
                            this.mobile_menu_visible = 0;

                            this.$layer.removeClass('visible');

                            setTimeout(() => {
                                this.$layer.remove();
                                this.$toggle.removeClass('toggled');

                            }, 400);
                        });

                        $('html').addClass('nav-open');
                        this.mobile_menu_visible = 1;

                    }

                });
                this.bootstrap_nav_initialized = true;
            }
        // }, 500, null)
    }

    protected initSidebarsCheck() {
    	// debugger;
        if ($(window).width() <= 991) {
            if (this.$sidebar.length != 0) {
                this.initSidebarMenu();

            } else {
                this.initBootstrapNavbarMenu();
            }
        }
    }

    protected checkSidebarImage(): void {
        this.$sidebar = $('.sidebar');
        this.image_src = this.$sidebar.data('image');

        if (this.image_src !== undefined) {
            this.sidebar_container = '<div class="sidebar-background" style="background-image: url(' + this.image_src + ') "/>'
            this.$sidebar.append(this.sidebar_container);
        } else if (this.mobile_menu_initialized == true) {
            // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
            this.$sidebar_wrapper.find('.navbar-form').remove();
            this.$sidebar_wrapper.find('.nav-mobile-menu').remove();

            this.mobile_menu_initialized = false;
        }
    }

    protected initMinimizeSidebar(): void {

        // when we are on a Desktop Screen and the collapse is triggered we check if the sidebar mini is active or not. If it is active then we don't let the collapse to show the elements because the elements from the collapse are showing on the hover state over the icons in sidebar mini, not on the click.
        $('.sidebar .collapse').on('show.bs.collapse', () => {
            if ($(window).width() > 991) {
                if (this.misc.sidebar_mini_active == true) {
                    return false;
                } else {
                    return true;
                }
            }
        });

        $('#minimizeSidebar').click(() => {
            let $btn = $(this);

            if (this.misc.sidebar_mini_active == true) {
                $('body').removeClass('sidebar-mini');
                this.misc.sidebar_mini_active = false;

                if (this.isWindows) {
                    $('.sidebar .sidebar-wrapper').perfectScrollbar();
                }

            } else {

                $('.sidebar .collapse').collapse('hide').on('hidden.bs.collapse', () => {
                    $(this).css('height', 'auto');
                });

                if (this.isWindows) {
                    $('.sidebar .sidebar-wrapper').perfectScrollbar('destroy');
                }

                setTimeout(() => {
                    $('body').addClass('sidebar-mini');

                    $('.sidebar .collapse').css('height', 'auto');
                    this.misc.sidebar_mini_active = true;
                }, 300);
            }

            // we simulate the window Resize so the charts will get updated in realtime.
            let simulateWindowResize = setInterval(() => {
                window.dispatchEvent(new Event('resize'));
            }, 180);

            // we stop the simulation of Window Resize after the animations are completed
            setTimeout(() => {
                clearInterval(simulateWindowResize);
            }, 1000);
        });
    }

    protected initCollapseArea(): void {
        $('[data-toggle="collapse-hover"]').each(() => {
            let thisdiv = $(this).attr("data-target");
            $(thisdiv).addClass("collapse-hover");
        });

        $('[data-toggle="collapse-hover"]').hover(() => {
                let thisdiv = $(this).attr("data-target");
                if (!$(this).hasClass('state-open')) {
                    $(this).addClass('state-hover');
                    $(thisdiv).css({
                        'height': '30px'
                    });
                }

            },
            () => {
                let thisdiv = $(this).attr("data-target");
                $(this).removeClass('state-hover');

                if (!$(this).hasClass('state-open')) {
                    $(thisdiv).css({
                        'height': '0px'
                    });
                }
            }).click((event) => {
            event.preventDefault();

            let thisdiv = $(this).attr("data-target");
            let height = $(thisdiv).children('.panel-body').height();

            if ($(this).hasClass('state-open')) {
                $(thisdiv).css({
                    'height': '0px',
                });
                $(this).removeClass('state-open');
            } else {
                $(thisdiv).css({
                    'height': height + 30,
                });
                $(this).addClass('state-open');
            }
        });
    }

}

export class lightBootstrapDashboard extends lbd {

    constructor(

    ) {
        super();
    }

    public init() { 
    	// debugger
        let $this = this;
        $(window).resize(function() {
            $this.initSidebarsCheck();
        });
        this.isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

        if (this.isWindows && !$('body').hasClass('sidebar-mini')) {
            // if we are on windows OS we activate the perfectScrollbar function
            $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

            $('html').addClass('perfect-scrollbar-on');
        } else {
            $('html').addClass('perfect-scrollbar-off');
        }

        this.window_width = $(window).width();
        this.$sidebar = $('.sidebar');

        // check if there is an image set for the sidebar's background
        this.checkSidebarImage();

        if ($('body').hasClass('sidebar-mini')) {
            this.misc.sidebar_mini_active = true;
        }

        this.initSidebarsCheck();

        this.initMinimizeSidebar();

        $('.form-control').on("focus", () => {
            $(this).parent('.input-group').addClass("input-group-focus");
        }).on("blur", () => {
            $(this).parent(".input-group").removeClass("input-group-focus");
        });

        // Init Collapse Areas
        this.initCollapseArea();

        // Init Tooltips
        $('[rel="tooltip"]').tooltip();

        // Init Tags Input
        if ($(".tagsinput").length != 0) {
            $(".tagsinput").tagsInput();
        }

        //  Init Bootstrap Select Picker
        if ($(".selectpicker").length != 0) {
            $(".selectpicker").selectpicker();
        }
    }

}