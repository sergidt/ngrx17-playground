import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FeaturedProductsStore } from '../../featured-products.store';

@Component({
    selector: 'product-filters',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './filters.component.html',
    styleUrl: './filters.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class Filters2Component {
    productsStore = inject(FeaturedProductsStore);

    $categories: Signal<Array<string>> = this.productsStore.categories;

    updateProductStarsFilter(event: Event) {
        event.stopPropagation();
        this.productsStore.setFilterStars((event.target as HTMLInputElement)?.valueAsNumber ?? 0);
    }

    updateProductCategoryFilter(category: string) {
        this.productsStore.setFilterCategory(category);
    }
}
