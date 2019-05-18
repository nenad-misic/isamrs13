import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Airline, Flight, Hotel, MCarReservation, MFlightReservation, MRoomReservation, Room} from '../shared/sdk/models';
import {
  AirlineApi,
  FlightApi,
  HotelApi,
  LoggedUserApi,
  MFlightReservationApi,
  MRoomReservationApi,
  RoomApi
} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-seat-reservation-actions',
  templateUrl: './seat-reservation-actions.component.html',
  styleUrls: ['./seat-reservation-actions.component.scss']
})
export class SeatReservationActionsComponent implements OnInit {

  cancelable: boolean;

  startTime;
  endTime;

  constructor(
    public dialogRef: MatDialogRef<SeatReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MFlightReservation,
    private loggedUserApi: LoggedUserApi,
    private flightApi: FlightApi,
    private airlineApi: AirlineApi,
    private mFlightReservationApi: MFlightReservationApi,
    private toastr: ToastrService) {}


  ngOnInit() {
    this.flightApi.findById(this.res.id).subscribe((flight: Flight) => {
      this.startTime = flight.startTime;
      this.endTime = flight.endTime;
      if (new Date(flight.startTime).getTime() > ((new Date()).getTime() + 10800000)) {
        this.cancelable = true;
      } else {
        this.cancelable = false;
      }
    });

  }

  onCancelClick() {
    alert('Canceling flight +- room +- car reservation');
  }

  onSave() {
    if (this.res.flightRate === -1 || this.res.airlineRate === -1) {
      this.toastr.error('Please input rating before saving!');
    } else if (this.endTime < new Date().getTime()) {
      this.toastr.error('It is to early for rating!');
    } else {
      this.mFlightReservationApi.updateAttributes(this.res.id, this.res).subscribe((response) => {
          this.toastr.success('Reservation successfully saved', 'Success');
          this.flightApi.findById(this.res.flightId).subscribe((flight: Flight) => {
            const uk = flight.numOfRates * flight.rating;
            flight.numOfRates += 1;
            flight.rating = (uk + this.res.flightRate) / flight.numOfRates;
            this.flightApi.updateAttributes(flight.id, flight).subscribe((response1) => console.log('Flight rate success'));

            this.airlineApi.findById(flight.airlineId).subscribe((airline: Airline) => {
              const ukr = airline.numOfRates * airline.rating;
              airline.numOfRates += 1;
              airline.rating = (ukr + this.res.airlineRate) / airline.numOfRates;
              this.airlineApi.updateAttributes(airline.id, airline).subscribe((response2) => console.log('Airline rate success'));
            });
          });
        }
      );
    }
  }

}
