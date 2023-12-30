import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { switchMap, tap } from 'rxjs';
import { Product } from './model';
import { ProductService } from './services/product.service';

export const ALL_CATEGORY = 'All';

export interface ProductFilters {
    category: string;
    stars: number;
}

export interface ProductFilterState {
    filter: ProductFilters;
}

export const ProductsStore = signalStore(
    { providedIn: 'root' },

    withDevtools('products'),

    withEntities({ entity: type<Product>(), collection: 'product' }),

    withState<ProductFilterState>({
        filter: {
            category: ALL_CATEGORY,
            stars: 0
        }
    }),

    withMethods((store, service = inject(ProductService)) => {
        return {
            applyCategoryFilter(category: string) {
                patchState(store, {
                    filter: {
                        stars: store.filter().stars,
                        category
                    }
                });
            },

            applyStarsFilter(stars: number) {
                patchState(store, {
                    filter: {
                        stars,
                        category: store.filter().category
                    }
                });
            },

            isFilterCategorySelected: (category: string) => store.filter().category === category,

            filterProducts: rxMethod<ProductFilters>(filter$ => filter$
                .pipe(
                    tap(() => console.log(111111)),
                    switchMap((filter: ProductFilters) => service.getProductsByFilter(filter)),
                    tap(products => patchState(store, setAllEntities(products, { collection: 'product' })))
                )
            )
        };
    }),

    withComputed(({ productEntities, filter }) => ({
        categories: computed(() => [ALL_CATEGORY].concat(Array.from(new Set(productEntities().flatMap((p: Product) => p.category))))),
        appliedFilters: computed(() => {
            console.log(filter());
            return filter();
        })
    })),

    withHooks({
        onInit({ appliedFilters, filterProducts }) {
            filterProducts(appliedFilters());
        }
    })
);

