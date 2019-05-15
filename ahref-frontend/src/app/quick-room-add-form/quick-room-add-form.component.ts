import {Component, Inject, Input, OnInit} from '@angular/core';
import {Hotel, MRoomReservation, QuickRoomReservation, Room} from "../shared/sdk/models";
import {HotelApi, MRoomReservationApi} from "../shared/sdk/services/custom";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";

@Component({
  selector: 'app-quick-room-add-form',
  templateUrl: './quick-room-add-form.component.html',
  styleUrls: ['./quick-room-add-form.component.scss']
})
export class QuickRoomAddFormComponent implements OnInit {

  @Input()
  hotel: Hotel;
  selectedRoom: Room = null;
  reservation: MRoomReservation = new MRoomReservation();

  constructor(private reservationApi: MRoomReservationApi,
              private hotelApi: HotelApi,
              private toastr: ToastrService,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  addReservationClicked() {
    if(this.selectedRoom == null) {
      this.toastr.error('Please select a room.')
    }
    this.reservation.roomRate = -1;
    this.reservation.hotelRate = -1;
    this.reservation.roomId = this.selectedRoom.id;
    this.reservation.timeStamp = new Date();
    this.reservationApi.create(this.reservation).subscribe((result: MRoomReservation)=>{
      this.toastr.success('Quick reservation created');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });

  }

  roomClicked(room: Room) {
    this.selectedRoom = room;
  }

}
