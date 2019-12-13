import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { DataOperations } from '../../jexia';
import { JexiaDataSetEndpoint } from './jexia-abstract.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService extends JexiaDataSetEndpoint<Order> {
  constructor(protected dataOperations: DataOperations) {
    super('orders', dataOperations);
  }
}
