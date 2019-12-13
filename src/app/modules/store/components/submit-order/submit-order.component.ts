import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'rpr-submit-order',
  templateUrl: './submit-order.component.html',
  styleUrls: ['./submit-order.component.scss'],
})
export class SubmitOrderComponent {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  customerLevel: string;
  products: Product[];
  levels: string[] = ['Khách hàng suýt VIP', 'Đặt mua lần đầu'];
  isOrderPlaced = false;

  forms: FormArray;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private orderService: OrderService,
    private snackBar: MatSnackBar,
    ) {}

  ngOnInit() {
    this.fetchProduct();
    this.customerLevel = this.levels[Math.floor(Math.random() * this.levels.length)];
    this.forms = this.fb.array([
      this.fb.group({
        customerName: ['', Validators.required],
      }),
      this.fb.group({
        product: [''],
        quantity: ['', Validators.required],
      }),
    ]);
  }

  fetchProduct() {
    this.productService.fetch().subscribe((products: Product[]) => {
      this.products = products;
    });
  }

  get order(): Order {
    let order: Order = {
      ...this.forms.get('0').value,
      order_items: [{
        ...this.forms.get('1').value,
      }]
    };
    return order;
  }

  placeOrder() {
    this.orderService.add(this.order).subscribe(() => {
      this.snackBar.open('Hurrey!!! Tui đã nhận được đơn hàng của bạn! Cám ơn nghen. 🍕', '', {
        duration: 2000,
      });
      this.isOrderPlaced = true;
    })
  }
}
