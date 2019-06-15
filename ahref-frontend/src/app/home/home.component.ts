import {Component, Inject, OnInit} from '@angular/core';
import {CarApi, DestinationApi, LoggedUserApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {Car, Destination, LoggedUser, MCarReservation} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: LoggedUser;
  constructor(private userApi: LoggedUserApi,
              private da: DestinationApi,
              private ra: RACServiceApi,
              private ca: CarApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.userApi.getCurrent({include: 'mCarReservations'}).subscribe((lu: LoggedUser) => {
      this.user = lu;
      console.log(lu);
    });

  }

  logout() {
    this.userApi.logout().subscribe((a) => console.log(a));
  }

}
