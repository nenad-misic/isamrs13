import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Car} from '../shared/car';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private searchParamsSource = new BehaviorSubject<Car[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Car[]) {
    this.searchParamsSource.next(searchList);
  }
}
