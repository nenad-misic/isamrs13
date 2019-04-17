import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Hotel} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class HotelDataService {

  private searchParamsSource = new BehaviorSubject<Hotel[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Hotel[]) {
    this.searchParamsSource.next(searchList);
  }
}
