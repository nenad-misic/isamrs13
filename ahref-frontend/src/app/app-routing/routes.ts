import { Routes } from '@angular/router';

import {RentacarSectionComponent} from '../rentacar-section/rentacar-section.component';
import {RentacarDetailProfileComponent} from '../rentacar-detail-profile/rentacar-detail-profile.component';
import {CarSectionComponent} from '../car-section/car-section.component';
import {HomeComponent} from '../home/home.component';
import {HotelSectionComponent} from '../hotel-section/hotel-section.component';
import {HotelDetailProfileComponent} from '../hotel-detail-profile/hotel-detail-profile.component';
import {AirlineSectionComponent} from '../airline-section/airline-section.component';
import {AirlineDetailProfileComponent} from '../airline-detail-profile/airline-detail-profile.component';
import {UserProfileComponent} from '../user-profile/user-profile.component';
import {UserSectionComponent} from '../user-section/user-section.component';
import {RegisterComponent} from '../register/register.component';
import {LoginComponent} from '../login/login.component';
import {PasswordChangeComponent} from '../password-change/password-change.component';
import {CarSectionFilteredComponent} from '../car-section-filtered/car-section-filtered.component';
import {CarDetailProfileComponent} from '../car-detail-profile/car-detail-profile.component';
import {RoomDetailProfileComponent} from '../room-detail-profile/room-detail-profile.component';
import {AdditionalServicesSectionComponent} from '../additional-services-section/additional-services-section.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'rentacar', component: RentacarSectionComponent },
  { path: 'rentdetail/:id', component: RentacarDetailProfileComponent },
  { path: 'cars', component: CarSectionComponent },
  { path: 'cars/:id', component: CarSectionFilteredComponent },
  { path: 'cardetail/:id', component: CarDetailProfileComponent },
  { path: 'hotels', component: HotelSectionComponent },
  { path: 'hoteldetail/:id', component: HotelDetailProfileComponent },
  { path: 'airline', component: AirlineSectionComponent },
  { path: 'airlinedetail', component: AirlineDetailProfileComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profiles', component: UserSectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: PasswordChangeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'roomdetail/:id', component: RoomDetailProfileComponent},
  { path: 'additionalservices/:id', component: AdditionalServicesSectionComponent},
  { path: 'users', component: UserSectionComponent}
];
