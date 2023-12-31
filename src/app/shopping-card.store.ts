import { computed } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Product } from './model';

export interface ShoppingCardState {
    selectedProducts: Array<Product>;
}

export const ShoppingCardStore = signalStore(
    { providedIn: 'root' },

    withState<ShoppingCardState>({
        selectedProducts: []
    }),

    withMethods((store) => {
        const { selectedProducts } = store;
        return {
            addToShoppingCard(product: Product) {
                patchState(store, {
                    selectedProducts: selectedProducts().concat(product)
                });
            },

            removeFromShoppingCard(product: Product) {
                patchState(store, {
                    selectedProducts: selectedProducts().filter(p => p.id !== product.id)
                });
            }
        };
    }),

    withComputed(({ selectedProducts }) => ({
        totalPrice: computed(() => selectedProducts().reduce((total: number, cur) => total + cur.price, 0)),
        lastAdded: computed(() => selectedProducts().at(-1)),
        isEmpty: computed(() => selectedProducts().length === 0)
    })),
);

