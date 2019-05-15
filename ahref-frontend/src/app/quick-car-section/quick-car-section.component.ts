import {Component, Inject, Input, OnInit} from '@angular/core';
import {Car, RACService} from '../shared/sdk/models';
import {DestinationApi, FlightApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {FlightDataService} from '../services/flight-data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-quick-car-section',
  templateUrl: './quick-car-section.component.html',
  styleUrls: ['./quick-car-section.component.scss']
})
export class QuickCarSectionComponent implements OnInit {

  racid: string;

  cars: Car[];
  selected: Car;


  startDate: string;
  endDate: string;
  startDestination: string;
  endDestination: string;

  constructor(private racapi: RACServiceApi,
              private mCarResApi: MCarReservationApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.racid = this.route.snapshot.params['id'];
    this.racapi.findById(this.racid, {include: 'cars'}).subscribe((rac: RACService) => {
      this.cars = rac.cars;
    });
  }

  clicked(car){
    this.selected = car;
  }

  addQuick() {
    this.mCarResApi.create({
      carId: this.selected.id,
      timeStamp: new Date(),
      startDate:  new Date(this.startDate).getTime(),
      endDate: new Date(this.endDate).getTime(),
      carRate: -1,
      racRate: -1
    }).subscribe((created) => { console.log(created)});
    return;
  }

  doSearch() {
    return;
  }

}
