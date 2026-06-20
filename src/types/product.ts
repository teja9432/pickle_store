export type Category = 'Veg' | 'Non-Veg' | 'Sweet' | 'Spicy';

export interface PricePerWeight {
  [weight: string]: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  descriptionLong?: string;
  category: Category;
  pricePerWeight: PricePerWeight;
  image: string;
  inStock: boolean;
  tags: string[];
  ingredients?: string[];
  shelfLife?: string;
}
