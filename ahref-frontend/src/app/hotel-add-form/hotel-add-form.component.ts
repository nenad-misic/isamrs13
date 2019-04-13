import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig, LoggedUserApi} from '../shared/sdk';
@Component({
  selector: 'app-hotel-add-form',
  templateUrl: './hotel-add-form.component.html',
  styleUrls: ['./hotel-add-form.component.scss']
})
export class HotelAddFormComponent implements OnInit {

  new_hotel: Hotel;
  type: string;
  constructor(private service: HotelApi,
              private location: Location,
              private userTypeService: LoggedUserApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if( this.userTypeService.getCachedCurrent() ){
      this.type = this.userTypeService.getCachedCurrent().type;
    }else{
      this.type = '';
    }
    this.new_hotel = new Hotel();
    this.new_hotel.rating = 0;
    this.new_hotel.numOfRates = 0;
  }


  addHotel() {
    this.service.create(this.new_hotel).subscribe((hotel: Hotel) => { if (!hotel) { console.log(status); }});
    this.new_hotel = new Hotel();

  }

}
