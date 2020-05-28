import { Product } from './product.model';


export class OrderItem {
  id: number;
  orderId: number;
  productId: number;

  productNumber: number;
  productPrice: number;
  itemPrice: number;
  productDiscount: number;

  product?: Product;

  createdAt?: Date;
  updatedAt?: Date;
}
