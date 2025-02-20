import { Category } from './category'; // Import the Category model

export interface Product {
  id: number;
  name: string;
  description: string;
  availableQuantity: number;
  price: number;
  category: Category;
  imageUrl: string;
}
