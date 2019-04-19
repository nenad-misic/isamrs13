import {Component, Inject, OnInit} from '@angular/core';
import {CarApi, LoggedUserApi, MCarReservationApi} from '../shared/sdk/services/custom';
import {Car, MCarReservation} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  car: string;
  startDate: string;
  endDate: string;
  cars: Car[];

  constructor(private mCarReservationApi: MCarReservationApi,
              private carApi: CarApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.carApi.find().subscribe((cars: Car[]) => this.cars = cars);
  }

  test() {
    this.mCarReservationApi.create({carId: this.car, timeStamp: new Date(), startDate:  new Date(this.startDate).getTime(), endDate: new Date(this.endDate).getTime()}).
    subscribe((created) => console.log('created'), (err) => console.log(err));

  }

}
