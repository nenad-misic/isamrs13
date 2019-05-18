import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Car} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  //car data service
  private searchParamsSource = new BehaviorSubject<Car[]>([]);
  private search = null;
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Car[]) {
    this.searchParamsSource.next(searchList);
  }

  saveSearch(search) {
    this.search = search;
  }

  getSearch() {
    return this.search;
  }
}
