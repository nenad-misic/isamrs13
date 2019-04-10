import {Component, Inject, OnInit} from '@angular/core';
import { RACService} from '../shared/sdk/models';
import { RACServiceApi} from '../shared/sdk/services/custom';
import { API_VERSION } from '../shared/baseurl';
import {LoopBackConfig} from '../shared/sdk';

@Component({
  selector: 'app-rentacar-section',
  templateUrl: './rentacar-section.component.html',
  styleUrls: ['./rentacar-section.component.scss']
})
export class RentacarSectionComponent implements OnInit {

  racservices: RACService[];

  constructor(private rentacarService: RACServiceApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
      this.rentacarService.find().subscribe((racservices: RACService[]) => this.racservices = racservices);
  }

}
