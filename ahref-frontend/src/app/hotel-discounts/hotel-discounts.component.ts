import {Component, Inject, OnInit} from '@angular/core';
import {HotelApi, HotelDiscountApi, LoggedUserApi} from "../shared/sdk/services/custom";
import {ToastrService} from "ngx-toastr";
import {Hotel, HotelDiscount, LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hotel-discounts',
  templateUrl: './hotel-discounts.component.html',
  styleUrls: ['./hotel-discounts.component.scss']
})
export class HotelDiscountsComponent implements OnInit {


  hotel: Hotel;
  new_discount: HotelDiscount;
  readOnly: boolean;

  constructor(private hotelApi: HotelApi,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL,
              private route: ActivatedRoute,
              private userApi: LoggedUserApi,
              private hotelDiscountApi: HotelDiscountApi,
              private location: Location) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelApi.findById(id, {include: 'hotelDiscounts'}).subscribe((hotel: Hotel) => {
      this.hotel = hotel;
      this.readOnly = this.userApi.getCachedCurrent().hotelId != hotel.id;
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
    this.new_discount = new HotelDiscount();
  }

  onAddDiscount() {
    this.hotelApi.createHotelDiscounts(this.hotel.id, this.new_discount).subscribe(() => {
      this.hotel.hotelDiscounts.push(this.new_discount);
      this.new_discount = new HotelDiscount();
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
  }

  onDeleteDiscount(hd: HotelDiscount) {
    this.hotelDiscountApi.deleteById(hd.id).subscribe(() => {
      this.hotel.hotelDiscounts.splice(this.hotel.hotelDiscounts.indexOf(hd), 1);
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
  }

  onBack() {
    this.location.back();
  }

}
