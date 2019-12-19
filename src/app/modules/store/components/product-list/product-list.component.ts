import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../model/product.model';
import { ListComponent, ConfirmationDialogComponent } from 'src/app/modules/shared';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs/operators';
import { Status } from '../../model/base.model';

@Component({
  selector: 'rpr-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent extends ListComponent<Product> implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'price', 'created_at', 'updated_at'];
  displayedColumnsWithActions: string[];
  isLoading = true;
  form: FormGroup;

  constructor(
    private snackBar: MatSnackBar,
    private productService: ProductService,
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {
    super();
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
      status: [Status.ACTIVE, [Validators.required]],
    });
    this.displayedColumnsWithActions = [...this.displayedColumns, 'actions'];
  }

  ngOnInit() {
    this.refreshData();

    this.productService
      .getDataset()
      .watch('deleted')
      .subscribe(() => {
        this.snackBar.open('Oops!!!You or some one deleted a 🍕', '', {
          duration: 2000,
        });
        this.refreshData();
      });

    this.productService
      .getDataset()
      .watch('created')
      .subscribe(() => {
        this.snackBar.open('Hurrey!!! You or some one created a new 🍕', '', {
          duration: 2000,
        });
        this.refreshData();
      });
  }

  addNewItem() {
    this.form.reset({
      status: Status.ACTIVE,
    });
    super.addNewItem();
  }

  refreshData() {
    this.productService
      .fetch()
      .pipe(
        finalize(() => {
          this.isLoading = false;
        }),
      )
      .subscribe((products: Product[]) => {
        this.items = products;
      });
  }

  save() {
    this.productService.add(this.form.value).subscribe(() => {});
    this.standBy();
  }

  openDeleteDialog(product: Product): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Warning',
        message: `Are you sure to delete "${product.name}" 🍕?`,
        payload: product,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.productService.delete(result).subscribe(() => {});
      }
    });
  }
}
