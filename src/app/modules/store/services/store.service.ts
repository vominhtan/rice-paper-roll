import { Injectable } from '@angular/core';
import { OrderService } from './order.service';
import { OrderItemService } from './order-item.service';
import { OrderItem } from '../model/order-item.model';
import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private orderService: OrderService, private orderItemService: OrderItemService) {

  }

  async addOrderItemToOrder(orderItem: OrderItem, order: Order): Promise<Order[]> {
    const savedOrderItem: OrderItem = (await this.orderItemService.add(orderItem).toPromise())[0];
    return this.orderService.attachOrderItem(savedOrderItem, order);
  }
}
