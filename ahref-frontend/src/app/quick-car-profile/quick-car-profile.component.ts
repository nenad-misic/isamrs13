import {Component, Inject, Input, OnInit} from '@angular/core';
import {QuickCarReservation} from '../shared/sdk/models';
import {MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-quick-car-profile',
  templateUrl: './quick-car-profile.component.html',
  styleUrls: ['./quick-car-profile.component.scss']
})
export class QuickCarProfileComponent implements OnInit {

  @Input()
  qcr: QuickCarReservation;

  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }


  ngOnInit() {
  }

}
