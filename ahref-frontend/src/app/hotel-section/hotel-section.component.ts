import {Component, Inject, OnInit} from '@angular/core';
import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig, RACService, RACServiceApi} from '../shared/sdk';
import {HotelDataService} from '../services/hotel-data.service';
import {RacserviceDataService} from '../services/racservice-data.service';
@Component({
  selector: 'app-hotel-section',
  templateUrl: './hotel-section.component.html',
  styleUrls: ['./hotel-section.component.scss']
})
export class HotelSectionComponent implements OnInit {

  hotels: Hotel[];

  cnt = 0;
  currSkip = 10;
  shownAll = true;
  constructor(private hotelApi: HotelApi,
              @Inject('baseURL') private baseURL,
              private data: HotelDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.hotels = searchList );

    this.hotelApi.count({}).subscribe((cnt) => {
      this.cnt = cnt.count;
    });
  }

  loadMore() {
    this.hotelApi.find({limit: 10, skip: this.currSkip}).subscribe((result: Hotel[]) => {
      result.forEach((res) => {
        this.hotels.push(res);
      });
      this.currSkip += 10;
    });
  }
}
