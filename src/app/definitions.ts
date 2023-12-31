export interface Product {
    id: number;
    title: string;
    category: string;
    description: string;
    image: string;
    price: number;
    rating: {
        count: number;
        rate: number;
    };
}

export const ALL_CATEGORY = 'All';

export interface ProductFilters {
    category: string;
    stars: number;
}

export interface ProductFilterState {
    filter: ProductFilters;
}

//// UTILS

export function filterProducts(products: Array<Product>, filter: ProductFilters) {
    return products
        .filter(p => filter.category === ALL_CATEGORY || p.category === filter.category) // By category
        .filter(p => filter.stars === 0 || p.rating.rate > filter.stars); // By stars
}
