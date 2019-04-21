import {Component, Inject, Input, OnInit} from '@angular/core';
import {HPriceListItem} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {HPriceListItemApi, LoggedUserApi, LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-additional-service-details',
  templateUrl: './additional-service-details.component.html',
  styleUrls: ['./additional-service-details.component.scss']
})
export class AdditionalServiceDetailsComponent implements OnInit {

  aservice: HPriceListItem;
  @Input()
  hotelId: string;
  readOnly: boolean;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private loggedUserApi: LoggedUserApi,
              private aserviceApi: HPriceListItemApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const hotelId = this.route.snapshot.params['hotelId'];
    const aserviceId = this.route.snapshot.params['aserviceId'];
    this.aserviceApi.findById(aserviceId).subscribe((aservice: HPriceListItem) => {
      this.aservice = aservice;
      if (hotelId === this.loggedUserApi.getCachedCurrent().hotelId) {
        this.readOnly = true;
      } else {
        this.readOnly = false;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

  editClicked() {
    this.aserviceApi.updateAttributes(this.aservice.id, this.aservice).subscribe(() => {
      this.location.back();
    });
  }

}
