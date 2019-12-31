import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './components/dealer/dealer.component';
import { BingoRoutingModule } from './routing.module';
import { RowComponent } from './components/row/row.component';
import { CellComponent } from './components/cell/cell.component';
import { ControlComponent } from './components/control/control.component';

@NgModule({
  declarations: [DealerComponent, RowComponent, CellComponent, ControlComponent],
  imports: [
    BingoRoutingModule,
    CommonModule
  ]
})
export class BingoModule { }
