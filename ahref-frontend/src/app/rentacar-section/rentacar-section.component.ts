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
  cnt = 0;
  currSkip = 10;
  shownAll = true;
  constructor(private rentacarService: RACServiceApi,
              @Inject('baseURL') private baseURL,
              private data: RacserviceDataService) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.racservices = searchList );

    this.rentacarService.count({}).subscribe((cnt) => {
      this.cnt = cnt.count;
    });
  }

  loadMore() {
    this.rentacarService.find({limit: 10, skip: this.currSkip}).subscribe((result: RACService[]) => {
      result.forEach((res) => {
        this.racservices.push(res);
      });
    this.currSkip += 10;
  });
  }

}
