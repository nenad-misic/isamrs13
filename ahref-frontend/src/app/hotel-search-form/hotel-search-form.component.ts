import {Component, Inject, OnInit} from '@angular/core';
import {Car, Destination, Hotel, MCarReservation, RACService, Room} from '../shared/sdk/models';
import {HotelDataService} from '../services/hotel-data.service';
import {DestinationApi, HotelApi, MCarReservationApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {MRoomReservationApi} from '../shared/sdk/services/custom/MRoomReservation';
import {MRoomReservation} from '../shared/sdk/models/MRoomReservation';

@Component({
  selector: 'app-hotel-search-form',
  templateUrl: './hotel-search-form.component.html',
  styleUrls: ['./hotel-search-form.component.scss']
})
export class HotelSearchFormComponent implements OnInit {

  name = '';
  country = '';
  hotelname = '';
  startDate: Date;
  endDate: Date;
  searchResult: Hotel[] = [];

  constructor(private hotelService: HotelApi,
              private data: HotelDataService,
              private destinationApi: DestinationApi,
              private mRoomReservationApi: MRoomReservationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch() {
    if (!this.startDate || !this.endDate) { return; }
    const filter = {};
    if (this.name) {
      // @ts-ignore
      filter.name = this.name;
    }
    if (this.country) {
      // @ts-ignore
      filter.country = this.country;
    }
    this.destinationApi.find({where: filter}).subscribe((searchResult: Destination[]) => {
      this.searchResult = [];
      searchResult.forEach((element) => {
        this.hotelService.find({where: {destinationId: element.id}, include: 'rooms'}).subscribe((hotelSearchResult: Hotel[]) => {
          hotelSearchResult.forEach((element1) => {
              if (this.hotelname) {
                if (this.hotelname === element1.name) {
                  element1.rooms.forEach((room: Room) => {
                    this.mRoomReservationApi.find({where : {roomId: room.id}}).subscribe((data: MRoomReservation[]) => {
                      if (!data) { this.searchResult.push(element1); } else {
                        let pushable = true;
                        data.forEach((res) => {
                          if ((res.startDate >= this.startDate && res.startDate <= this.endDate) ||
                            (this.startDate >= res.startDate && this.startDate <= res.endDate)) {
                            pushable = false;
                          }
                        });

                        if (pushable && this.searchResult.indexOf(element1) === -1) { this.searchResult.push(element1); }
                      }
                    });

                  });
                }
              } else {
                element1.rooms.forEach((room: Room) => {
                  this.mRoomReservationApi.find({where : {roomId: room.id}}).subscribe((data: MRoomReservation[]) => {
                    if (!data) { this.searchResult.push(element1); } else {
                      let pushable = true;
                      data.forEach((res) => {
                        if ((res.startDate >= this.startDate && res.startDate <= this.endDate) ||
                          (this.startDate >= res.startDate && this.startDate <= res.endDate)) {
                          pushable = false;
                        }
                      });

                      if (pushable && this.searchResult.indexOf(element1) === -1) { this.searchResult.push(element1); }
                    }
                  });

                });
              }
          });
        });
      });
      this.data.changeSearchParams(this.searchResult);
    });
  }

  showAll(): void {
    this.hotelService.find({limit: 10, skip: 0}).subscribe((result: Hotel[]) => {
      this.searchResult = result;
      this.data.changeSearchParams(this.searchResult);
    });
  }
}
