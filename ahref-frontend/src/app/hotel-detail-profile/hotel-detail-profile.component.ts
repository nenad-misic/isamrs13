import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {HotelApi, LoggedUserApi, LoopBackConfig, Room, RoomApi} from '../shared/sdk';
import { Hotel } from '../shared/sdk/models';
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

  constructor(private hotelService: HotelApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi,
              private roomApi: RoomApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelService.findOne({where: {id: id}, include: 'rooms'}).subscribe((profile: Hotel) => {
      this.profile = profile;
      this.profile_new = JSON.parse(JSON.stringify(this.profile)); // YAAS deep copy
      if (this.profile.id === this.userApi.getCachedCurrent().hotelId) {
        this.readOnly = true;
      } else {
        this.readOnly = false;
      }
    });
  }

  onSaveClick() {
    this.hotelService.updateAttributes(this.profile.id, this.profile_new).subscribe(
      (returned: Hotel) => { if (!returned) {console.log(status); }});
    this.location.back();
  }

  goBack() {
    this.location.back();
  }

}
