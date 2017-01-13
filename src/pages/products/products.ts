import {Component} from "@angular/core";
import {NavParams, NavController, App} from 'ionic-angular';
import {ProductViewPage} from '../productView/productView';
import {MyService} from '../../providers/myService';


@Component({
    selector: 'products',
    templateUrl: 'products.html'
})

export class ProductPage {

    params:NavParams;
    myService:MyService;

    products:any;
    onlyVeg:boolean = false;
    selectedIndex:number;

    id:number;
    scrollString:string;
    scrollTo:string;

    constructor(public nav:NavController, params:NavParams, myService:MyService, public app: App) {
        this.myService = myService;
        this.params = params;
        this.selectedIndex = this.params.data;
    }

    /**
     * Load the products under a sub menu on view loading
     * scrollString  - Gets the element's id name for currently selected tab
     */
    ionViewDidLoad() {
        this.myService.getProducts(this.selectedIndex).subscribe(
            data => this.products = data,
            err => console.log("Error in retriving products")
        );       
    }

    /**
     * To get the selected tabs index id on view enter
     */
    ionViewDidEnter() {
        var Elementid = document.getElementsByClassName('tab-button').item(0).id;
        this.scrollString = Elementid.substring(0, 7);
       //noinspection TypeScriptUnresolvedVariable
        var viewId:string = this.nav.id;
         this.id = parseInt(viewId.slice(-1));
    }

    /**
     * Filters Veg and Non-Veg based on the toogle condition
     */
    filter() {
        if (this.onlyVeg == false) {
            this.myService.getProducts(this.selectedIndex).subscribe(
                data => this.products = data,
                err => console.log("Error in retriving products")
            )
        } else {
            this.myService.getVegProducts(this.selectedIndex).subscribe(
                data => this.products = data,
                err => console.log("Error in retriving products")
            )
        }
    }

    /**
     * Moves to next tab on swiping left gesture
     * @param action
     */
    swipeLeft(action) {
        //noinspection TypeScriptUnresolvedVariable
        if (this.id != (this.nav.parent._ids)) {
            var goToId:number = this.id + 1;
            if(goToId != this.nav.parent._ids){
                this.scrollTo = this.scrollString + (goToId+1);
                document.getElementById(this.scrollTo).scrollIntoView(true);
            }
            //noinspection TypeScriptUnresolvedVariable
            this.nav.parent.select(goToId, {animate: true});
        }
    }

    /**
     * Moves to previous tab on swiping right gesture
     * @param action
     */
    swipeRight(action) {
        if (this.id != 0) {
            var goToId:number = this.id - 1;
            if(goToId != 0){
                this.scrollTo = this.scrollString +  (goToId-1);
                document.getElementById(this.scrollTo).scrollIntoView(true);
            }
            //noinspection TypeScriptUnresolvedVariable
            this.nav.parent.select(goToId, {animate: true});
        }
    }

    /**
     * Navigates to detailed view of the selected product
     * @param {Object} prod - Selected product object
     */
    openProduct(prod) {
        console.log("what is in prod, ",prod);
        this.nav.push(ProductViewPage, {product: prod});
    }

    /**
     * Navigates to previous view
     */
    goBack() {
        this.app.getRootNav().pop();
    }
   
}
