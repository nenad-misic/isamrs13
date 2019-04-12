import {Component, Inject, OnInit} from '@angular/core';
import { RACService} from '../shared/sdk/models';
import { RACServiceApi} from '../shared/sdk/services/custom';
import { API_VERSION } from '../shared/baseurl';
import {LoopBackConfig} from '../shared/sdk';
import {RacserviceDataService} from '../services/racservice-data.service';

@Component({
  selector: 'app-rentacar-section',
  templateUrl: './rentacar-section.component.html',
  styleUrls: ['./rentacar-section.component.scss']
})
export class RentacarSectionComponent implements OnInit {

  racservices: RACService[];

  constructor(private rentacarService: RACServiceApi,
              @Inject('baseURL') private baseURL,
              private data: RacserviceDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.racservices = searchList );
  }

}
