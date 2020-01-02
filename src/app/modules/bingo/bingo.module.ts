import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './components/dealer/dealer.component';
import { BingoRoutingModule } from './routing.module';
import { CellComponent } from './components/cell/cell.component';
import { ControlComponent } from './components/control/control.component';
import { PlayerComponent } from './components/player/player.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { BoardComponent } from './components/board/board.component';

@NgModule({
  declarations: [DealerComponent, CellComponent, ControlComponent, PlayerComponent, DrawerComponent, BoardComponent],
  imports: [BingoRoutingModule, CommonModule],
})
export class BingoModule {}
