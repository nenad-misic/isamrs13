import { Routes } from '@angular/router';

import {RentacarSectionComponent} from '../rentacar-section/rentacar-section.component';
import {RentacarDetailProfileComponent} from '../rentacar-detail-profile/rentacar-detail-profile.component';
import {CarSectionComponent} from '../car-section/car-section.component';
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'rentacar', component: RentacarSectionComponent },
  { path: 'rentdetail/:id', component: RentacarDetailProfileComponent },
  { path: 'cars', component: CarSectionComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
