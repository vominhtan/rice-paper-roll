import { Component, OnInit, Input } from '@angular/core';
import * as _ from 'lodash';
import { Order, OrderType } from '../../model/order.model';
import { OrderItem } from '../../model/order-item.model';
import { ProductTotalService } from '../../services/product-total.service';

interface Props {
  order?: Order;
}

@Component({
  selector: 'rpr-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  providers: [ProductTotalService],
})
export class OrderDetailComponent implements OnInit {
  props: Props = {};
  displayedColumns: string[] = ['product', 'quantity', 'total'];
  constructor(public productTotalSrv: ProductTotalService) {}

  @Input() set order(order: Order) {
    this.props.order = order;
    this.productTotalSrv.orders = [order];
  }

  get order(): Order {
    return this.props.order;
  }

  get displayedColumnsWithActions(): string[] {
    return [
      ...(this.order && this.order.type === OrderType.GROUP ? ['name'] : []),
      ...this.displayedColumns,
      'actions',
    ];
  }

  ngOnInit() {}

  getTotalQuantity(item: OrderItem) {
    return _.reduce(
      this.order.order_items,
      (sum: number, item: OrderItem) => {
        return sum + item.quantity;
      },
      0,
    );
  }

  getTotal() {
    return _.reduce(
      this.order.order_items,
      (sum: number, item: OrderItem) => {
        return sum + item.quantity * item.product.price;
      },
      0,
    );
  }
}
