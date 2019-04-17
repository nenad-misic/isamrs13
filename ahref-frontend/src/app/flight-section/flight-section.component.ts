import {Component, Inject, OnInit} from '@angular/core';
import {Flight} from '../shared/sdk/models';
import {FlightApi, RACServiceApi} from '../shared/sdk/services/custom';
import {RacserviceDataService} from '../services/racservice-data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {FlightDataService} from '../services/flight-data.service';

@Component({
  selector: 'app-flight-section',
  templateUrl: './flight-section.component.html',
  styleUrls: ['./flight-section.component.scss']
})
export class FlightSectionComponent implements OnInit {

  flights: Flight[];

  constructor(private flightService: FlightApi,
              @Inject('baseURL') private baseURL,
              private data: FlightDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.flights = searchList );
  }


}
