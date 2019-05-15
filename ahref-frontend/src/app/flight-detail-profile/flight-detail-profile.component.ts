import {Component, Inject, OnInit} from '@angular/core';
import {Flight, Airline, Destination} from '../shared/sdk/models';
import {AirlineApi, DestinationApi, FlightApi, LoggedUserApi, SeatApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {ToastrService} from "ngx-toastr";
import {and} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-flight-detail-profile',
  templateUrl: './flight-detail-profile.component.html',
  styleUrls: ['./flight-detail-profile.component.scss']
})
export class FlightDetailProfileComponent implements OnInit {

  flight: Flight;
  startDate: Date;
  endDate: Date;
  readOnly: boolean;
  reserveBul: boolean;
  errmsg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private flightApi: FlightApi,
              private airlineApi: AirlineApi,
              private seatApi: SeatApi,
              private loggedUserApi: LoggedUserApi,
              private toastr: ToastrService,
              private destinationApi: DestinationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.flightApi.findById(id, {include: ['startDestination','endDestination']}).subscribe((flight: Flight) => {
      this.flight = flight;
      this.startDate = new Date(flight.startTime);

      console.log('Start ', this.startDate);

      this.endDate = new Date(flight.endTime);

      console.log('Emd ', this.endDate);

      this.destinationApi.findById(flight.startDestinationId).subscribe((destination: Destination) => {
        this.flight.startDestination = destination;

      });

      this.destinationApi.findById(flight.endDestinationId).subscribe((destination: Destination) => {
        this.flight.endDestination = destination;

      });

      this.reserveBul = this.loggedUserApi.getCachedCurrent() != null && (this.loggedUserApi.getCachedCurrent().type =='airlineAdmin' || this.loggedUserApi.getCachedCurrent().type =='regUser');

      this.airlineApi.findById(flight.airlineId).subscribe((airline: Airline) => {
        if (this.loggedUserApi.getCachedCurrent() != null && airline.loggedUserId === this.loggedUserApi.getCachedCurrent().id) {
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
    this.flightApi.updateAttributes(this.flight.id, this.flight).subscribe((returned: Flight) => {
      this.toastr.success(this.flight.airline.name, 'Flight updated')
      }, (err) => {
      this.toastr.error(err.message, 'ERROR')
    });
    this.location.back();
  }

  onDeleteClick(): void {
    // additional checks needed (will be implemented when the reservations arrive)
    this.flightApi.findOne({where: {id: this.flight.id},include: 'seats'}).subscribe((flight: Flight)=>{
      flight.seats.forEach((seat)=>{
        this.seatApi.deleteById(seat.id).subscribe((completed) => this.errmsg = '', (err) => this.errmsg = err);
      });
    });
    this.flightApi.deleteById(this.flight.id).subscribe((completed) => this.errmsg = '', (err) => this.errmsg = err);
    this.location.back();
  }
}
