import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Room} from "../shared/sdk/models";

@Injectable({
  providedIn: 'root'
})
export class RoomDataServiceService {
  //car data service
  private searchParamsSource = new BehaviorSubject<Room[]>([]);
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: Room[]) {
    this.searchParamsSource.next(searchList);
  }

}
