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

  startDest = '';
  endDest = '';
  startDate: Date;
  endDate: Date;
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
    const filter2 = {};
    if (this.startDest) {
      // @ts-ignore
      filter.name = this.startDest;
    }
    if (this.endDest) {
      // @ts-ignore
      filter2.name = this.endDest;
    }

    this.destinationApi.find({where: filter}).subscribe((searchResult: Destination[]) => {
      this.destinationApi.find({where: filter2}).subscribe((searchResult2: Destination[]) => {
        this.searchResult = [];
        searchResult.forEach((startE) => {
          searchResult2.forEach((endE) => {
            this.flightApi.find({include: ['startDestination', 'endDestination']}).subscribe((flightSearchResult: Flight[]) => {

              flightSearchResult.forEach((element1) => {
                this.flightApi.findById(element1.id, { include: ['startDestination', 'endDestination']}).subscribe((flightE: Flight) => {
                  console.log(flightE);
                  let dejt = true;
                  if(this.startDate){
                    if(flightE.startTime < new Date(this.startDate).getTime()){
                      dejt = false;
                    }
                  }

                  if(this.startDate){
                    if(flightE.endTime > new Date(this.endDate).getTime()){
                      dejt = false;
                    }
                  }

                  if (dejt && flightE.startDestination.id === startE.id && flightE.endDestination.id === endE.id) {
                    this.searchResult.push(flightE);
                  }
                });

              });
            });
          });
        });
        this.data.changeSearchParams(this.searchResult);
      });
    });
  }

}
