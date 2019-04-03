import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Car, User} from '../shared/sdk/models';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  private searchParamsSource = new BehaviorSubject<User[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: User[]) {
    this.searchParamsSource.next(searchList);
  }

}
