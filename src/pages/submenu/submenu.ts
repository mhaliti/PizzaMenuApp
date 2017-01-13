import {Component} from "@angular/core";
import {NavController, NavParams} from 'ionic-angular';

import {TabsPage} from '../tabs/tabs';

import {MyService} from '../../providers/myService';

@Component({
    selector: 'submenu',
    templateUrl: 'submenu.html'
})
export class SubMenuPage {

    myService:MyService;
    params:NavParams;
    param: any;
    submenus:any;

    constructor(public nav:NavController, params:NavParams, myService:MyService) {
        this.params = params;
        this.myService = myService;
        this.param = this.params.get('id');
        this.myService.getSubMenu(this.param).subscribe(
            data => this.submenus = data,
            err => console.log("Error is ", err)
        );
    }

    /**
     * Loads the sub menu to the screen
     */
    ionViewDidLoad() {
    }

    /**
     * Pushes to tabs view of the submenu to display product
     * @param {number} index    Id to be selected in the tab
     */
    openSubMenu(index) {
        this.nav.push(TabsPage, {submenu: this.submenus, selectId: index});
    }
}
