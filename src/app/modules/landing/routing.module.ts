import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingMainViewComponent } from './components';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingMainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
