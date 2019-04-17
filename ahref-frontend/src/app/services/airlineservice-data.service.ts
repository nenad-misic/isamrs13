import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Airline} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class AirlineserviceDataService {

  private searchParamsSource = new BehaviorSubject<Airline[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Airline[]) {
    this.searchParamsSource.next(searchList);
  }
}
