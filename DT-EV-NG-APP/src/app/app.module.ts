import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkingSpotComponent } from './parking-spot/parking-spot.component';
import { ChargerComponent } from './charger/charger.component';
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { ChargerService } from '../services/charger.service';
import { ParkingService } from '../services/parking.service';
import {TimingService} from '../services/timing.service';

@NgModule({
  declarations: [
    AppComponent,
    ParkingSpotComponent,
    ChargerComponent,
    HeaderComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [ChargerService, ParkingService, TimingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
