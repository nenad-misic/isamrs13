import { Routes } from '@angular/router';

import {RentacarSectionComponent} from '../rentacar-section/rentacar-section.component';
import {RentacarDetailProfileComponent} from '../rentacar-detail-profile/rentacar-detail-profile.component';
import {CarSectionComponent} from '../car-section/car-section.component';
import {HomeComponent} from '../home/home.component';
import {HotelSectionComponent} from '../hotel-section/hotel-section.component';
import {HotelDetailProfileComponent} from '../hotel-detail-profile/hotel-detail-profile.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'rentacar', component: RentacarSectionComponent },
  { path: 'rentdetail/:id', component: RentacarDetailProfileComponent },
  { path: 'cars', component: CarSectionComponent },
  { path: 'hotels', component: HotelSectionComponent },
  { path: 'hoteldetail/:id', component: HotelDetailProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
