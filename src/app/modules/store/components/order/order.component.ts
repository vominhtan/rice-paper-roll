import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DateTime } from 'luxon';
import { Order, OrderType } from '../../model/order.model';
import { Status } from '../../model/base.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'rpr-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  order: Order;
  form: FormGroup;
  isModify = true;

  constructor(private fb: FormBuilder, private router: Router, private orderService: OrderService) {
    this.form = fb.group({
      orderNumber: ['', Validators.required],
    });
  }

  ngOnInit() {}

  goToOrder() {
    this.orderService.fetchOrderByNumber(this.form.value.orderNumber, 'order_items').subscribe((order: Order) => {
      this.isModify = true;
      this.order = order;
    });
  }

  createNewOrder() {
    this.isModify = false;
    this.order = {
      customerName: '',
      created_at: DateTime.local().toISO(),
      id: '',
      number: '',
      status: Status.ACTIVE,
      type: OrderType.GROUP,
      updated_at: DateTime.local().toISO(),
    };
  }
  goToManage() {
    this.router.navigate(['store/management']);
  }
}
