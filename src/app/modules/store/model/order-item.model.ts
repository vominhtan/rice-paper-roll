import { Product } from './product.model';
import { BaseRecord } from './base.model';

export interface OrderItem extends BaseRecord {
  quatity: number;
  products?: Product[];
}
