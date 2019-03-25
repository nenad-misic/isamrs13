import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import 'hammerjs';

import { AppComponent } from './app.component';


import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialog, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatOptionModule,
  MatSelectModule
} from '@angular/material';

import { RentacarSectionComponent } from './rentacar-section/rentacar-section.component';
import { RentacarProfileComponent } from './rentacar-profile/rentacar-profile.component';
import { RentacarSearchFormComponent } from './rentacar-search-form/rentacar-search-form.component';
import { RentacarDetailProfileComponent } from './rentacar-detail-profile/rentacar-detail-profile.component';
import { CarSectionComponent } from './car-section/car-section.component';
import { CarProfileComponent } from './car-profile/car-profile.component';
import { HomeComponent } from './home/home.component';

import {RentacarService} from './services/rentacar.service';
import {CarService} from './services/car.service';
import {DataService} from './services/data.service';

import { HttpClientModule } from '@angular/common/http';
import { HotelSectionComponent } from './hotel-section/hotel-section.component';
import {HotelService} from './services/hotel.service';
import { HotelProfileComponent } from './hotel-profile/hotel-profile.component';
import { HotelDetailProfileComponent } from './hotel-detail-profile/hotel-detail-profile.component';
import { HotelAddFormComponent } from './hotel-add-form/hotel-add-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RentacarSectionComponent,
    RentacarProfileComponent,
    RentacarSearchFormComponent,
    RentacarDetailProfileComponent,
    CarSectionComponent,
    CarProfileComponent,
    HomeComponent,
    HotelSectionComponent,
    HotelProfileComponent,
    HotelDetailProfileComponent,
    HotelAddFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    FormsModule,
    HttpClientModule

  ],
  entryComponents: [
    RentacarDetailProfileComponent
  ],
  providers: [
    RentacarService,
    CarService,
    DataService,
    HotelService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
