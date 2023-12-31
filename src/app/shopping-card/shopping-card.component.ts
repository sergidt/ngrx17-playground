import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ShoppingCardStore } from '../shopping-card.store';

@Component({
    selector: 'shopping-card',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './shopping-card.component.html',
    styleUrl: './shopping-card.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShoppingCardComponent {
    shoppingCard = inject(ShoppingCardStore);

    $products = this.shoppingCard.selectedProducts;

    router = inject(Router);

    goToProductList() {
        this.router.navigateByUrl('/product-list');
    }
}

