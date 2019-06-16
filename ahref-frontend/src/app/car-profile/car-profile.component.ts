import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Car} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.scss']
})
export class CarProfileComponent implements OnInit, OnChanges {

  @Input()
  profile: Car;
  rate;
  picturePath: string;
  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    this.rate = Math.ceil(this.profile.rating);
  }

  changePicPath(): void {
    this.picturePath = this.baseURL + '/carImages/' + 'missing.png';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.picturePath = this.baseURL + '/carImages/' + this.profile.id + '.jpg';
  }

}
