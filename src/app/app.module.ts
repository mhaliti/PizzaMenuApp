import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ProductPage } from '../pages/products/products';
import { ProductViewPage } from '../pages/productView/productView';
import { SubMenuPage } from '../pages/submenu/submenu';
import { TabsPage } from '../pages/tabs/tabs';

import { MyService } from '../providers/myService';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProductPage,
    ProductViewPage,
    SubMenuPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      tabsPlacement: 'top',
      tabsHideOnSubPages: true/*,
      tabsHighlight: true*/
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProductPage,
    ProductViewPage,
    SubMenuPage,
    TabsPage
  ],
  providers: [MyService]
})
export class AppModule {}
