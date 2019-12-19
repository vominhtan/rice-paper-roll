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
import { ProductTotalService } from '../../services/product-total.service';
import { Status } from '../../model/base.model';

const IconDictionary: { [key in Status]: string } = {
  ACTIVE: '💡',
  ARCHIVED: '📦',
  INACTIVE: '💤',
  MARK_FOR_DELETE: '🗑️',
};

@Component({
  selector: 'rpr-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [ProductTotalService],
})
export class OrderListComponent extends ListComponent<Order> implements OnInit {
  displayedColumns: string[] = ['id', 'customerName', 'created_at', 'updated_at'];
  displayedColumnsWithActions: string[];
  isLoading = true;
  form: FormGroup;
  expandedElement: Order | null;

  constructor(
    private snackBar: MatSnackBar,
    private orderService: OrderService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    public productTotalSrv: ProductTotalService,
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
        this.productTotalSrv.orders = orders;
      });
  }

  save() {
    this.orderService.add(this.form.value).subscribe(() => {});
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
        this.orderService.delete(result).subscribe(() => {});
      }
    });
  }

  getIcon(status: Status): string {
    return IconDictionary[status];
  }
}
