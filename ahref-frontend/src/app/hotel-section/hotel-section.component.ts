import { Component, OnInit } from '@angular/core';
import {Hotel} from '../shared/hotel';
import {HotelService} from '../services/hotel.service';

@Component({
  selector: 'app-hotel-section',
  templateUrl: './hotel-section.component.html',
  styleUrls: ['./hotel-section.component.scss']
})
export class HotelSectionComponent implements OnInit {

  hotels: Hotel[];

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    this.hotelService.getHotels().subscribe((hotels) => this.hotels = hotels);
  }

}
