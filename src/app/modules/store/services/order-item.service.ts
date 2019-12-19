import { Injectable } from '@angular/core';
import { DataOperations } from '../../jexia';
import { JexiaDataSetEndpoint } from './jexia-abstract.service';
import { OrderItem } from '../model/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderItemService extends JexiaDataSetEndpoint<OrderItem> {
  constructor(protected dataOperations: DataOperations) {
    super('order_items', dataOperations);
  }
}
