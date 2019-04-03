import {Component, Inject, OnInit} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { API_VERSION } from '../shared/baseurl';
import {Airline, LoopBackConfig, RACService, RACServiceApi} from '../shared/sdk';
@Component({
  selector: 'app-rentacar-detail-profile',
  templateUrl: './rentacar-detail-profile.component.html',
  styleUrls: ['./rentacar-detail-profile.component.scss']
})
export class RentacarDetailProfileComponent implements OnInit {

  profile: RACService;
  profile_new: RACService;

  constructor(private rentacarService: RACServiceApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.rentacarService.findOne({where: {id: id}}).subscribe((service: RACService) => {
        this.profile = service;
        this.profile_new = new RACService();
        this.profile_new.id = this.profile.id;
        this.profile_new.name = this.profile.name;
        this.profile_new.address = this.profile.address;
        this.profile_new.description = this.profile.description;
        this.profile_new.latitude = this.profile.latitude;
        this.profile_new.longitude = this.profile.longitude;
        this.profile_new.rating = this.profile.rating;
        this.profile_new.numOfRates = this.profile.numOfRates;

      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.rentacarService.updateAttributes(this.profile.id, this.profile_new).subscribe((returned: RACService) => { if (!returned) {console.log(status); }});
    this.location.back();
  }
}
