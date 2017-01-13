import {Component, ViewChild} from "@angular/core";
import {NavParams, NavController, Tabs} from 'ionic-angular';

import {ProductPage} from '../products/products';
import {MyService} from '../../providers/myService';

@Component({
    selector:'tabs',
    templateUrl: 'tabs.html'
})

export class TabsPage {
    @ViewChild('myTabs') tabRef:Tabs;
    selectedIndex:any;
    tabs:any;
    final:string;
    rootPage = ProductPage;

    params:NavParams;
    nav:NavController;
    myService:MyService;
    
    constructor(params:NavParams, nav:NavController, myService:MyService) {
        this.myService = myService;
        this.params = params;
        this.nav = nav;
        this.tabs = this.params.get('submenu');
        this.selectedIndex = this.params.get('selectId');
        console.log("index is ", this.selectedIndex);
    }

    ionViewDidEnter() {
        var id = document.getElementsByClassName('tab-button').item(0).id;
        var myString = id.substring(0, 7);
        this.final = myString + this.selectedIndex;
        document.getElementById(this.final).scrollIntoView();
        this.tabRef.select(this.selectedIndex);
    }
}

