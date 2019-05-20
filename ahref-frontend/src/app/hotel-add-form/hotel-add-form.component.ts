import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';

import { API_VERSION } from '../shared/baseurl';
import {Hotel, HotelApi, LoopBackConfig, LoggedUserApi, HPriceList, LoggedUser} from '../shared/sdk';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-hotel-add-form',
  templateUrl: './hotel-add-form.component.html',
  styleUrls: ['./hotel-add-form.component.scss']
})
export class HotelAddFormComponent implements OnInit {

  new_hotel: Hotel;
  type: string;
  email: string;

  constructor(private service: HotelApi,
              private location: Location,
              private userTypeService: LoggedUserApi,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if( this.userTypeService.getCachedCurrent() ){
      this.type = this.userTypeService.getCachedCurrent().type;
    }else{
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
          this.new_hotel.loggedUserId = user.id;
          this.userTypeService.createHotel(this.userTypeService.getCachedCurrent().id, this.new_hotel).subscribe((hotel: Hotel) => {
            if (!hotel) console.log(status);

            this.toastr.success(this.new_hotel.name, 'Hotel added');
            this.new_hotel = hotel;
            const priceList: HPriceList = new HPriceList();
            priceList.hotelId = this.new_hotel.id;
            this.service.createPriceList(this.new_hotel.id, priceList).subscribe((a) => {
                console.log(a);
                this.new_hotel = new Hotel();
              }, (err) => {
                this.toastr.error(err.message, 'ERROR - 57');
            });

          }, (err) => {
            this.toastr.error(err.message, 'ERROR - 65');
            this.new_hotel = new Hotel();
          });
        }
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
      this.new_hotel = new Hotel();
    });

  }

}
