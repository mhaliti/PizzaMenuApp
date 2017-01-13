import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {HOME, SUB_MENU, PRODUCTS} from '../providers/constant';
import 'rxjs/Rx';

@Injectable()
export class MyService {
    private http;

    constructor(http:Http) {
        this.http = http;
    }

    /**
     * Gets the home.json for HomeScreen
     * @returns Array of banners and main menu
     */
    getHome() {
        return this.http.get(HOME)
            .map((res:Response) => res.json());
    }

    /**
     * Gets the submenu of the selected menu
     * @param {number}  id  - Id of the menu whose submenu to be selected
     * @returns Array of submenu data
     */
    getSubMenu(id) {
        let tempSubMenu = [];
        return this.http.get(SUB_MENU)
            .flatMap((res:Response) => res.json().subMenuOptions)
            .filter((data) => data.typeId === id)
            .map((result) => {
                tempSubMenu.push(result);
                return tempSubMenu;
            })
    }

    /**
     * Gets the products to be displayed
     * @param {number}  id  - Id of the submenu whose products to be selected
     * @returns Array of products
     */
    getProducts(id) {
        let tempProducts = [];
        return this.http.get(PRODUCTS)
            .flatMap((res:Response) => res.json().products)
            .filter((data) => data.typeId === id)
            .map((result) => {
                tempProducts.push(result);
                return tempProducts;
            })
    }

    /**
     * Gets the veg products to be displayed
     * @param {number}  id  - Id of the submenu whose veg products to be selected
     * @returns Array of veg products
     */
    getVegProducts(id) {
        let tempProducts = [];
        return this.http.get(PRODUCTS)
            .flatMap((res:Response) => res.json().products)
            .filter((data) => (data.typeId === id && data.veg == 1))
            .map((result) => {
                tempProducts.push(result);
                return tempProducts;
            })
    }

}