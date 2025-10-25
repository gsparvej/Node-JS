import { Routes } from '@angular/router';
import { ItemComponent } from './component/purchase/item-component/item-component';
import { ViewItemcomponent } from './component/purchase/view-itemcomponent/view-itemcomponent';
import { VendorComponent } from './component/purchase/vendor-component/vendor-component';
import { ViewVendor } from './component/purchase/view-vendor/view-vendor';
import { ViewHalfPO } from './component/purchase/view-half-po/view-half-po';
import { ViewPODetails } from './component/purchase/view-podetails/view-podetails';

export const routes: Routes = [
    {path: '', component: ItemComponent},
    {path: 'viewItem', component: ViewItemcomponent},
    {path: 'addVendor' , component: VendorComponent},
    {path: 'viewAllVendor' , component: ViewVendor},
    {path: 'viewPO', component: ViewHalfPO},
    {path: 'viewPODetails/:id' , component: ViewPODetails}
];
