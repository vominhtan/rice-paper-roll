import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingRoutingModule } from './routing.module';
import { SharedModule } from '../shared/shared.module';
import { LandingMainViewComponent } from './components';

@NgModule({
  declarations: [LandingMainViewComponent],
  imports: [CommonModule, LandingRoutingModule, SharedModule],
})
export class LandingModule {}
