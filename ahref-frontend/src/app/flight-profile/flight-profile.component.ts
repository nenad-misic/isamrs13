import {Component, Inject, Input, OnInit} from '@angular/core';
import {Flight} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-flight-profile',
  templateUrl: './flight-profile.component.html',
  styleUrls: ['./flight-profile.component.scss']
})
export class FlightProfileComponent implements OnInit {

  @Input()
  profile: Flight;

  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);}

  ngOnInit() {
  }

}
