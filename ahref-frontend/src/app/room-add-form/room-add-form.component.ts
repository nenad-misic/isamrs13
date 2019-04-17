import {Component, Inject, Input, OnInit} from '@angular/core';
import {CarApi, DatePrice, Hotel, HotelApi, LoggedUserApi, LoopBackConfig, Room} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-room-add-form',
  templateUrl: './room-add-form.component.html',
  styleUrls: ['./room-add-form.component.scss']
})
export class RoomAddFormComponent implements OnInit {
  @Input()
  hotel: Hotel;
  new_room: Room;
  errmsg: string;
  type: string;
  new_price: DatePrice;

  constructor(private carApi: CarApi,
              private loggedUserApi: LoggedUserApi,
              private hotelApi: HotelApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.new_room = new Room();
    this.errmsg = '';
    this.new_price = new DatePrice();
  }

  ngOnInit() {
    this.type = this.loggedUserApi.getCachedCurrent().type;
  }

  addRoom() {
    this.new_room.hotelId = this.hotel.id;
    this.new_room.rating = 0;
    this.new_room.numOfRates = 0;
    this.hotelApi.createRooms(this.hotel.id, this.new_room).subscribe((room) => {
      this.errmsg = '';
    }, (err) => {
      this.errmsg = err;
    });
    this.new_room = new Room();
  }

  addPrice() {
    this.new_room.datePrices.push(JSON.parse(JSON.stringify(this.new_price)));
  }

}
