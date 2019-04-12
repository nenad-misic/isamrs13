import {Component, Inject, Input, OnInit} from '@angular/core';
import {RACService} from '../shared/sdk/models';
import {RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.scss']
})
export class RentacarProfileComponent implements OnInit {

  @Input()
  profile: RACService;

  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);}

  ngOnInit() {
  }

}
