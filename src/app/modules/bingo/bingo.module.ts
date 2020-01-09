import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './components/dealer/dealer.component';
import { BingoRoutingModule } from './routing.module';
import { CellComponent } from './components/cell/cell.component';
import { PlayerComponent } from './components/player/player.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { BoardComponent } from './components/board/board.component';
import { ChatModule } from '../chat/chat.module';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from '../shared/material.module';
import { BingoMainLayoutComponent } from './components/main-layout/main-layout.component';

@NgModule({
  declarations: [
    DealerComponent,
    CellComponent,
    PlayerComponent,
    DrawerComponent,
    BoardComponent,
    HomeComponent,
    BingoMainLayoutComponent,
  ],
  imports: [
    MaterialModule,
    ChatModule,
    BingoRoutingModule,
    CommonModule],
})
export class BingoModule { }
