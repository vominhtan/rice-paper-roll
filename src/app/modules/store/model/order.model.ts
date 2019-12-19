import { BaseRecord } from './base.model';
import { OrderItem } from './order-item.model';

export enum OrderType {
  GROUP = 'GROUP',
  INDIVIDUAL = 'INDIVIDUAL',
}

export interface Order extends BaseRecord<OrderType> {
  customerName: string;
  number: string;
  order_items?: OrderItem[];
}
