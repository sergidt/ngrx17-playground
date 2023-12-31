import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Product } from '../definitions';
import { ProductsStore } from '../products.store';

@Component({
    selector: 'shopping-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shopping-card.component.html',
    styleUrl: './shopping-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCardComponent implements OnInit {
    ngOnInit() {
        console.log(1111);
    }

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

