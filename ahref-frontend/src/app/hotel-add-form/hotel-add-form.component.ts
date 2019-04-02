import {Component, Inject, OnInit} from '@angular/core';
import {HotelService} from '../services/hotel.service';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig} from '../shared/sdk';
@Component({
  selector: 'app-hotel-add-form',
  templateUrl: './hotel-add-form.component.html',
  styleUrls: ['./hotel-add-form.component.scss']
})
export class HotelAddFormComponent implements OnInit {

  new_hotel: Hotel;

  constructor(private service: HotelApi,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.new_hotel = new Hotel();
  }


  addHotel() {
    this.service.create(this.new_hotel).subscribe((hotel: Hotel) => { if (!hotel) { console.log(status); }});
    this.new_hotel = new Hotel();

  }

}
