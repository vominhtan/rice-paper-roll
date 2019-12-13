import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { NgJexiaModule, DataOperationsModule } from './modules/jexia';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    NgJexiaModule.initialize({
      projectID: '0c46f5a7-ffe6-4052-8ed5-faadabdb1e49',
      key: '04d8a4f8-df93-4d3b-b186-07a7671a5a08',
      secret: '4u2MGaBhVjLbhBXRhZkhGdu4f1XuNWbTNQeyyNFBDTIAxaHsrugjp2VF6ewlB9EiIRSLn8Wsf3i4Wjoo1vsqrg==',
      providers: [DataOperationsModule],
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
