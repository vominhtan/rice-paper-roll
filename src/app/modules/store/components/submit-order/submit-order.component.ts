import { Component, Input } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as _ from 'lodash';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order.model';
import { Status } from '../../model/base.model';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { StoreService } from '../../services/store.service';
import { OrderItem } from '../../model/order-item.model';

interface Props {
  order?: Order;
}

@Component({
  selector: 'rpr-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.scss'],
})
export class SubmitOrderComponent {
  props: Props = {};
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  customerLevel: string;
  products: Product[];
  levels: string[] = ['Khách hàng suýt VIP', 'Đặt mua lần đầu'];
  isOrderPlaced = false;
  orderChangedSubject: Subject<Order> = new Subject<Order>();

  forms: FormArray;

  @Input() isModify = false;

  @Input()
  set order(order: Order) {
    this.props.order = order;
    this.orderChangedSubject.next(order);
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private storeService: StoreService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.fetchProduct();
    this.customerLevel = this.levels[Math.floor(Math.random() * this.levels.length)];
    this.forms = this.fb.array([
      this.fb.group({
        customerName: ['', Validators.required],
        number: [this.getOrderNumber()],
      }),
      this.fb.group({
        product: [''],
        quantity: ['', Validators.required],
      }),
    ]);
    this.orderChangedSubject.pipe(filter(x => !!x)).subscribe((order: Order) => {
      this.setOrderToForm();
    });
  }

  get isAddingOrderItem(): boolean {
    return this.isModify;
  }

  private setOrderToForm() {
    this.forms.get('0.customerName').setValue(this.order.customerName);
    this.forms.get('0.number').setValue(this.order.number);
  }

  getOrderNumber(): string {
    const numberStr: string[] = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let rc: string[] = _.map('0'.repeat(3), () => {
      return numberStr[Math.floor(Math.random() * 9)];
    });

    return Array.from('0'.repeat(4))
      .map(() => {
        return rc[Math.floor(Math.random() * (rc.length - 1))];
      })
      .join('');
  }

  fetchProduct() {
    this.productService.fetch().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  get order(): Order {
    let order: Order = {
      ...this.forms.get('0').value,
      order_items: [
        ...this.props.order.order_items ? this.props.order.order_items : [],
        {
          ...this.forms.get('1').value,
          status: Status.ACTIVE,
        },
      ],
      status: Status.ACTIVE,
    };
    return order;
  }

  updateOrder() {
    this.orderService.add(this.order).subscribe(() => {
      this.snackBar.open('Hurrey!!! Cập nhật đơn hàng của bạn! Cám ơn nghen. 🍕', '', {
        duration: 2000,
      });
      this.isOrderPlaced = true;
    });
  };


  private addOrderItem() {
    const newOrderItem: OrderItem = {
      ...this.forms.get('1').value,
      name: this.forms.get('0.customerName').value,
      status: Status.ACTIVE,
    }
    this.storeService.addOrderItemToOrder(newOrderItem, this.props.order).then(() => {
      this.snackBar.open('Hurrey!!! Tui đã nhận được đơn hàng của bạn! Cám ơn nghen. 🍕', '', {
        duration: 2000,
      });
    }).finally(() => {
      this.isOrderPlaced = true;
    });
  }

  placeOrder() {
    if (this.isAddingOrderItem) {
      this.addOrderItem();
    } else {
      this.orderService.add(this.order).subscribe(() => {
        this.snackBar.open('Hurrey!!! Tui đã nhận được đơn hàng của bạn! Cám ơn nghen. 🍕', '', {
          duration: 2000,
        });
        this.isOrderPlaced = true;
      });
    }
  }

  resetForm() {
    this.forms.reset({
      number: this.getOrderNumber(),
    });
    this.isOrderPlaced = false;
  }
}
