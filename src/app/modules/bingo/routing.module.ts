import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerComponent } from './components/dealer/dealer.component';
import { PlayerComponent } from './components/player/player.component';
import { HomeComponent } from './components/home/home.component';
import { GameRoomComponent } from './components/game-room/game-room.component';
import { JoinGameComponent } from './components/join-game/join-game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JoinGameComponent,
  },
  {
    path: 'offline',
    component: GameRoomComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'dealer',
        pathMatch: 'full',
        component: DealerComponent,
      },
      {
        path: 'player',
        pathMatch: 'full',
        component: PlayerComponent,
      },
    ]
  },
  {
    path: 'rooms/:roomID',
    component: GameRoomComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: HomeComponent,
      },
      {
        path: 'dealer',
        pathMatch: 'full',
        component: DealerComponent,
      },
      {
        path: 'player',
        pathMatch: 'full',
        component: PlayerComponent,
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BingoRoutingModule {}
