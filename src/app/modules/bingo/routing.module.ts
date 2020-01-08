import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DealerComponent } from './components/dealer/dealer.component';
import { PlayerComponent } from './components/player/player.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BingoRoutingModule {}
