import {Component, Inject, OnInit} from '@angular/core';
import {Car, Hotel} from '../shared/sdk/models';
import {HotelDataService} from '../services/hotel-data.service';
import {HotelApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-hotel-search-form',
  templateUrl: './hotel-search-form.component.html',
  styleUrls: ['./hotel-search-form.component.scss']
})
export class HotelSearchFormComponent implements OnInit {

  search: Hotel = new Hotel();
  searchResult: Hotel[] = [];

  constructor(private hotelService: HotelApi,
              private data: HotelDataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch() {
    this.hotelService.find({where: this.search}).subscribe((searchResult: Hotel[]) => {
      this.searchResult = searchResult;
      this.data.changeSearchParams(this.searchResult);
      this.search = new Hotel();
    });
  }
}
