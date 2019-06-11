import { Component, OnInit } from '@angular/core';
import {RoomReservationDataService} from "../services/room-reservation-data.service";
import {DatePriceApi, LoggedUserApi, MRoomReservationApi, RoomApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Room} from "../shared/sdk/models";
import {RoomReservationInfo} from "../shared/room-reservation-info";
import {Location} from "@angular/common";

@Component({
  selector: 'app-make-room-reservation',
  templateUrl: './make-room-reservation.component.html',
  styleUrls: ['./make-room-reservation.component.scss']
})
export class MakeRoomReservationComponent implements OnInit {

  room: Room;
  info: RoomReservationInfo;
  price: number;

  constructor(private roomReservationData: RoomReservationDataService,
              private reservationApi: MRoomReservationApi,
              private loggedUserApi: LoggedUserApi,
              private route: ActivatedRoute,
              private roomApi: RoomApi,
              private location: Location,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.roomApi.findOne({where: {id: this.route.snapshot.params['id']}, include: 'datePrices'}).subscribe((room: Room) => {
      this.room = room;
      this.roomReservationData.currentSearchParams.subscribe((info: RoomReservationInfo) => {
        this.info = info;
        if (room.datePrices == null) {
          this.toastr.error("Room has no prices defined");
          this.location.back();
        }
        console.log(this.info);
        var startDate = new Date(this.info.startDate).getTime();
        var endDate = new Date(this.info.endDate).getTime();
        var startPrice = room.datePrices[0];
        for (let price of room.datePrices) {
          if (price.startDate > startDate) continue;
          if (price.startDate > startPrice.startDate) startPrice = price;
        }
        var days = (endDate - startDate)/(24*60*60*1000);
        this.price = days * startPrice.price;
      });
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });

  }

  onConfirm() {
    this.loggedUserApi.createMRoomReservations(this.loggedUserApi.getCachedCurrent().id,
      {
        roomId: this.room.id,
        timeStamp: new Date(),
        startDate:  new Date(this.info.startDate).getTime(),
        endDate: new Date(this.info.endDate).getTime(),
        roomRate: -1,
        hotelRate: -1,
        price: this.price,
        aservices: this.info.additionalServices
      }
    ).subscribe((created) => this.toastr.success('Reservation successful'), (err) => this.toastr.error(err.message, 'ERROR'));
    return;
  }

  onDecline() {
    this.toastr.success('Reservation canceled');
  }

  onBack() {
    this.location.back();
  }
}
