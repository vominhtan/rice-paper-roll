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
import { SettingService } from './services/setting.service';
import { SettingComponent } from './components/setting/setting.component';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { JoinGameComponent } from './components/join-game/join-game.component';
import { GameService } from './services/game.service';
import { FirebaseGameService } from './services/firebase-game.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    DealerComponent,
    CellComponent,
    PlayerComponent,
    DrawerComponent,
    BoardComponent,
    HomeComponent,
    BingoMainLayoutComponent,
    SettingComponent,
    GameRoomComponent,
    JoinGameComponent,
  ],
  providers: [SettingService, { provide: GameService, useClass: FirebaseGameService }],
  imports: [MaterialModule, ChatModule, BingoRoutingModule, CommonModule, ReactiveFormsModule],
})
export class BingoModule {}
