import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { Product } from '../model';
import { ALL_CATEGORY, ProductFilters } from '../products.store';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private _http = inject(HttpClient);

    async loadProducts(): Promise<Array<Product>> {
        return firstValueFrom(this._http.get<Array<Product>>('https://fakestoreapi.com/products'));
    }

    getProductsByFilter(filter: ProductFilters) {
        return this._http.get<Array<Product>>('https://fakestoreapi.com/products')
                   .pipe(map(products => filterProducts(products, filter)));
    }
}

function filterProducts(products: Array<Product>, filter: ProductFilters) {
    return products
        .filter(p => filter.category === ALL_CATEGORY || p.category === filter.category) // By category
        .filter(p => filter.stars === 0 || p.rating.rate > filter.stars); // By stars
}
