import {Component, Inject, OnInit} from '@angular/core';
import {Seat, Flight, Car, RACService, Airline} from '../shared/sdk/models';
import {AirlineApi, CarApi, FlightApi, LoggedUserApi, RACServiceApi,} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-flight-detail-profile',
  templateUrl: './flight-detail-profile.component.html',
  styleUrls: ['./flight-detail-profile.component.scss']
})
export class FlightDetailProfileComponent implements OnInit {

  flight: Flight;
  readOnly: boolean;
  errmsg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private flightApi: FlightApi,
              private airlineApi: AirlineApi,
              private loggedUserApi: LoggedUserApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.flightApi.findById(id).subscribe((flight: Flight) => {
      this.flight = flight;
      this.airlineApi.findById(flight.airlineId).subscribe((airline: Airline) => {
        if (airline.loggedUserId === this.loggedUserApi.getCachedCurrent().id) {
          this.readOnly = false;
        } else {
          this.readOnly = true;
        }
      });
    });
  }



  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.flightApi.updateAttributes(this.flight.id, this.flight).subscribe((returned: Flight) => { this.errmsg = ''; }, (err) => {this.errmsg = err; });
    this.location.back();
  }

  onDeleteClick(): void {
    // additional checks needed (will be implemented when the reservations arrive)
    this.flightApi.deleteById(this.flight.id).subscribe((completed) => this.errmsg = '', (err) => this.errmsg = err);
    this.location.back();
  }
}
