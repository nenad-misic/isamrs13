import {Component, Inject, OnInit} from '@angular/core';

import { API_VERSION } from '../shared/baseurl';
import {Airline, AirlineApi, LoopBackConfig} from '../shared/sdk';
import {AirlineserviceDataService} from '../services/airlineservice-data.service';

@Component({
  selector: 'app-airline-section',
  templateUrl: './airline-section.component.html',
  styleUrls: ['./airline-section.component.scss']
})
export class AirlineSectionComponent implements OnInit {

  airlines: Airline[];

  constructor(private airlineService: AirlineApi,
              @Inject('baseURL') private baseURL,
              private data: AirlineserviceDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.airlines = searchList );
  }

}
