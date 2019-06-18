import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {
  Hotel,
  HotelApi,
  LoopBackConfig,
  LoggedUserApi,
  HPriceList,
  LoggedUser,
  Destination,
  RPriceListApi, DestinationApi
} from '../shared/sdk';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-add-form',
  templateUrl: './hotel-add-form.component.html',
  styleUrls: ['./hotel-add-form.component.scss']
})
export class HotelAddFormComponent implements OnInit {

  new_hotel;
  type: string;
  email: string;
  city: string;

  constructor(private service: HotelApi,
              private location: Location,
              private userTypeService: LoggedUserApi,
              private toastr: ToastrService,
              private hotelService: HotelApi,
              private destinationApi: DestinationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if (this.userTypeService.getCachedCurrent()) {
      this.type = this.userTypeService.getCachedCurrent().type;
    } else {
      this.type = '';
    }
    this.new_hotel = new Hotel();
    this.new_hotel.rating = 0;
    this.new_hotel.numOfRates = 0;
  }


  addHotel() {
    this.userTypeService.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user) {
        if (user.type === 'hotelAdmin' && !user.hotel) {
          this.destinationApi.findOne({where: {name: this.city}}).subscribe((destination: Destination) => {
            if (destination) {
              this.new_hotel.destinationId = destination.id;
            } else {
              this.toastr.error("City does not exist");
            }
            this.new_hotel.loggedUserId = user.id;
            this.hotelService.create(this.new_hotel).subscribe((hotel: Hotel) => {
              this.toastr.success(hotel.name, 'Hotel added');
              this.new_hotel = new Hotel();
            }, (err) => {
              this.toastr.error(err.message, 'ERROR');
            });
          }, (err) => {
            this.toastr.error(err.message, 'ERROR');
          });
        } else {
          this.toastr.error("User already has a hotel");
        }
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
      this.new_hotel = new Hotel();
    });

  }

}
