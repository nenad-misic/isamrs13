import {Component, Inject, OnInit} from '@angular/core';
import {DatePrice, Hotel, Room} from '../shared/sdk/models';
import {DatePriceApi, HotelApi, LoggedUserApi, RoomApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import { ToastrService } from 'ngx-toastr';

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
  rate;

  constructor( private route: ActivatedRoute,
               private location: Location,
               private loggedUserApi: LoggedUserApi,
               private hotelApi: HotelApi,
               private roomApi: RoomApi,
               private priceApi: DatePriceApi,
               private toastr: ToastrService,
               @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.new_price = new DatePrice();
    this.roomApi.findById(id, {include: 'datePrices'}).subscribe((room: Room) => {
      this.room = room;
      this.rate = Math.ceil(room.rating);
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
    this.roomApi.createDatePrices(this.room.id, this.new_price).subscribe((param) => {
      this.toastr.success(this.new_price.startDate + ": " + this.new_price.price, 'Price added');
      this.new_price = new DatePrice();
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  onDeleteClick() {
    this.roomApi.deleteById(this.room.id).subscribe((param) => {
      this.toastr.success(this.new_price.startDate + ": " + this.new_price.price, 'Room deleted');
      this.location.back();
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.roomApi.updateAttributes(this.room.id, this.room).subscribe((returned: Room) => {
      this.toastr.success('Room updated')
      }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
    this.location.back();
  }

  getDate(milliseconds: number) {
    return new Date(milliseconds);
  }

  deletePrice(price: DatePrice) {
    this.priceApi.deleteById(price.id).subscribe(() => {
      this.toastr.success(price.startDate + ": " + price.price, 'Price deleted');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
