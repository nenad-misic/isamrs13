import { Component, OnInit } from '@angular/core';
import {HotelService} from '../services/hotel.service';
import {Hotel} from '../shared/hotel';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hotel-add-form',
  templateUrl: './hotel-add-form.component.html',
  styleUrls: ['./hotel-add-form.component.scss']
})
export class HotelAddFormComponent implements OnInit {

  new_hotel: Hotel;

  constructor(private service: HotelService,
              private location: Location) { }

  ngOnInit() {
    this.new_hotel = new Hotel();
  }


  addHotel() {
    this.service.addHotel(this.new_hotel).subscribe((status) => console.log(status));
    this.new_hotel = new Hotel();

  }

}
