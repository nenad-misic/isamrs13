import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {HotelApi, LoggedUserApi, LoopBackConfig, QuickRoomReservation, Room, RoomApi} from '../shared/sdk';
import { Hotel } from '../shared/sdk/models';
import {ToastrService} from "ngx-toastr";
import {CombinedService} from '../services/combined.service';
@Component({
  selector: 'app-hotel-detail-profile',
  templateUrl: './hotel-detail-profile.component.html',
  styleUrls: ['./hotel-detail-profile.component.scss']
})
export class HotelDetailProfileComponent implements OnInit {

  profile_new: Hotel;
  profile: Hotel;
  rooms: Room[];
  readOnly: boolean;
  combinedActive = false;
  rate: number;
  sysAdmin = false;

  constructor(private hotelService: HotelApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi,
              private router: Router,
              private toastr: ToastrService,
              private combinedService: CombinedService,
              private roomApi: RoomApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.combinedActive = this.combinedService.active;
    const id = this.route.snapshot.params['id'];
    this.hotelService.findOne({where: {id: id}, include: 'rooms'}).subscribe((profile: Hotel) => {
      this.profile = profile;
      this.profile_new = JSON.parse(JSON.stringify(this.profile)); // YAAS deep copy
      this.readOnly = this.profile.id !== this.userApi.getCachedCurrent().hotelId;
      this.sysAdmin = this.userApi.getCachedCurrent().type === 'sysAdmin';
      this.rate =  Math.ceil(profile.rating);
    });
  }

  onDeleteClick() {
    this.hotelService.deleteById(this.profile.id).subscribe(() =>{
      this.toastr.success(this.profile.name, 'Hotel deleted')
    }, (err) => {
      this.toastr.error(err.message, 'ERROR')
    })
  }

  onSaveClick() {
    this.hotelService.updateConcurrentSafe(this.profile_new).subscribe(
      () => {
        this.toastr.success(this.profile_new.name, 'Hotel updated')
      }, (err) => {
        this.toastr.error(err.message, 'ERROR')
      });
    this.location.back();
  }

  goBack() {
    this.location.back();
  }

  addServClicked() {
    this.router.navigateByUrl('/additionalservices/' + this.profile_new.id);
  }

  makeReservationClicked() {
    this.router.navigateByUrl('roomreservations/' + this.profile_new.id);
  }

}
