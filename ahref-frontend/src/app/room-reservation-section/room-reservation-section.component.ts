import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {Hotel, HotelApi, HPriceList, HPriceListApi, HPriceListItem, LoopBackConfig, Room} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {RoomDataServiceService} from "../services/room-data-service.service";
import {RoomReservationDataService} from "../services/room-reservation-data.service";
import {RoomReservationInfo} from "../shared/room-reservation-info";

@Component({
  selector: 'app-room-reservation-section',
  templateUrl: './room-reservation-section.component.html',
  styleUrls: ['./room-reservation-section.component.scss']
})
export class RoomReservationSectionComponent implements OnInit {

  hotelId: string;
  rooms: Room[] = [];
  info: RoomReservationInfo;

  aservices: HPriceListItem[] = [];
  chosenAservices: HPriceListItem[] = [];

  constructor(private hotelApi: HotelApi,
              private aservicesApi: HPriceListApi,
              private route: ActivatedRoute,
              private location: Location,
              private data: RoomDataServiceService,
              private roomReservationData: RoomReservationDataService,
              @Inject('baseURL') private baseURL,) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params['hotelId'];
    this.data.currentSearchParams.subscribe((r: Room[]) => this.rooms = r);
    this.hotelApi.findById(this.hotelId, {include: 'priceList'}).subscribe((hotel: Hotel) => {
      this.aservicesApi.findById(hotel.priceList.id, {include: 'priceListItems'}).subscribe((items: HPriceList) => {
        this.aservices = items.priceListItems;
      })
    });
    this.roomReservationData.currentSearchParams.subscribe((info: RoomReservationInfo)=>{
      this.info = info;
    })
  }

  checkClicked(item: HPriceListItem) {
    if (this.chosenAservices.includes(item)) {
      const idx = this.chosenAservices.indexOf(item);
      this.chosenAservices.splice(idx, 1);
    } else {
      this.chosenAservices.push(item);
    }
  }

  onRoomClicked() {
    this.info.additionalServices = JSON.parse(JSON.stringify(this.aservices));
    this.roomReservationData.changeSearchParams(this.info);
  }
}
