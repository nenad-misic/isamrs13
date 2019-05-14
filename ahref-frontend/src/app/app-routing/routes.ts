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
import {FlightSectionComponent} from '../flight-section/flight-section.component';
import {FlightDetailProfileComponent} from '../flight-detail-profile/flight-detail-profile.component';
import {FlightSectionFilteredComponent} from '../flight-section-filtered/flight-section-filtered.component';
import {SeatsComponent} from '../seats/seats.component';
import {MakeCarReservationComponent} from '../make-car-reservation/make-car-reservation.component';
import {AdditionalServiceDetailsComponent} from "../additional-service-details/additional-service-details.component";
import {PassengerInfoProfileComponent} from '../passenger-info-profile/passenger-info-profile.component';
import {PassengerInfoComponent} from '../passenger-info/passenger-info.component';
import {UsersDetailComponent} from '../users-detail/users-detail.component';
import {UsersDetailProfileComponent} from '../users-detail-profile/users-detail-profile.component';
import {FriendsListComponent} from '../friends-list/friends-list.component';
import {FriendsListRequestsComponent} from '../friends-list-requests/friends-list-requests.component';
import {FlightInviteComponent} from '../flight-invite/flight-invite.component';
import {FlightInviteProfileComponent} from '../flight-invite-profile/flight-invite-profile.component';
import {RoomReservationSectionComponent} from '../room-reservation-section/room-reservation-section.component';
import {CarOfRacComponent} from '../car-of-rac/car-of-rac.component';
import {MakeRoomReservationComponent} from "../make-room-reservation/make-room-reservation.component";
import {QuickHotelSectionComponent} from "../quick-hotel-section/quick-hotel-section.component";
import {MyReservationsComponent} from '../my-reservations/my-reservations.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'rentacar', component: RentacarSectionComponent },
  { path: 'rentdetail/:id', component: RentacarDetailProfileComponent },
  { path: 'cars', component: CarSectionComponent },
  { path: 'cars/:id', component: CarSectionFilteredComponent },
  { path: 'allcars/:id', component: CarOfRacComponent },
  { path: 'cardetail/:id', component: CarDetailProfileComponent },
  { path: 'hotels', component: HotelSectionComponent },
  { path: 'hoteldetail/:id', component: HotelDetailProfileComponent },
  { path: 'airline', component: AirlineSectionComponent },
  { path: 'airlinedetail/:id', component: AirlineDetailProfileComponent },
  { path: 'flights', component: FlightSectionComponent },
  { path: 'flights/:id', component: FlightSectionFilteredComponent },
  { path: 'flightdetail/:id', component: FlightDetailProfileComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'profiles', component: UserSectionComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'changepassword', component: PasswordChangeComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'roomdetail/:id', component: RoomDetailProfileComponent},
  { path: 'additionalservices/:id', component: AdditionalServicesSectionComponent},
  { path: 'users', component: UserSectionComponent},
  { path: 'seats/:id', component: SeatsComponent },
  { path: 'carreserve/:id', component: MakeCarReservationComponent },
  { path: 'aservice/:aserviceId', component: AdditionalServiceDetailsComponent},
  { path: 'roomreservations/:hotelId', component: RoomReservationSectionComponent},
  { path: 'roomreserve/:id', component: MakeRoomReservationComponent},
  { path: 'quickreservations/:hotelId', component: QuickHotelSectionComponent},
  { path: 'passengerinfo/:id', component: PassengerInfoComponent },
  { path: 'passengerdetail/:flight', component: PassengerInfoProfileComponent },
  { path: 'profiles/:id', component: UsersDetailProfileComponent },
  { path: 'friends', component: FriendsListComponent },
  { path: 'myreservations', component: MyReservationsComponent },
  { path: 'requests', component: FriendsListRequestsComponent },
  { path: 'flightinvite/:id', component: FlightInviteComponent },
  { path: 'flightinvite/:flight/:id', component: FlightInviteProfileComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];
