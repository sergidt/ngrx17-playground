import { DataService } from '@angular-architects/ngrx-toolkit';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { EntityId } from '@ngrx/signals/entities';
import { firstValueFrom } from 'rxjs';
import { Product } from '../model';

export type Filter = Record<string, unknown>;
export type Entity = { id: EntityId };

@Injectable({ providedIn: 'root' })
export class ProductDataService implements DataService<Product, Filter> {
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

    async load(filter: Filter): Promise<Product[]> {
        return firstValueFrom(this._http.get<Array<Product>>('https://fakestoreapi.com/products'));
    }
}

