import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {RACService} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class RacserviceDataService {

  private searchParamsSource = new BehaviorSubject<RACService[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: RACService[]) {
    this.searchParamsSource.next(searchList);
  }
}
