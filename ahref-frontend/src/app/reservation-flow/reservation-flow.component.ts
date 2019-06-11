import {Component, Inject, OnInit} from '@angular/core';
import {CombinedService} from '../services/combined.service';
import {CombinedReservation, MFlightReservation, MRoomReservation} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-reservation-flow',
  templateUrl: './reservation-flow.component.html',
  styleUrls: ['./reservation-flow.component.scss']
})
export class ReservationFlowComponent implements OnInit {

  combinedReservation: CombinedReservation;
  totalPrice = 0;

  constructor(private combinedService: CombinedService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  ngOnInit() {
    this.combinedService.combinedReservation.subscribe((cr: CombinedReservation) => {
      this.combinedReservation = cr;
      if (cr.mFlightReservations != undefined) {
        cr.mFlightReservations.forEach((mfr: MFlightReservation) => {
          this.totalPrice += mfr.flight.ticketPrice;
        });
      }
      if (cr.mRoomReservations != undefined) {
        cr.mRoomReservations.forEach((mrr: MRoomReservation) => {
          this.totalPrice += mrr.price;
        });
      }
      if (cr.mCarReservations != undefined) {
        cr.mCarReservations.forEach((mcr) => {
          this.totalPrice += mcr.price;
        });
      }
      console.log(cr);
    });
    this.combinedService.refreshCombinedReservation();

  }

  onFinish() {
    this.combinedService.finishReservation();
    this.totalPrice = 0;

  }
}
