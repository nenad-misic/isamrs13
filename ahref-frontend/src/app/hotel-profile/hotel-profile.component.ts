import {Component, Input, OnInit} from '@angular/core';
import {Hotel} from '../shared/sdk/models';

@Component({
  selector: 'app-hotel-profile',
  templateUrl: './hotel-profile.component.html',
  styleUrls: ['./hotel-profile.component.scss']
})
export class HotelProfileComponent implements OnInit {

  @Input()
  profile: Hotel;

  constructor() { }

  ngOnInit() {
  }

}
