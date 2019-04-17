import {Component, Inject, OnInit} from '@angular/core';
import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig} from '../shared/sdk';
import {HotelDataService} from '../services/hotel-data.service';
@Component({
  selector: 'app-hotel-section',
  templateUrl: './hotel-section.component.html',
  styleUrls: ['./hotel-section.component.scss']
})
export class HotelSectionComponent implements OnInit {

  hotels: Hotel[];

  constructor(private hotelService: HotelApi,
              @Inject('baseURL') private baseURL,
              private data: HotelDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(serachList => this.hotels = serachList);
  }

}
