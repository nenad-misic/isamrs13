import {Component, Inject, OnInit} from '@angular/core';
import {HotelApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Hotel, HPriceList, LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-additional-services-section',
  templateUrl: './additional-services-section.component.html',
  styleUrls: ['./additional-services-section.component.scss']
})
export class AdditionalServicesSectionComponent implements OnInit {

  hotelId: string;
  hPriceList: HPriceList;
  readOnly: boolean;

  constructor(private hotelService: HotelApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelId = id;
    this.hotelService.findOne({where: {id: id}, include: 'priceList'}).subscribe((profile: Hotel) => {
      this.hPriceList = profile.priceList;
      if (profile.id === this.userApi.getCachedCurrent().hotelId) {
        this.readOnly = true;
      } else {
        this.readOnly = false;
      }
    });
  }

}
