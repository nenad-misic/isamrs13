import {Component, Inject, OnInit} from '@angular/core';
import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig} from '../shared/sdk';
@Component({
  selector: 'app-hotel-section',
  templateUrl: './hotel-section.component.html',
  styleUrls: ['./hotel-section.component.scss']
})
export class HotelSectionComponent implements OnInit {

  hotels: Hotel[];

  constructor(private hotelService: HotelApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.hotelService.find().subscribe((hotels: Hotel[]) => this.hotels = hotels);
  }

}
