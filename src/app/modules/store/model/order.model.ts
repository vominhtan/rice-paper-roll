import { BaseRecord } from './base.model';
import { OrderItem } from './order-item.model';

export interface Order extends BaseRecord {
  customerName: string;
  order_items?: OrderItem;
}
