import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Product } from '../definitions';
import { ProductsStore } from '../products.store';
import { FiltersComponent } from './filters/filters.component';

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [CommonModule, FiltersComponent],
    templateUrl: './product-list.component.html',
    styleUrl: './product-list.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductListComponent {

    $products = inject(ProductsStore).filteredProducts;

    $selectedProductId = signal(-1);

    showProduct(product: Product) {
        this.$selectedProductId.set(product.id);
    }

    hideProduct(event: Event) {
        event.stopPropagation();
        this.$selectedProductId.set(-1);
    }

    addToShoppingCard(event: MouseEvent, product: Product) {
        event.stopPropagation();

    }
}

