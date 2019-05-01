import {Component, Inject, Input, OnInit} from '@angular/core';
import {Car, Destination, MCarReservation, RACService, Room} from '../shared/sdk/models';
import {DestinationApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {RacserviceDataService} from '../services/racservice-data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-room-search',
  templateUrl: './room-search.component.html',
  styleUrls: ['./room-search.component.scss']
})
export class RoomSearchComponent implements OnInit {

  @Input()
  hotelid: string;

  startDate: Date;
  numOfNights: number;
  roomCategories = ['Jednokrevetna', 'Dvokrevetna', 'Trokrevetna', 'Duplex', 'Lux apartman', 'Sestokrevetna'];
  neededRooms: { [id: string]: number; } = {};

  searchResult: Room[] = [];
  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    // Fetch room categories
    this.roomCategories.forEach((roomCat) => {
      this.neededRooms[roomCat] = 0;
    });
  }

  showAll(): void {
    // Search for all rooms of the hotel, and pass them to service for rendering
    return;
  }
  doSearch(): void {
    // Search for specific rooms of the hotel that meet query criteria, and pass them to service for rendering
    // Shown rooms should be available from startDate and in the next {{numOfNights}} days
    // If neededRooms[category] == 0, room shouldn't be shown
    return;
  }
}
