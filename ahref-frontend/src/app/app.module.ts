import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import {AppRoutingModule} from './app-routing/app-routing.module';
import {RentacarService} from './services/rentacar.service';
import { CarSectionComponent } from './car-section/car-section.component';
import { CarProfileComponent } from './car-profile/car-profile.component';
import {FormsModule} from '@angular/forms';
import {CarService} from './services/car.service';
import {DataService} from './services/data.service';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    RentacarSectionComponent,
    RentacarProfileComponent,
    RentacarSearchFormComponent,
    RentacarDetailProfileComponent,
    CarSectionComponent,
    CarProfileComponent,
    HomeComponent
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
    FormsModule

  ],
  entryComponents: [
    RentacarDetailProfileComponent
  ],
  providers: [
    RentacarService,
    CarService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
