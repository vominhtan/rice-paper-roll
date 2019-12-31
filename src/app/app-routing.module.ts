import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bingo',
  },
  {
    path: 'landing',
    loadChildren: () => import('./modules/landing/landing.module').then(m => m.LandingModule),
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule),
  },
  {
    path: 'bingo',
    loadChildren: () => import('./modules/bingo/bingo.module').then(m => m.BingoModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
