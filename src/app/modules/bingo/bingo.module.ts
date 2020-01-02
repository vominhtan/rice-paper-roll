import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './components/dealer/dealer.component';
import { BingoRoutingModule } from './routing.module';
import { RowComponent } from './components/row/row.component';
import { CellComponent } from './components/cell/cell.component';
import { ControlComponent } from './components/control/control.component';
import { PlayerComponent } from './components/player/player.component';
import { DrawerComponent } from './components/drawer/drawer.component';

@NgModule({
  declarations: [DealerComponent, RowComponent, CellComponent, ControlComponent, PlayerComponent, DrawerComponent],
  imports: [
    BingoRoutingModule,
    CommonModule
  ]
})
export class BingoModule { }