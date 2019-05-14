import {Component, Inject, Input, OnInit} from '@angular/core';
import {CarApi, DatePrice, Hotel, HotelApi, HPriceList, LoggedUserApi, LoopBackConfig, Room, RoomApi} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ToastrService} from "ngx-toastr";

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
              private roomApi: RoomApi,
              private toastr: ToastrService,
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
    this.new_room.datePrices = [];
    this.hotelApi.createRooms(this.hotel.id, this.new_room).subscribe((room) => {
      this.toastr.success('Beds: ' + this.new_room.numOfBeds, 'Room added');
      this.new_room = new Room();
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
      this.new_room = new Room();
    });
  }

  addPrice() {
    this.new_room.datePrices.push(JSON.parse(JSON.stringify(this.new_price)));
  }

}
