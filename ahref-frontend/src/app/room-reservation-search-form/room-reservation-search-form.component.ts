import {Component, Inject, Input, OnInit} from '@angular/core';
import {HotelApi, HPriceListApi, RoomApi} from "../shared/sdk/services/custom";
import {DataService} from "../services/data.service";
import {CarReservationDataService} from "../services/car-reservation-data.service";
import {Hotel, HPriceList, HPriceListItem, LoopBackConfig, Room} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {RoomDataServiceService} from "../services/room-data-service.service";
import {RoomReservationDataService} from "../services/room-reservation-data.service";
import {RoomReservationInfo} from "../shared/room-reservation-info";

@Component({
  selector: 'app-room-reservation-search-form',
  templateUrl: './room-reservation-search-form.component.html',
  styleUrls: ['./room-reservation-search-form.component.scss']
})
export class RoomReservationSearchFormComponent implements OnInit {

  startDate: Date = new Date();
  endDate: Date = new Date();
  numberOfGuests: number  = 0;
  lowPrice: number = 0;
  highPrice: number = 0;
  requiredRooms: number[];


  @Input()
  hotelId: string;

  constructor(private roomApi: RoomApi,
              private data: RoomDataServiceService,
              private roomReservationData: RoomReservationDataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch() {
    this.requiredRooms = [];
    this.requiredRooms.push(this.numberOfGuests);
    this.roomApi.getMatching(this.hotelId,
      this.startDate,
      this.endDate,
      this.numberOfGuests,
      this.lowPrice,
      this.highPrice,
      { rooms: this.requiredRooms}).subscribe((rooms) => {
        this.data.changeSearchParams(rooms.retval);
        var info = new RoomReservationInfo();
        info.startDate = this.startDate;
        info.endDate = this.endDate;
        this.roomReservationData.changeSearchParams(info);
    });
  }
}
