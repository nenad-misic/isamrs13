import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RoomReservationInfo} from "../shared/room-reservation-info";

@Injectable({
  providedIn: 'root'
})
export class RoomReservationDataService {
  private searchParamsSource = new BehaviorSubject<RoomReservationInfo>(new RoomReservationInfo());
  currentSearchParams = this.searchParamsSource.asObservable();

  constructor() { }

  changeSearchParams(searchList: RoomReservationInfo) {
    this.searchParamsSource.next(searchList);
  }
}
