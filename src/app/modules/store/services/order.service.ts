import { Injectable } from '@angular/core';
import { Order } from '../model/order.model';
import { DataOperations } from '../../jexia';
import { JexiaDataSetEndpoint } from './jexia-abstract.service';
import { from, Observable } from 'rxjs';
import { field, IFilteringCriterion } from 'jexia-sdk-js';
import { map } from 'rxjs/operators';
import { OrderItem } from '../model/order-item.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends JexiaDataSetEndpoint<Order> {
  constructor(protected dataOperations: DataOperations) {
    super('orders', dataOperations);
  }

  fetchOrderByNumber(number: string, related?: keyof Order): Observable<Order> {
    const selectQuery = this.getDataset().select();
    const isSameNumber = field('number').isEqualTo(number);
    return from(
      (related ? selectQuery.related(related) : selectQuery)
        .where(isSameNumber)
        .limit(1)
        .execute() as Promise<Order[]>,
    ).pipe(
      map((orders: Order[]) => {
        return orders.length > 0 ? orders[0] : null;
      }),
    );
  }

  attachOrderItem(orderItem: OrderItem, order: Order): Promise<Order[]> {
    const orderItemIds = [orderItem.id];
    return this.getDataset()
      .attach('order_items', field => field('id').isInArray(orderItemIds))
      .where(this.isSameId(order))
      .execute();
  }
}
