import { Component, OnInit } from '@angular/core';
import {RoomReservationDataService} from "../services/room-reservation-data.service";
import {LoggedUserApi, MRoomReservationApi, RoomApi} from '../shared/sdk/services/custom';
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
              private loggedUserApi: LoggedUserApi,
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
    this.loggedUserApi.createMRoomReservations(this.loggedUserApi.getCachedCurrent().id,
      {
        carId: this.room.id,
        timeStamp: new Date(),
        startDate:  new Date(this.info.startDate).getTime(),
        endDate: new Date(this.info.endDate).getTime(),
        carRate: -1,
        racRate: -1
      }
    ).subscribe((created) => this.toastr.success('Reservation successful'), (err) => this.toastr.error(err.message, 'ERROR'));
    return;
  }

  onDecline() {
    this.toastr.success('Reservation canceled');
  }
}
