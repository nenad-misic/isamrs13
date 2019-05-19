import {Component, Inject, Input, OnInit} from '@angular/core';
import {Hotel, RACService} from '../shared/sdk/models';
import {DestinationApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-hotel-profile',
  templateUrl: './hotel-profile.component.html',
  styleUrls: ['./hotel-profile.component.scss']
})
export class HotelProfileComponent implements OnInit {


  @Input()
  profile: Hotel;

  destination = {name: '', country: ''};

  rate = Math.floor(Math.random() * 4) + 1;
  picturePath: string;

  constructor(@Inject('baseURL') private baseURL,
              private dapi: DestinationApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    // @ts-ignore
    this.dapi.findOne({where: {id: this.profile.destinationId}}).subscribe((dest) => this.destination = dest );
    this.picturePath = this.baseURL + '/hotelImages/' + this.profile.id + '.jpg';
  }

  changePicPath(): void {
    this.picturePath = this.baseURL + '/hotelImages/' + 'missing.png';
  }
}
