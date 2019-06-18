import {Component, Inject, Input, OnInit} from '@angular/core';
import {Room} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-room-profile',
  templateUrl: './room-profile.component.html',
  styleUrls: ['./room-profile.component.scss']
})
export class RoomProfileComponent implements OnInit {

  @Input()
  room: Room;
  rate;

  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.rate = Math.ceil(this.room.rating);
  }

}
