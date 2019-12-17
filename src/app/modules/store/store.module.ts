import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreMainViewComponent } from './components/main-view/main-view.component';
import { StoreRoutingModule } from './routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { OrderListComponent } from './components/order-list/order-list.component';
import { SubmitOrderComponent } from './components/submit-order/submit-order.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';

@NgModule({
  declarations: [StoreMainViewComponent, ProductListComponent, OrderListComponent, SubmitOrderComponent, OrderDetailComponent],
  imports: [ReactiveFormsModule, SharedModule, StoreRoutingModule, CommonModule],
})
export class StoreModule {}
