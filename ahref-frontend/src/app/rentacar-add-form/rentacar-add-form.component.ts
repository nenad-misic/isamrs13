import {Component, Inject, OnInit} from '@angular/core';
import {Hotel, RACService} from '../shared/sdk/models';
import {RACServiceApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-rentacar-add-form',
  templateUrl: './rentacar-add-form.component.html',
  styleUrls: ['./rentacar-add-form.component.scss']
})
export class RentacarAddFormComponent implements OnInit {

  new_racservice: RACService;
  type: string;

  constructor(private service: RACServiceApi,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userTypeService: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if( this.userTypeService.getCachedCurrent() ){
      this.type = this.userTypeService.getCachedCurrent().type;
    }else{
      this.type = '';
    }
    this.new_racservice = new RACService();
    this.new_racservice.rating = 0;
    this.new_racservice.numOfRates = 0;
  }


  addRACService() {
    this.service.create(this.new_racservice).subscribe((racservice: RACService) => { if (!racservice) { console.log(status); }});
    this.new_racservice = new RACService();

  }

}
