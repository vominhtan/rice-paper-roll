import { Product } from './product.model';
import { BaseRecord } from './base.model';

export interface OrderItem extends BaseRecord<any> {
  quantity: number;
  product: Product;
  name?: string;
}
