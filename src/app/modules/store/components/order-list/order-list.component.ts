import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ListComponent, ConfirmationDialogComponent } from 'src/app/modules/shared';
import { finalize } from 'rxjs/operators';
import * as _ from 'lodash';
import { Order } from '../../model/order.model';
import { OrderService } from '../../services/order.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Product } from '../../model/product.model';
import { OrderItem } from '../../model/order-item.model';

type ProductTotal = [Product, number];

@Component({
  selector: 'rpr-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OrderListComponent extends ListComponent<Order> implements OnInit {
  displayedColumns: string[] = ['id', 'customerName', 'created_at', 'updated_at'];
  displayedColumnsWithActions: string[];
  isLoading = true;
  form: FormGroup;
  expandedElement: Order | null;
  productTotals: ProductTotal[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    super();
    this.form = this.fb.group({
      quantity: [''],
      product: [''],
    });
    this.displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  }

  ngOnInit() {
    this.refreshData();

    this.orderService
      .getDataset()
      .watch('deleted')
      .subscribe(() => {
        this.snackBar.open('Oops!!!You or some one deleted an order', '', {
          duration: 2000,
        });
        this.refreshData();
      });

    this.orderService
      .getDataset()
      .watch('created')
      .subscribe(() => {
        this.snackBar.open('Hurrey!!! You or some one created a new order', '', {
          duration: 2000,
        });
        this.refreshData();
      });
  }

  private getAllProduct(): [Product, number][] {
    return Object.values(_.reduce(_.flatMap(this.items, (item: Order) => {
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

  addNewItem() {
    this.form.reset({});
    super.addNewItem();
  }

  refreshData() {
    this.orderService
      .fetch('order_items')
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((orders: Order[]) => {
        this.items = orders;
        this.productTotals = this.getAllProduct();
      });
  }

  save() {
    this.orderService.add(this.form.value).subscribe(() => { });
    this.standBy();
  }

  openDeleteDialog(order: Order): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Warning',
        message: `Are you sure to delete "${order.id}" 🍕?`,
        payload: order,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.orderService.delete(result).subscribe(() => { });
      }
    });
  }
}
