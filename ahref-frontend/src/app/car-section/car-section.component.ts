import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

import { API_VERSION } from '../shared/baseurl';
import {Car, CarApi, LoopBackConfig} from '../shared/sdk';

@Component({
  selector: 'app-car-section',
  templateUrl: './car-section.component.html',
  styleUrls: ['./car-section.component.scss']
})
export class CarSectionComponent implements OnInit {


  cars: Car[];
  currentSkip = 10;
  cnt = 0;
  constructor(private carService: CarApi,
              private data: DataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => {
      this.cars = searchList;

      if (this.data.getSearch() !== null) {
        this.carService.count(this.data.getSearch()).subscribe((cnt) => {
          this.cnt = cnt.count;
        });
      }
    } );
  }

  loadMore() {
    this.carService.find({where: this.data.getSearch(), limit: 10, skip: this.currentSkip}).subscribe((searchResult: Car[]) => {
      searchResult.forEach((car: Car) => {
        this.cars.push(car);
      });
    });

    this.currentSkip += 10;
  }

}
