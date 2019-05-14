import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Hotel} from "../shared/sdk/models";
import {HotelApi} from "../shared/sdk/services/custom";

@Component({
  selector: 'app-quick-hotel-section',
  templateUrl: './quick-hotel-section.component.html',
  styleUrls: ['./quick-hotel-section.component.scss']
})
export class QuickHotelSectionComponent implements OnInit {

  hotel: Hotel = new Hotel();
  constructor(private route: ActivatedRoute,
              private hotelApi: HotelApi) { }

  ngOnInit() {
    var hotelId = this.route.params['hotelId'];
    this.hotelApi.findOne({where: {id: hotelId}}).subscribe((hotel: Hotel) => {
      this.hotel = hotel;
    });
  }
}
