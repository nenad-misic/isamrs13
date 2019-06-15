import {Inject, Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CombinedReservation} from '../shared/sdk/models';
import {CombinedReservationApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Injectable({
  providedIn: 'root'
})
export class CombinedService {


  private combinedReservationSource = new BehaviorSubject<CombinedReservation>(new CombinedReservation());
  combinedReservation = this.combinedReservationSource.asObservable();
  id: string;
  active = false;

  constructor(private combinedReservationApi: CombinedReservationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  changeCombinedReservation(cezz: CombinedReservation) {
    this.combinedReservationApi.findById(cezz.id).subscribe((cr: CombinedReservation) => {
      this.combinedReservationSource.next(cr);
      this.id = cr.id;
      this.active = true;
    }, (err) => {
      console.log(err);
    });
  }

  refreshCombinedReservation() {
    this.combinedReservationApi.findById(this.id, {include: [{mFlightReservations: {flight: ['airline', 'startDestination', 'endDestination']}},
        {mRoomReservations: {room: {hotel: 'destination'}}},
        {mCarReservations: {car: {rACService: ['destination', 'branchOffices']}}}]})
      .subscribe((cr: CombinedReservation) => {
      this.combinedReservationSource.next(cr);
    }, (err) => {
      console.log(err);
    });
  }

  finishReservation() {
    this.active = false;
    this.combinedReservationSource.next(new CombinedReservation());
  }

}
