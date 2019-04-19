import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CarReservationInfo} from '../shared/carReservationInfo';

@Injectable({
  providedIn: 'root'
})
export class CarReservationDataService {
  private searchParamsSource = new BehaviorSubject<CarReservationInfo>(new CarReservationInfo());
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: CarReservationInfo) {
    this.searchParamsSource.next(searchList);
  }
}
