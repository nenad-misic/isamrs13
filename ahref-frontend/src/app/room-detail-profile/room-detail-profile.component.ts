import {Component, Inject, OnInit} from '@angular/core';
import {DatePrice, Hotel, Room} from '../shared/sdk/models';
import {DatePriceApi, HotelApi, LoggedUserApi, RoomApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-room-detail-profile',
  templateUrl: './room-detail-profile.component.html',
  styleUrls: ['./room-detail-profile.component.scss']
})
export class RoomDetailProfileComponent implements OnInit {

  room: Room;
  readOnly: boolean;
  new_price: DatePrice;
  new_date: string;
  errmsg: string;

  constructor( private route: ActivatedRoute,
               private location: Location,
               private loggedUserApi: LoggedUserApi,
               private hotelApi: HotelApi,
               private roomApi: RoomApi,
               private priceApi: DatePriceApi,
               @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.new_price = new DatePrice();
    this.roomApi.findById(id, {include: 'datePrices'}).subscribe((room: Room) => {
      this.room = room;
      this.hotelApi.findById(room.hotelId).subscribe((hotel: Hotel) => {
        if (hotel.id === this.loggedUserApi.getCachedCurrent().hotelId) {
          this.readOnly = false;
        } else {
          this.readOnly = true;
        }
      });
    });
  }

  addPrice() {
    this.new_price.roomId = this.room.id;
    console.log(this.new_date);
    this.new_price.startDate = new Date(this.new_date).getTime();
    this.roomApi.createDatePrices(this.room.id, this.new_price).subscribe(() => {
      this.new_price = new DatePrice();
    });
  }

  onDeleteClick() {
    this.roomApi.deleteById(this.room.id).subscribe(() => {
      this.errmsg='';
    });
    this.location.back();
  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.roomApi.updateAttributes(this.room.id, this.room).subscribe((returned: Room) => { this.errmsg = ''; }, (err) => {this.errmsg = err;});
    this.location.back();
  }

  getDate(milliseconds: number) {
    return new Date(milliseconds);
  }

  deletePrice(price: DatePrice) {
    this.priceApi.deleteById(price.id).subscribe(() => {});
  }
}
