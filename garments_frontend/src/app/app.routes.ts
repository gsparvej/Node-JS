import { Routes } from '@angular/router';
import { ItemComponent } from './component/purchase/item-component/item-component';
import { ViewItemcomponent } from './component/purchase/view-itemcomponent/view-itemcomponent';
import { VendorComponent } from './component/purchase/vendor-component/vendor-component';
import { ViewVendor } from './component/purchase/view-vendor/view-vendor';
import { ViewHalfPO } from './component/purchase/view-half-po/view-half-po';
import { ViewPODetails } from './component/purchase/view-podetails/view-podetails';
import { Home } from './home/home';
import { CreatePO } from './component/purchase/create-po/create-po';
import { AddBuyer } from './component/merchandiser/add-buyer/add-buyer';
import { ViewBuyer } from './component/merchandiser/view-buyer/view-buyer';
import { AddUOM } from './component/merchandiser/add-uom/add-uom';
import { ViewUOM } from './component/merchandiser/view-uom/view-uom';
import { ViewBomStyle } from './component/merchandiser/view-bom-style/view-bom-style';
import { AddBomStyle } from './component/merchandiser/add-bom-style/add-bom-style';
import { ViewHalfOrder } from './component/merchandiser/view-half-order/view-half-order';
import { ViewFullOrder } from './component/merchandiser/view-full-order/view-full-order';
import { CreateOrder } from './component/merchandiser/create-order/create-order';
import { AddBom } from './component/merchandiser/add-bom/add-bom';
import { ViewBom } from './component/merchandiser/view-bom/view-bom';
import { ViewVendorDetails } from './component/purchase/view-vendor-details/view-vendor-details';

export const routes: Routes = [
    {path: '', component:Home},

    // Purchase part
    {path: 'addItem', component: ItemComponent},
    {path: 'viewItem', component: ViewItemcomponent},
    {path: 'addVendor' , component: VendorComponent},
    {path: 'viewAllVendor' , component: ViewVendor},
    {path: 'viewVendorDetails/:id', component: ViewVendorDetails},
    {path: 'viewPO', component: ViewHalfPO},
    {path: 'viewPODetails/:id' , component: ViewPODetails},
    {path: 'createPO', component: CreatePO},

    // merchandise part
    {path: 'addBuyer' , component: AddBuyer},
    {path: 'viewAllBuyer' , component: ViewBuyer},
    {path: 'addUom' , component: AddUOM},
    {path: 'viewUom' , component: ViewUOM},
    {path: 'addBomStyle' , component: AddBomStyle},
    {path: 'viewBomStyle' , component: ViewBomStyle},
    {path: 'createOrder', component: CreateOrder},
    {path: 'viewHalfOrder', component: ViewHalfOrder},
    {path: 'fullOrderView/:id', component: ViewFullOrder},
    {path: 'addBom', component: AddBom},
    {path: 'viewBom/:styleCode', component: ViewBom}
];
