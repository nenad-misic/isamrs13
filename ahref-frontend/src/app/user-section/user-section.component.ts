import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../shared/sdk/models';
import {LoopBackConfig, UserApi} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {UserdataService} from '../services/userdata.service';

@Component({
  selector: 'app-user-section',
  templateUrl: './user-section.component.html',
  styleUrls: ['./user-section.component.scss']
})
export class UserSectionComponent implements OnInit {

  users: User[];

  constructor(private userService: UserApi,
              private data: UserdataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit(): void {
    this.data.currentSearchParams.subscribe(searchList => this.users = searchList );
  }


}
