import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './routing';
import { CalendarModule, moduleCalendarComponent } from './calendar/calendar.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    routingComponents,
    moduleCalendarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
