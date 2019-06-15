import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {
  Airline,
  CombinedReservation,
  Flight,
  Hotel,
  MCarReservation,
  MFlightReservation,
  MRoomReservation,
  Room
} from '../shared/sdk/models';
import {
  AirlineApi, CombinedReservationApi,
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
  resc;
  constructor(
    public dialogRef: MatDialogRef<SeatReservationActionsComponent>,
    private fa: MFlightReservationApi,
    @Inject(MAT_DIALOG_DATA) public res: MFlightReservation,
    private loggedUserApi: LoggedUserApi,
    private flightApi: FlightApi,
    private airlineApi: AirlineApi,
    private cra: CombinedReservationApi,
    private mFlightReservationApi: MFlightReservationApi,
    private toastr: ToastrService) {}


  ngOnInit() {
    this.resc = JSON.parse(JSON.stringify(this.res));
    this.flightApi.findById(this.res.flightId).subscribe((flight: Flight) => {
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
    if (this.cancelable) {
      this.mFlightReservationApi.findById(this.res.id).subscribe((mf: MFlightReservation) => {
        this.cra.findById(mf.combinedReservationId, {include: ['mCarReservations', 'mFlightReservations', 'mRoomReservations']})
          .subscribe((cr: CombinedReservation) => {
            if (cr.mCarReservations !== undefined) {
              cr.mCarReservations.forEach((mc) => {
                this.loggedUserApi.destroyByIdMCarReservations(this.loggedUserApi.getCachedCurrent().id, mc.id).subscribe((success) => {
                  console.log('ok');
                }, (err) => {
                  console.log('nope');
                });
              });
            }
            if (cr.mFlightReservations !== undefined) {
              cr.mFlightReservations.forEach((mc2) => {
                this.fa.deleteById(mc2.id).subscribe((success) => {
                  console.log('ok');
                }, (err) => {
                  console.log('nope');
                });
              });
            }
            if (cr.mRoomReservations !== undefined) {
              cr.mRoomReservations.forEach((mc3) => {
                this.loggedUserApi.destroyByIdMRoomReservations(this.loggedUserApi.getCachedCurrent().id, mc3.id).subscribe((success) => {
                  console.log('ok');
                }, (err) => {
                  console.log('nope');
                });
              });
            }
          });
      });
    }
  }

  onSave() {
    if (this.resc.flightRate === -1 || this.resc.airlineRate === -1) {
      this.toastr.error('Please input rating before saving!');
    } else if (this.endTime > new Date().getTime()) {
      this.toastr.error('It is to early for rating!');
    } else {
      this.mFlightReservationApi.updateAttributes(this.resc.id, this.resc).subscribe((response) => {
          this.toastr.success('Reservation successfully saved', 'Success');
          this.res = this.resc;
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
