import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Product } from './model';
import { filterProducts, ProductFilters } from './products.store';

@Injectable({ providedIn: 'root' })
export class ProductService {
    private _http = inject(HttpClient);

    async loadProducts(): Promise<Array<Product>> {
        return firstValueFrom(this._http.get<Array<Product>>('https://fakestoreapi.com/products'));
    }

    async getProductsByFilter(filter: ProductFilters): Promise<Array<Product>> {
        const products = await this.loadProducts();
        return filterProducts(products, filter);
    }
}

