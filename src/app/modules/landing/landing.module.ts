import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './routing.module';
import { MainViewComponent } from './components';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [MainViewComponent],
  imports: [CommonModule, LandingRoutingModule, SharedModule],
})
export class LandingModule {}
