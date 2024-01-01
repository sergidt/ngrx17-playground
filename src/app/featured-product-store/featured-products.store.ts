import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { distinctUntilChanged, switchMap, tap } from 'rxjs';
import { ALL_CATEGORY, Product, ProductFilters, ProductFilterState } from '../model';

//// UTILS

export function filterProducts(products: Array<Product>, filter: ProductFilters) {
    return products
        .filter(p => filter.category === ALL_CATEGORY || p.category === filter.category) // By category
        .filter(p => filter.stars === 0 || p.rating.rate > filter.stars); // By stars
}

//// STORE
export const FeaturedProductsStore = signalStore(
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
                    distinctUntilChanged(),
                    switchMap((filter: ProductFilters) => service.getProductsByFilter(filter)),
                    tap(products => patchState(store, setAllEntities(products, { collection: 'product' })))
                )
            )
        };
    }),

    withComputed(({ productEntities, filter }) => ({
        categories: computed(() => [ALL_CATEGORY].concat(Array.from(new Set(productEntities().flatMap((p: Product) => p.category))))),
        filteredProducts: computed(() => filterProducts(productEntities(), filter()))
    })),

    withHooks({
        onInit({ filter, filterProducts }) {
            filterProducts(filter());
        }
    })
);

