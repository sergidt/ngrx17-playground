import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductsStore } from '../../products.store';

@Component({
    selector: 'product-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
    productsStore = inject(ProductsStore);
    $categories: Signal<Array<string>> = this.productsStore.categories;
}
