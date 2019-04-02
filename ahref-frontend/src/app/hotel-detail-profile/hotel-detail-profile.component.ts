import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import { HotelApi, LoopBackConfig} from '../shared/sdk';
import { Hotel } from '../shared/sdk/models';
@Component({
  selector: 'app-hotel-detail-profile',
  templateUrl: './hotel-detail-profile.component.html',
  styleUrls: ['./hotel-detail-profile.component.scss']
})
export class HotelDetailProfileComponent implements OnInit {

  profile_new: Hotel;
  profile: Hotel;

  constructor(private hotelService: HotelApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelService.findOne({where: {id:id}}).subscribe((profile: Hotel) => {
      this.profile = profile;
      this.profile_new = new Hotel();
      this.profile_new.id = profile.id;
      this.profile_new.name = profile.name;
      this.profile_new.description = profile.description;
      this.profile_new.address = profile.address;
      this.profile_new.latitude = profile.latitude;
      this.profile_new.longitude = profile.longitude;
      this.profile_new.rating = profile.rating;
      this.profile_new.numOfRates = profile.numOfRates;
      this.profile_new.destinationId = profile.destinationId;
    });
  }

  onSaveClick() {
    this.hotelService.updateAttributes(this.profile.id, this.profile_new).subscribe((returned: Hotel) => { if (!returned) {console.log(status); }});
    this.location.back();
  }

  goBack() {
    this.location.back();
  }

}
