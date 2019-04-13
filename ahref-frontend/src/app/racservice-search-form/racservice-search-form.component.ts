import {Component, Inject, OnInit} from '@angular/core';
import {Destination, RACService} from '../shared/sdk/models';
import {DestinationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {RacserviceDataService} from '../services/racservice-data.service';

@Component({
  selector: 'app-racservice-search-form',
  templateUrl: './racservice-search-form.component.html',
  styleUrls: ['./racservice-search-form.component.scss']
})
export class RacserviceSearchFormComponent implements OnInit {

  name = '';
  country = '';
  searchResult: RACService[] = [];
  constructor(private racServiceApi: RACServiceApi,
              private destinationApi: DestinationApi,
              private data: RacserviceDataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch(): void {
    const filter = {};
    if (this.name) {
      // @ts-ignore
      filter.name = this.name;
    }
    if (this.country) {
      // @ts-ignore
      filter.country = this.country;
    }
    this.destinationApi.find({where: filter}).subscribe((searchResult: Destination[]) => {
      this.searchResult = [];
      searchResult.forEach((element) => {
        this.racServiceApi.find().subscribe((racSearchResult: RACService[]) => {
          racSearchResult.forEach((element1) => {
            if (element1.destinationId === element.id) {
              this.searchResult.push(element1);
            }
          });
        });
      });
      this.data.changeSearchParams(this.searchResult);
    });
  }
}
