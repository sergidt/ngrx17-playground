import { Routes } from '@angular/router';
import { ShoppingCardComponent } from './shopping-card/shopping-card.component';
import { ProductListComponent } from './simple-product-store/product-list/product-list.component';

export const routes: Routes = [
    {
        path: 'product-list',
        component: ProductListComponent
    },
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
