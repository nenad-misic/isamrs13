import {Component, Inject, Input, OnInit} from '@angular/core';
import {Car} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.scss']
})
export class CarProfileComponent implements OnInit {

  @Input()
  profile: Car;
  rate = Math.floor(Math.random() * 4) + 1;
  picturePath: string;
  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    this.picturePath = this.baseURL + '/carImages/' + this.profile.id + '.jpg';
  }

  changePicPath(): void {
    this.picturePath = this.baseURL + '/carImages/' + 'missing.png';
  }

}
