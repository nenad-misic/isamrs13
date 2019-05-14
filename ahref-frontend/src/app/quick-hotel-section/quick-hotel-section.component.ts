import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Hotel} from "../shared/sdk/models";
import {HotelApi} from "../shared/sdk/services/custom";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";

@Component({
  selector: 'app-quick-hotel-section',
  templateUrl: './quick-hotel-section.component.html',
  styleUrls: ['./quick-hotel-section.component.scss']
})
export class QuickHotelSectionComponent implements OnInit {

  hotel: Hotel = new Hotel();
  constructor(private route: ActivatedRoute,
              private hotelApi: HotelApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    var hotelId = this.route.params['hotelId'];
    this.hotelApi.findOne({where: {id: hotelId}}).subscribe((hotel: Hotel) => {
      this.hotel = hotel;
    });
  }
}
