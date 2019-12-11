import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainViewComponent } from './components/main-view/main-view.component';
import { StoreRoutingModule } from './routing.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [StoreRoutingModule, CommonModule],
})
export class StoreModule {}
