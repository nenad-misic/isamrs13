import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Flight} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class FlightDataService {

  private searchParamsSource = new BehaviorSubject<Flight[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Flight[]) {
    this.searchParamsSource.next(searchList);
  }
}
