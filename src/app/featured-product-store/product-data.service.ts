import { DataService } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntityId } from '@ngrx/signals/entities';
import { firstValueFrom, map } from 'rxjs';
import { ALL_CATEGORY, Product } from '../model';

export type Filter = Record<string, unknown>;
export type Entity = { id: EntityId };

export interface ProductFilter extends Filter {
    category: string,
    stars: number
}

@Injectable({ providedIn: 'root' })
export class ProductDataService implements DataService<Product, ProductFilter> {
    private _http = inject(HttpClient);

    async loadById(id: EntityId): Promise<Product> {
        return firstValueFrom(this._http.get<Product>(`https://fakestoreapi.com/products/${ id }`));
    }

    create(entity: Product): Promise<Product> {
        // whatever
        return Promise.resolve({} as Product);
    }

    update(entity: Product): Promise<Product> {
        // whatever
        return Promise.resolve({} as Product);
    }

    delete(entity: Product): Promise<void> {
        // whatever
        return Promise.resolve();
    }

    load(filter: ProductFilter): Promise<Product[]> {
        return firstValueFrom(this._http.get<Array<Product>>('https://fakestoreapi.com/products')
                                  .pipe(map(products => filterProducts(products, filter))));
    }

    async getProductCategories(): Promise<Array<string>> {
        const products = await this.load({ category: ALL_CATEGORY, stars: 0 });
        return [ALL_CATEGORY].concat(Array.from(new Set(products.flatMap((p: Product) => p.category))));

    }
}

function filterProducts(products: Array<Product>, filter: ProductFilter) {
    return products
        .filter(p => filter.category === ALL_CATEGORY || p.category === filter.category) // By category
        .filter(p => filter.stars === 0 || p.rating.rate > filter.stars); // By stars
}

