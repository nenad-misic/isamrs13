import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing/app-routing.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';

import 'hammerjs';
import { baseURL } from './shared/baseurl';
import { AppComponent } from './app.component';


import {
  MatButtonModule,
  MatCardModule, MatCheckboxModule, MatDialog, MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule, MatListModule,
  MatOptionModule, MatProgressSpinnerModule,
  MatSelectModule, MatSortHeader, MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';

import { RentacarSectionComponent } from './rentacar-section/rentacar-section.component';
import { RentacarProfileComponent } from './rentacar-profile/rentacar-profile.component';
import { RentacarSearchFormComponent } from './rentacar-search-form/rentacar-search-form.component';
import { RentacarDetailProfileComponent } from './rentacar-detail-profile/rentacar-detail-profile.component';
import { CarSectionComponent } from './car-section/car-section.component';
import { CarProfileComponent } from './car-profile/car-profile.component';
import { HomeComponent } from './home/home.component';


import { HttpClientModule } from '@angular/common/http';
import { HotelSectionComponent } from './hotel-section/hotel-section.component';
import { HotelProfileComponent } from './hotel-profile/hotel-profile.component';
import { HotelDetailProfileComponent } from './hotel-detail-profile/hotel-detail-profile.component';
import { HotelAddFormComponent } from './hotel-add-form/hotel-add-form.component';
import { AirlineSectionComponent } from './airline-section/airline-section.component';
import { AirlineProfileComponent } from './airline-profile/airline-profile.component';
import { AirlineDetailProfileComponent } from './airline-detail-profile/airline-detail-profile.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {SDKBrowserModule} from './shared/sdk';
import { UserSectionComponent } from './user-section/user-section.component';
import { UsersProfileComponent } from './users-profile/users-profile.component';
import { UsersDetailComponent } from './users-detail/users-detail.component';
import { UsersDetailProfileComponent } from './users-detail-profile/users-detail-profile.component';
import { AirlineAddFormComponent } from './airline-add-form/airline-add-form.component';
import { RentacarAddFormComponent } from './rentacar-add-form/rentacar-add-form.component';
import {RegisterComponent} from './register/register.component';
import { PasswordChangeComponent } from './password-change/password-change.component';
import { LoginComponent } from './login/login.component';
import { CarAddFormComponent } from './car-add-form/car-add-form.component';
import { CarSectionFilteredComponent } from './car-section-filtered/car-section-filtered.component';
import { CarDetailProfileComponent } from './car-detail-profile/car-detail-profile.component';
import { RacserviceSearchFormComponent } from './racservice-search-form/racservice-search-form.component';
import { RoomProfileComponent } from './room-profile/room-profile.component';
import { RoomAddFormComponent } from './room-add-form/room-add-form.component';
import { RoomDetailProfileComponent } from './room-detail-profile/room-detail-profile.component';
import { AddUserFormComponent } from './add-user-form/add-user-form.component';
import { AdditionalServicesSectionComponent } from './additional-services-section/additional-services-section.component';
import { AdditionalServiceProfileComponent } from './additional-service-profile/additional-service-profile.component';
import { AdditionalServiceAddFormComponent } from './additional-service-add-form/additional-service-add-form.component';
import { HotelSearchFormComponent } from './hotel-search-form/hotel-search-form.component';
import { AirlineSearchFormComponent } from './airline-search-form/airline-search-form.component';
import { FlightSectionComponent } from './flight-section/flight-section.component';
import { FlightProfileComponent } from './flight-profile/flight-profile.component';
import { FlightSearchFormComponent } from './flight-search-form/flight-search-form.component';
import { FlightDetailProfileComponent } from './flight-detail-profile/flight-detail-profile.component';
import { FlightAddFormComponent } from './flight-add-form/flight-add-form.component';
import { FlightSectionFilteredComponent } from './flight-section-filtered/flight-section-filtered.component';
import { SeatsComponent } from './seats/seats.component';
import { RacReservationSearchFormComponent } from './rac-reservation-search-form/rac-reservation-search-form.component';
import { MakeCarReservationComponent } from './make-car-reservation/make-car-reservation.component';
import { AdditionalServiceDetailsComponent } from './additional-service-details/additional-service-details.component';
import { RoomReservationSectionComponent } from './room-reservation-section/room-reservation-section.component';
import { RoomReservationSearchFormComponent } from './room-reservation-search-form/room-reservation-search-form.component';
import { PassengerInfoComponent } from './passenger-info/passenger-info.component';
import { PassengerInfoProfileComponent } from './passenger-info-profile/passenger-info-profile.component';
import {FriendsListComponent} from './friends-list/friends-list.component';
import { FriendsListRequestsComponent } from './friends-list-requests/friends-list-requests.component';
import { FlightInviteComponent } from './flight-invite/flight-invite.component';
import { FlightInviteProfileComponent } from './flight-invite-profile/flight-invite-profile.component';
import { CarOfRacComponent } from './car-of-rac/car-of-rac.component';
import { RoomSearchComponent } from './room-search/room-search.component';
import {BarRatingModule} from 'ngx-bar-rating';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AgmCoreModule } from '@agm/core';
import { MyReservationsComponent } from './my-reservations/my-reservations.component';
import { CarReservationActionsComponent } from './car-reservation-actions/car-reservation-actions.component';
import { RoomReservationActionsComponent } from './room-reservation-actions/room-reservation-actions.component';
import { SeatReservationActionsComponent } from './seat-reservation-actions/seat-reservation-actions.component';

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
    HotelAddFormComponent,
    AirlineSectionComponent,
    AirlineProfileComponent,
    AirlineDetailProfileComponent,
    UserProfileComponent,
    UserSectionComponent,
    UsersProfileComponent,
    UsersDetailComponent,
    UsersDetailProfileComponent,
    AirlineAddFormComponent,
    RentacarAddFormComponent,
    RegisterComponent,
    PasswordChangeComponent,
    LoginComponent,
    CarAddFormComponent,
    CarSectionFilteredComponent,
    CarDetailProfileComponent,
    RacserviceSearchFormComponent,
    RoomProfileComponent,
    RoomAddFormComponent,
    RoomDetailProfileComponent,
    AddUserFormComponent,
    AdditionalServicesSectionComponent,
    AdditionalServiceProfileComponent,
    AdditionalServiceAddFormComponent,
    HotelSearchFormComponent,
    AirlineSearchFormComponent,
    FlightSectionComponent,
    FlightProfileComponent,
    FlightSearchFormComponent,
    FlightDetailProfileComponent,
    FlightAddFormComponent,
    FlightSectionFilteredComponent,
    SeatsComponent,
    RacReservationSearchFormComponent,
    MakeCarReservationComponent,
    AdditionalServiceDetailsComponent,
    RoomReservationSectionComponent,
    RoomReservationSearchFormComponent,
    PassengerInfoComponent,
    PassengerInfoProfileComponent,
    FriendsListComponent,
    FriendsListRequestsComponent,
    FlightInviteComponent,
    FlightInviteProfileComponent,
    CarOfRacComponent,
    RoomSearchComponent,
    MyReservationsComponent,
    CarReservationActionsComponent,
    RoomReservationActionsComponent,
    SeatReservationActionsComponent
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
    MatListModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatCheckboxModule,
    NgbModule,
    MatDialogModule,
    FormsModule,
    MatTooltipModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    MatProgressSpinnerModule,
    BarRatingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBf77UiLC2QLbjq5UK6rVHIQHk2uJcwdU4'
    }),
    SDKBrowserModule.forRoot()
  ],
  entryComponents: [
    RentacarDetailProfileComponent,
    CarReservationActionsComponent,
    MyReservationsComponent
  ],
  providers: [
    {provide: 'baseURL', useValue: baseURL}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
