import {Component, Inject, OnInit} from '@angular/core';
import {Destination, Airline} from '../shared/sdk/models';
import {DestinationApi, AirlineApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {AirlineserviceDataService} from '../services/airlineservice-data.service';

@Component({
  selector: 'app-airline-search-form',
  templateUrl: './airline-search-form.component.html',
  styleUrls: ['./airline-search-form.component.scss']
})
export class AirlineSearchFormComponent implements OnInit {

  name = '';
  country = '';
  searchResult: Airline[] = [];
  constructor(private airlineApi: AirlineApi,
              private destinationApi: DestinationApi,
              private data: AirlineserviceDataService,
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

    //this.destinationApi.find({where: filter}).subscribe((searchResult: Destination[]) => {
      this.searchResult = [];
    //searchResult.forEach((element) => {
        this.airlineApi.find({include: 'destinations'}).subscribe((airlineSearchResult: Airline[]) => {
          airlineSearchResult.forEach((element1) => {
             // element1.destinations.forEach((element2) => {
            //    if (element2.id === element.id) {
                     this.searchResult.push(element1);
            //       }
            //    });
          });
        });
    //});
      this.data.changeSearchParams(this.searchResult);
    //});
  }

}
