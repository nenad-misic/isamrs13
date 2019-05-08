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
  seatZ: Seat;
  startDate: Date;
  endDate: Date;
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
    this.new_flight.startTime = new Date(this.startDate).getTime();
    this.new_flight.endTime = new Date(this.endDate).getTime();

    if ( new Date().getTime() > this.new_flight.startTime) {
      console.log('Start Date needs to be greater than 0')
      this.errmsg = 'Start Date needs to be greater than 0';
      return;
    }

    if ( this.new_flight.startTime > this.new_flight.endTime) {
      console.log('End date needs to be higher than Start Date')
      this.errmsg = 'End date needs to be higher than Start Date';
      return;
    }
    console.log(this.new_flight);

    this.destinationApi.findOne({where: {name: this.cityStart}}).subscribe((destination: Destination) => {
      this.new_flight.startDestinationId = destination.id;
      this.destinationApi.findOne({where: {name: this.cityEnd}}).subscribe((destination2: Destination) => {
        this.new_flight.endDestinationId = destination2.id;
        this.airlineApi.createFlights(this.airline.id, this.new_flight).subscribe((flight: Flight) => {
          console.log('Flight ', flight);
          flight.seats = [];
          for ( let i = 1; i <= this.row; i++) {
            for ( let j = 1; j <= this.col; j++) {
              this.seatZ = new Seat();
              this.seatZ.row = i;
              this.seatZ.column = j;
              this.seatZ.flightId = flight.id;
              this.flightApi.createSeats(flight.id, this.seatZ).subscribe((seatCreated: Seat) => {
                flight.seats.push(seatCreated.id);
              });
            }
          }

          flight.startDestinationId = destination.id;
          flight.endDestinationId = destination2.id;
          this.airlineApi.updateByIdFlights(flight.id, flight);
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
