import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapsComponent } from './maps/maps.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { ServiceSelectStationService } from './service-select-station.service'

@NgModule({
  declarations: [
    AppComponent,
    MapsComponent,
    MenuListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ServiceSelectStationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
