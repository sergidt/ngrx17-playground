import { Routes } from '@angular/router';
import { ProductList2Component } from './featured-product-store/product-list/product-list.component';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';

export const routes: Routes = [
    {
        path: 'product-list',
        component: ProductList2Component
    },
    /*
    {
        path: 'product-list',
        component: ProductListComponent
    },
     */
    {
        path: 'shopping-card',
        component: ShoppingCardComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'shopping-card'
    },
    {
        path: '**',
        redirectTo: 'product-list'
    }
];
