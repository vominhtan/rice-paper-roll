import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from './material.module';
import { MainViewComponent } from './components';
import { DateFormatPipe } from './pipes';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [MainViewComponent, DateFormatPipe, ConfirmationDialogComponent],
  entryComponents: [ConfirmationDialogComponent],
  imports: [MaterialModule, CommonModule, RouterModule],
  exports: [MaterialModule, MainViewComponent, DateFormatPipe],
})
export class SharedModule {}
