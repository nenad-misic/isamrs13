import {Component, Inject, OnInit} from '@angular/core';
import {CombinedService} from '../services/combined.service';
import {CombinedReservation, MFlightReservation, MRoomReservation} from '../shared/sdk/models';
import {CombinedReservationApi, LoggedUserApi, LoopBackConfig, MCarReservationApi, MRoomReservationApi} from '../shared/sdk';
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
              private luapi: LoggedUserApi,
              private carapi: MCarReservationApi,
              private romapi: MRoomReservationApi,
              private combinedApi: CombinedReservationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  ngOnInit() {
    this.combinedService.combinedReservation.subscribe((cr: CombinedReservation) => {
      this.combinedReservation = cr;
      let totalPrice = 0;
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
    const roomlist = [];
    var cnt = this.combinedReservation.mCarReservations.length + this.combinedReservation.mRoomReservations.length;
    console.log('aaaaaaaaaa');
    const carlist = [];
    this.combinedReservation.mCarReservations.forEach((mc) => {
      this.carapi.findById(mc.id, {include: {car: 'rACService'}}).subscribe((mcbogat) => {
        carlist.push(mcbogat);
        cnt--;
        if (cnt == 0) {
          console.log(cnt);
          this.combinedApi.sendReservationInfoMail({objekat: this.luapi.getCachedCurrent().id}, {lista: carlist}, {lista: roomlist}
          ).subscribe((succ) => {
            this.combinedService.finishReservation();
            this.totalPrice = 0;
          });
        }
      });
    });

    this.combinedReservation.mRoomReservations.forEach((mr) => {
      this.romapi.findById(mr.id, {include: {room: 'hotel'}}).subscribe((mrbogat) => {
        roomlist.push(mrbogat);
        cnt--;
        if (cnt == 0) {
          console.log(cnt);
          this.combinedApi.sendReservationInfoMail({objekat: this.luapi.getCachedCurrent().id}, {lista: carlist}, {lista: roomlist}
          ).subscribe((succ) => {
            this.combinedService.finishReservation();
            this.totalPrice = 0;
          });
        }
      });
    });
  }
}
