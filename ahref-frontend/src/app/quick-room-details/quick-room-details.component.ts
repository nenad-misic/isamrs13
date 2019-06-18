import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from "@angular/common";
import {
  CombinedReservation,
  LoggedUserApi,
  LoopBackConfig,
  QuickRoomReservation,
  QuickRoomReservationApi
} from "../shared/sdk";
import {API_VERSION, baseURL} from "../shared/baseurl";
import {ToastrService} from "ngx-toastr";
import {CombinedService} from "../services/combined.service";

@Component({
  selector: 'app-quick-room-details',
  templateUrl: './quick-room-details.component.html',
  styleUrls: ['./quick-room-details.component.scss']
})
export class QuickRoomDetailsComponent implements OnInit {

  reservation: QuickRoomReservation = new QuickRoomReservation();
  combinedReservation: CombinedReservation;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userApi: LoggedUserApi,
              private router: Router,
              private quickApi: QuickRoomReservationApi,
              private combinedService: CombinedService,
              private toastr: ToastrService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.combinedService.combinedReservation.subscribe((cr) => {
      this.combinedReservation = cr;
    });
    const id = this.route.snapshot.params['id'];
    this.quickApi.findById(id, {include: {mRoomReservation: 'room'}}).subscribe((res: QuickRoomReservation) => {
      this.reservation = res;
    })
  }

  onMakeReservationClicked() {
    if (this.combinedReservation.mFlightReservations.length < this.combinedService.numOfBeds + this.reservation.mRoomReservation.room.numOfBeds){
      this.toastr.error("Number of beds can't exceed number of flight passengers!");
      return;
    }
    this.userApi.createQuickRoomReservation(
      this.userApi.getCachedCurrent().id,
      this.reservation.id,
      this.combinedReservation.id)
      .subscribe(() => {
        this.toastr.success('Reservation made');
        this.combinedService.refreshCombinedReservation();
        this.combinedService.numOfBeds += this.reservation.mRoomReservation.room.numOfBeds;
        this.router.navigate(['/flow']);

    }, (err) => {
      this.toastr.error(err.message, 'ERROR')
    })
  }

  onBackClicked() {
    this.location.back();
  }

}
