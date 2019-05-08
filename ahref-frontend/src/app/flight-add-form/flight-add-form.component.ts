import {Component, Inject, Input, OnInit} from '@angular/core';
import {Airline, Destination, Flight, RACService, Seat} from '../shared/sdk/models';
import {DestinationApi, LoggedUserApi, FlightApi, CarApi, RACServiceApi, AirlineApi} from '../shared/sdk/services/custom';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {forEach} from '@angular/router/src/utils/collection';
import {range} from 'rxjs';
import {ToastrService} from "ngx-toastr";

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
              private toastr: ToastrService,
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

    this.destinationApi.findOne({where: {name: this.cityStart}}).subscribe((destination: Destination) => {
      this.new_flight.startDestination = destination.id;
      this.destinationApi.findOne({where: {name: this.cityEnd}}).subscribe((destination2: Destination) => {
        this.new_flight.endDestination = destination2.id;
         this.airlineApi.createFlights(this.airline.id, this.new_flight).subscribe((flight: Flight) => {
           console.log('Success');
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
           this.airlineApi.updateByIdFlights(flight.id, flight);
           this.toastr.success(destination.name + ' - ' + destination2.name, 'Flight added')
           }, (err) => {
           this.toastr.error(err.message, 'ERROR')
        });
      });
    }, (err) => {
      this.toastr.error(err.message, 'ERROR')
    });

  }
}
