import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {LoggedUserApi, LoopBackConfig, QuickRoomReservation, QuickRoomReservationApi} from "../shared/sdk";
import {API_VERSION, baseURL} from "../shared/baseurl";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-quick-room-details',
  templateUrl: './quick-room-details.component.html',
  styleUrls: ['./quick-room-details.component.scss']
})
export class QuickRoomDetailsComponent implements OnInit {

  reservation: QuickRoomReservation = new QuickRoomReservation();

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userApi: LoggedUserApi,
              private quickApi: QuickRoomReservationApi,
              private toastr: ToastrService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.quickApi.findById(id, {include: 'mRoomReservation'}).subscribe((res: QuickRoomReservation) => {
      this.reservation = res;
    })
  }

  onMakeReservationClicked() {
    this.userApi.createQuickRoomReservation(this.userApi.getCachedCurrent().id, this.reservation.id).subscribe(() => {
      this.toastr.success('Reservation made');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR')
    })
  }

  onBackClicked() {
    this.location.back();
  }

}
