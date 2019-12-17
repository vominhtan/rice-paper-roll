import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Order } from '../../model/order.model';
import { OrderItem } from '../../model/order-item.model';

@Component({
  selector: 'rpr-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  displayedColumns: string[] = ['id', 'product', 'quantity', 'total'];
  displayedColumnsWithActions: string[];

  @Input() order: Order;

  constructor() {
    this.displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  }

  ngOnInit() {}

  getTotalQuantity(item: OrderItem) {
    return _.reduce(this.order.order_items, (sum: number, item: OrderItem) => {
      return sum + item.quantity;
    }, 0);
  }

  getTotal() {
    return _.reduce(this.order.order_items, (sum: number, item: OrderItem) => {
      return sum + (item.quantity * item.product.price);
    }, 0);
  }

}
