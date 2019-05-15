import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Hotel, QuickRoomReservation} from "../shared/sdk/models";
import {HotelApi, MRoomReservationApi, QuickRoomReservationApi} from "../shared/sdk/services/custom";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-quick-hotel-section',
  templateUrl: './quick-hotel-section.component.html',
  styleUrls: ['./quick-hotel-section.component.scss']
})
export class QuickHotelSectionComponent implements OnInit {

  hotel: Hotel = new Hotel();
  reservations: QuickRoomReservation[] = [];

  displayedColumnsR: string[] = ['timeStamp', 'startDate', 'endDate', 'room', 'delete'];

  constructor(private route: ActivatedRoute,
              private hotelApi: HotelApi,
              private mReservationApi: MRoomReservationApi,
              private quickReservationApi: QuickRoomReservationApi,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    var hotelId = this.route.params['hotelId'];
    this.hotelApi.findOne({where: {id: hotelId}, include: [{quickRoomReservations: 'mRoomReservation'}, 'rooms']}).subscribe((hotel: Hotel) => {
      this.hotel = hotel;
      this.reservations = hotel.quickRoomReservations;
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  deleteReservationClicked(reservation: QuickRoomReservation) {
    this.mReservationApi.deleteById(reservation.mRoomReservation.id).subscribe(()=>{
      this.quickReservationApi.deleteById(reservation.id).subscribe(()=>{
        this.toastr.success('Quick reservation deleted');
        this.hotelApi.findOne({where: {id: this.hotel.id}, include: [{quickRoomReservations: 'mRoomReservation'}, 'rooms']}).subscribe((hotel: Hotel) => {
          this.hotel = hotel;
          this.reservations = hotel.quickRoomReservations;
          this.toastr.success('Reservation deleted');
        }, (err) => {
          this.toastr.error(err.message, 'ERROR');
        });
      }, (err) => {
        this.toastr.error(err.message, 'ERROR');
      })
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
