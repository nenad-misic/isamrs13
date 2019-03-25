import { Component, OnInit } from '@angular/core';
import {Hotel} from '../shared/hotel';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HotelService} from '../services/hotel.service';

@Component({
  selector: 'app-hotel-detail-profile',
  templateUrl: './hotel-detail-profile.component.html',
  styleUrls: ['./hotel-detail-profile.component.scss']
})
export class HotelDetailProfileComponent implements OnInit {

  profile_new: Hotel;
  profile: Hotel;

  constructor(private hotelService: HotelService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelService.getHotel(id).subscribe((profile) => {
      this.profile = profile;
      this.profile_new = new Hotel();
      this.profile_new.id = profile.id;
      this.profile_new.name = profile.name;
      this.profile_new.description = profile.description;
      this.profile_new.address = profile.address;
    });
  }

  onSaveClick() {
    this.hotelService.editHotel(this.profile.id, this.profile_new).subscribe((status) => console.log(status));
    this.location.back();
  }

  goBack() {
    this.location.back();
  }

}
