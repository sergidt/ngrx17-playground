import { withDataService, withDevtools } from '@angular-architects/ngrx-toolkit';
import { inject } from '@angular/core';
import { patchState, signalStore, type, withHooks, withMethods, withState } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';
import { ALL_CATEGORY, Product } from '../model';
import { ProductDataService } from './product-data.service';

//// UTILS

//// STORE
export const FeaturedProductsStore = signalStore(
    { providedIn: 'root' },

    withDevtools('products'),

    withState<{ categories: string[] }>({ categories: [] }),

    withEntities({ entity: type<Product>(), collection: 'product' }),

    withDataService({
        dataServiceType: ProductDataService,
        filter: { category: ALL_CATEGORY, stars: 0 },
        collection: 'product'
    }),

    withMethods(store => {
        const service = inject(ProductDataService);
        return {
            isFilterCategorySelected: (category: string) => store.productFilter().category === category,

            setFilterStars(stars: number) {
                store.updateProductFilter({ stars, category: store.productFilter.category() });
                store.loadProductEntities();
            },

            setFilterCategory(category: string) {
                store.updateProductFilter({ stars: store.productFilter.stars(), category });
                store.loadProductEntities();
            },

            async loadProductCategories() {
                patchState(store, { categories: await service.getProductCategories() });
            }
        };
    }),

    withHooks({
        onInit({ loadProductEntities, loadProductCategories }) {
            loadProductEntities();
            loadProductCategories();
        }
    })
);

