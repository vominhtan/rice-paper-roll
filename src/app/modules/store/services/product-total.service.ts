import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { OrderItem } from '../model/order-item.model';
import { Order } from '../model/order.model';
import { Product } from '../model/product.model';

export type ProductTotal = [Product, number];

interface Props {
  orders?: Order[];
  productTotals: ProductTotal[];
}

@Injectable()
export class ProductTotalService {
  private props: Props = {
    productTotals: [],
  };

  constructor() {}

  get productTotals(): ProductTotal[] {
    return this.props.productTotals;
  }

  set orders(orders: Order[]) {
    this.props.orders = orders;
    this.props.productTotals = this.getAllProductFromOrder();
  };

  get orders(): Order[] {
    return this.props.orders;
  }

  private getAllProductFromOrder(): [Product, number][] {
    return Object.values(_.reduce(_.flatMap(this.orders, (item: Order) => {
      return _.map(item.order_items, (orderItem: OrderItem) => {
        return [orderItem.product, orderItem.quantity];
      });
    }), (all: {[key: string]: [Product, number]}, [product, quantity]: [Product, number]) => {
      if (all[product.id]) {
        all[product.id][1] = all[product.id][1] + quantity;
      } else {
        all[product.id] = [product, quantity];
      }
      return all;
    }, {}));
  }
}
