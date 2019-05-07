import {Component, Inject, OnInit} from '@angular/core';
import {CarApi, LoggedUserApi, MCarReservationApi} from '../shared/sdk/services/custom';
import {Car, LoggedUser, MCarReservation} from '../shared/sdk/models';
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
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.user = this.userApi.getCachedCurrent();
  }

}
