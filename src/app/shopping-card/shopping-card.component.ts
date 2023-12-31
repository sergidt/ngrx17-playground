import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsStore } from '../products.store';

@Component({
    selector: 'shopping-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shopping-card.component.html',
    styleUrl: './shopping-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCardComponent {
    $products = inject(ProductsStore).filteredProducts;

    $totalPrice = computed(() => this.$products().reduce((acc, cur) => acc + cur.price, 0));

    router = inject(Router);

    goToProductList() {
        this.router.navigateByUrl('/product-list');
    }
}

