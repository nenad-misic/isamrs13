import {Component, Inject, Input, OnInit} from '@angular/core';
import {RACService} from '../shared/sdk/models';
import {DestinationApi, RACServiceApi} from '../shared/sdk/services/custom';
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

  destination = {name: '', country: ''};

  rate;

  constructor(@Inject('baseURL') private baseURL,
              private dapi: DestinationApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    // @ts-ignore
    this.dapi.findOne({where: {id: this.profile.destinationId}}).subscribe((dest) => this.destination = dest );
    this.rate = Math.ceil(this.profile.rating);
  }

}
