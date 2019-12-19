import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreMainViewComponent } from './components/main-view/main-view.component';
import { OrderComponent } from './components/order/order.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'order',
  },
  {
    path: 'management',
    pathMatch: 'full',
    canActivate: [AuthenticationGuard],
    component: StoreMainViewComponent,
  },
  {
    path: 'order',
    pathMatch: 'full',
    component: OrderComponent,
  },
  {
    path: 'login',
    pathMatch: 'full',
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
