import {Component, Inject, OnInit} from '@angular/core';
import {DataService} from '../services/data.service';

import { API_VERSION } from '../shared/baseurl';
import {Car, CarApi, LoopBackConfig} from '../shared/sdk';
@Component({
  selector: 'app-rentacar-search-form',
  templateUrl: './rentacar-search-form.component.html',
  styleUrls: ['./rentacar-search-form.component.scss']
})
export class RentacarSearchFormComponent implements OnInit {

  search: Car = new Car();
  searchResult: Car[] = [];
  constructor(private carService: CarApi,
              private data: DataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch(): void {
    this.searchResult = [];
    this.carService.find({where: this.search}).subscribe((searchResult: Car[]) => {
      this.searchResult = searchResult;
      this.data.changeSearchParams(this.searchResult);
      this.search = new Car();
    });
  }
}
