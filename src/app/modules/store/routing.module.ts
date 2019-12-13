import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMainViewComponent } from './components/main-view/main-view.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StoreMainViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
