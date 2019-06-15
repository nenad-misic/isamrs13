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
      var totalPrice = 0;
      if (cr.mFlightReservations != undefined) {
        cr.mFlightReservations.forEach((mfr: MFlightReservation) => {
          totalPrice += mfr.flight.ticketPrice;
          console.log('totalprice+= ' + mfr.flight.ticketPrice + ' = ' + totalPrice);
        });
      }
      if (cr.mRoomReservations != undefined) {
        cr.mRoomReservations.forEach((mrr: MRoomReservation) => {
          totalPrice += mrr.price;
          console.log('totalprice+= ' + mrr.price + ' = ' + totalPrice);
        });
      }
      if (cr.mCarReservations != undefined) {
        cr.mCarReservations.forEach((mcr) => {
          totalPrice += mcr.price;
          console.log('totalprice+= ' + mcr.price + ' = ' + totalPrice);
        });
      }
      console.log(cr);
      this.totalPrice = totalPrice;
      console.log('totalprice = ' + totalPrice);
    });
    this.combinedService.refreshCombinedReservation();

  }

  onFinish() {
    this.combinedService.finishReservation();
    this.totalPrice = 0;

  }
}
