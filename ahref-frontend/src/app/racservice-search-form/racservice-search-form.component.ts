import {Component, Inject, OnInit} from '@angular/core';
import {Car, Destination, MCarReservation, RACService} from '../shared/sdk/models';
import {DestinationApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
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
  racname = '';
  startDate: Date;
  endDate: Date;

  searchResult: RACService[] = [];
  constructor(private racServiceApi: RACServiceApi,
              private destinationApi: DestinationApi,
              private data: RacserviceDataService,
              private mCarReservationApi: MCarReservationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  showAll(): void {
    this.racServiceApi.find().subscribe((result: RACService[]) => {
      this.searchResult = result;
      this.data.changeSearchParams(this.searchResult);
    });
  }
  doSearch(): void {
    if (!this.startDate || !this.endDate) { return; }
    const filter = {};
    if (this.name) {
      // @ts-ignore
      filter.city = this.name;
    }
    if (this.country) {
      // @ts-ignore
      filter.state = this.country;
    }
    this.destinationApi.find({where: filter}).subscribe((searchResult: Destination[]) => {
      this.searchResult = [];
      searchResult.forEach((element) => {
        this.racServiceApi.find({include: 'cars', where: {destinationId: element.id}}).subscribe((racSearchResult: RACService[]) => {
          racSearchResult.forEach((element1) => {
            if (this.racname) {
              if (this.racname === element1.name) {
                element1.cars.forEach((car: Car) => {
                  this.mCarReservationApi.find({where : {carId: car.id}}).subscribe((data: MCarReservation[]) => {
                    if (!data) { this.searchResult.push(element1); } else {
                      let pushable = true;
                      data.forEach((res) => {
                        if ((res.startDate >= this.startDate && res.startDate <= this.endDate) ||
                          (this.startDate >= res.startDate && this.startDate <= res.endDate)) {
                          pushable = false;
                        }
                      });

                      if (pushable && this.searchResult.indexOf(element1) === -1) { this.searchResult.push(element1); }
                    }
                  });

                });
              }
            } else {
              element1.cars.forEach((car: Car) => {
                this.mCarReservationApi.find({where : {carId: car.id}}).subscribe((data: MCarReservation[]) => {
                  if (!data) { this.searchResult.push(element1); } else {
                    let pushable = true;
                    data.forEach((res) => {
                      if ((res.startDate >= this.startDate && res.startDate <= this.endDate) ||
                        (this.startDate >= res.startDate && this.startDate <= res.endDate)) {
                        pushable = false;
                      }
                    });

                    if (pushable && this.searchResult.indexOf(element1) === -1) { this.searchResult.push(element1); }
                  }
                });

              });
            }
          });
        });
      });
      this.data.changeSearchParams(this.searchResult);
    });
  }
}
