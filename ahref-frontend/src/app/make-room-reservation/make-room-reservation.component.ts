import { Component, OnInit } from '@angular/core';
import {RoomReservationDataService} from "../services/room-reservation-data.service";
import {MRoomReservationApi, RoomApi} from "../shared/sdk/services/custom";
import {ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {Room} from "../shared/sdk/models";
import {RoomReservationInfo} from "../shared/room-reservation-info";

@Component({
  selector: 'app-make-room-reservation',
  templateUrl: './make-room-reservation.component.html',
  styleUrls: ['./make-room-reservation.component.scss']
})
export class MakeRoomReservationComponent implements OnInit {

  room: Room;
  info: RoomReservationInfo;

  constructor(private roomReservationData: RoomReservationDataService,
              private reservationApi: MRoomReservationApi,
              private route: ActivatedRoute,
              private roomApi: RoomApi,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.roomApi.findOne({where: {id: this.route.snapshot.params['id']}}).subscribe((room: Room) => {
      this.room = room;
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
    this.roomReservationData.currentSearchParams.subscribe((info: RoomReservationInfo) => {
      this.info = info;
    });
  }

  onConfirm() {
    this.reservationApi.create({
      roomId: this.room.id,
      timeStamp: new Date(),
      startDate: this.info.startDate,
      endDate: this.info.endDate,
      hPriceListItems: this.info.additionalServices
    }).subscribe(() => {
      this.toastr.success('Room reserved', 'Success');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    })
  }

  onDecline() {
    this.toastr.success('Reservation canceled');
  }
}
