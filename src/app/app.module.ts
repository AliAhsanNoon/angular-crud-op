import { BrowserModule } from '@angular/platform-browser';
import { NgModule,ErrorHandler } from '@angular/core';


import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';

import {FetchDataService} from './fetch-data.service';
import {CustomErrorHandler} from './err-handler';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, HttpModule
  ],
  providers: [FetchDataService,
  {provide : ErrorHandler, useClass : CustomErrorHandler}],
  bootstrap: [AppComponent]
})
export class AppModule { }
