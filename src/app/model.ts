import { EntityId } from '@ngrx/signals/entities';

export interface Product {
    id: EntityId;
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

