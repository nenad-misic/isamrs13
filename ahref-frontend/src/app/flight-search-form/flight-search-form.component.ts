import {Component, Inject, OnInit} from '@angular/core';
import {Destination, Flight} from '../shared/sdk/models';
import {DestinationApi, FlightApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {FlightDataService} from '../services/flight-data.service';

@Component({
  selector: 'app-flight-search-form',
  templateUrl: './flight-search-form.component.html',
  styleUrls: ['./flight-search-form.component.scss']
})
export class FlightSearchFormComponent implements OnInit {

  name = '';
  country = '';
  searchResult: Flight[] = [];
  constructor(private flightApi: FlightApi,
              private destinationApi: DestinationApi,
              private data: FlightDataService,
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
    //  searchResult.forEach((element) => {
        this.flightApi.find().subscribe((flightSearchResult: Flight[]) => {
          flightSearchResult.forEach((element1) => {
           // if (element1.startDestination.id === element.id || element1.endDestination.id === element.id) {
              this.searchResult.push(element1);
          //  }
          });
        });
    //  });
      this.data.changeSearchParams(this.searchResult);
    //});
  }

}
