import {Component} from "@angular/core";
import {NavParams, NavController} from 'ionic-angular';
import {MyService} from '../../providers/myService';

@Component({
    selector: 'productView',
    templateUrl: 'productView.html'
})

export class ProductViewPage {

    product:any;
    slideOptions: Object;
    price:number;

    constructor(public nav:NavController, public params:NavParams, public myService:MyService) {
        this.product = params.get('product');
        console.log("prodview ", this.product);
    }

    /**
     * Gets the product data from the nav params
     */
    ionViewDidLoad() {
        this.price = this.product.price;
        this.slideOptions = {
            pager: 'true'
        };
    }

    add(adds){
        if(adds.checked === false){
            //console.log("status false is ", adds.checked);
            this.price = this.price + adds.add_ons_price;
            adds.checked = true;
        }else{
            //console.log("status true is ", adds.checked);
            this.price = this.price - adds.add_ons_price;
            adds.checked = false;
        }
    }

}
