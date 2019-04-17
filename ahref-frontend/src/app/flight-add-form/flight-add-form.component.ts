import {Component, Inject, Input, OnInit} from '@angular/core';
import {Airline, Destination, Flight, RACService, Seat} from '../shared/sdk/models';
import {DestinationApi, LoggedUserApi, FlightApi, CarApi, RACServiceApi, AirlineApi} from '../shared/sdk/services/custom';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {forEach} from '@angular/router/src/utils/collection';
import {range} from 'rxjs';

@Component({
  selector: 'app-flight-add-form',
  templateUrl: './flight-add-form.component.html',
  styleUrls: ['./flight-add-form.component.scss']
})
export class FlightAddFormComponent implements OnInit {

  @Input()
  airline: Airline;
  type: string;
  seats: Seat[] = [];
  new_flight: Flight;
  cityStart: string;
  cityEnd: string;
  errmsg: string;
  row: number;
  col: number;
  constructor(private flightApi: FlightApi,
              private loggedUserApi: LoggedUserApi,
              private airlineApi: AirlineApi,
              @Inject('baseURL') private baseURL,
              private destinationApi: DestinationApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.new_flight = new Flight();
    this.errmsg = '';
  }

  ngOnInit() {
    this.type = this.loggedUserApi.getCachedCurrent().type;
  }

  addFlight() {
    this.new_flight.airlineId = this.airline.id;
    for ( let i = 1; i <= this.row; i++) {
      for ( let j = 1; j <= this.col; j++) {
        const seat = new Seat();
        seat.row = i;
        console.log('Ovo je ', seat.row);
        seat.column = j;
        seat.flightId = this.new_flight.id;
        this.seats.push(seat);
        // this.flightApi.createSeats(this.new_flight.id, seat).subscribe((seatz) => {});
      }
    }

    this.new_flight.seats = this.seats;

    this.destinationApi.findOne({where: {name: this.cityStart}}).subscribe((destination: Destination) => {
      this.new_flight.startDestination = destination;
      this.destinationApi.findOne({where: {name: this.cityEnd}}).subscribe((destination2: Destination) => {
        this.new_flight.endDestination = destination2;
        this.airlineApi.createFlights(this.airline.id, this.new_flight).subscribe((flight: Flight) => {
          console.log('Success');
          this.errmsg = '';
        }, (err) => {
          console.log('No end destination!');
          this.errmsg = err;
        });
      });
    }, (err) => {
      this.errmsg = err;
      console.log('No start destination!');
    });

  }
}
