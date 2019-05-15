import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {
  AirlineApi, DestinationApi,
  FlightApi,
  LoggedUserApi,
  MFlightReservationApi,
  PassengerApi,
  QuickFlightReservationApi,
  SeatApi
} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';
import {LoopBackConfig, QuickFlightReservation} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {element} from 'protractor';

@Component({
  selector: 'app-quick-flight-section',
  templateUrl: './quick-flight-section.component.html',
  styleUrls: ['./quick-flight-section.component.scss']
})
export class QuickFlightSectionComponent implements OnInit {

  reservations: QuickFlightReservation[] = [];

  constructor(private route: ActivatedRoute,
              private location: Location,
              private loggedUserApi: LoggedUserApi,
              private reservationApi: QuickFlightReservationApi,
              private toastr: ToastrService,
              private destinationApi: DestinationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {

    this.reservationApi.find({include: 'mFlightReservations'}).subscribe((res : QuickFlightReservation[])=>{

      this.reservations = res;

    });

  }

}
