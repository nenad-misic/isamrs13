import {Component, Inject, OnInit} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


import { API_VERSION } from '../shared/baseurl';
import {
  Airline,
  LoopBackConfig,
  RACService,
  RACServiceApi,
  LoggedUserApi,
  UserApi,
  RPriceListApi,
  RPriceList
} from '../shared/sdk';
import {ToastrService} from "ngx-toastr";
@Component({
  selector: 'app-rentacar-detail-profile',
  templateUrl: './rentacar-detail-profile.component.html',
  styleUrls: ['./rentacar-detail-profile.component.scss']
})
export class RentacarDetailProfileComponent implements OnInit {

  profile: any;
  profile_new: any;
  readOnly = true;
  rate;
  sysAdmin = false;

  constructor(private rentacarService: RACServiceApi,
              private rPriceListApi: RPriceListApi,
              private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.rentacarService.findOne({where: {id: id}}).subscribe((service: any) => {
      this.rPriceListApi.findById(service.rPriceListId).subscribe((rPriceList: RPriceList) => {

        this.rate = Math.ceil(service.rating);
        this.profile = service;
        this.profile_new = JSON.parse(JSON.stringify(this.profile));
        this.profile_new.rPriceList = rPriceList;
        this.profile.rPriceList = rPriceList;

        this.readOnly = this.profile.id !== this.userApi.getCachedCurrent().rACServiceId;
        this.sysAdmin = this.userApi.getCachedCurrent().type === 'sysAdmin';
      });
    });

  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.rentacarService.updateConcurentSafe(this.profile_new).subscribe((returned) => {
      console.log('*******************RET*****************');
      console.log(returned);
      console.log('***************************************');
      !returned.retval.res ?
        this.toastr.error('Please, try again.', 'Update failed')
        :
        this.toastr.success(this.profile.name, 'Update successful');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
    this.location.back();
  }
}
