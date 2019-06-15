import {Component, Inject, OnInit} from '@angular/core';
import {HotelApi, HPriceListApi, LoggedUserApi} from '../shared/sdk/services/custom';
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
  hPriceList: HPriceList = new HPriceList();
  readOnly: boolean;
  waiting = false;
  constructor(private hotelService: HotelApi,
              private aserviceApi: HPriceListApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.waiting = true;
    const id = this.route.snapshot.params['id'];
    this.hotelId = id;
    this.hotelService.findOne({where: {id: id}, include: 'hPriceList'}).subscribe((profile: any) => {
      console.log(profile);
      this.aserviceApi.findOne({where: {id: profile.hPriceListId}, include: 'priceListItems'}).subscribe((priceList: HPriceList) => {
        this.hPriceList = priceList;
        this.waiting = false;
      });
      this.readOnly = profile.id !== this.userApi.getCachedCurrent().hotelId;
    });
  }

  goBack(): void {
    this.location.back();
  }
}
