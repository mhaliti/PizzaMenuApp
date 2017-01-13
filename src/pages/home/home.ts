import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

import {SubMenuPage} from '../submenu/submenu';
import {MyService} from '../../providers/myService';

@Component({
    selector: 'home',
    templateUrl: 'home.html'
})
export class HomePage {

    myService:MyService;

    bannerOptions:Object;
    banners:any;
    menus:any;

    constructor(public nav:NavController, myService:MyService) {
        this.myService = myService;
    }   

    /**
     * Load the home screen banner and menu data from service     *
     */
    ionViewDidLoad() {
        this.myService.getHome().subscribe(
            data => {
                this.banners = data.banners;
                this.menus = data.menus;
            },
            err => console.log("Error in retrieving home data")
        );
        this.setSlideOptions();
    }

    /**
     * Sets sliding effect for banners
     */
    setSlideOptions() {
        this.bannerOptions = {
            loop: 'true',
            pager: 'true',
            speed: 2000,
            autoplay: 1500,
            effect: 'cube',
            grabCursor: true,
            autoplayDisableOnInteraction:false,
            cube: {
                shadow: true,
                slideShadows: true,
                shadowOffset: 20,
                shadowScale: 0.94
            }
        };
    }

    search() {
        console.log("Search Button is clicked");
    }

    /**
     * Open the next page: sub menu page
     * @param {Object} menu - Next submenu page to be navigated
     */
    openMenu(menu) {
        this.nav.push(SubMenuPage, {id: menu.id});
    }
}
