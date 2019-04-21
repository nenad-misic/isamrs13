import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../shared/sdk/models';
import {UserApi} from '../shared/sdk/services/custom';
import {UserdataService} from '../services/userdata.service';
import {DataService} from '../services/data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-users-detail',
  templateUrl: './users-detail.component.html',
  styleUrls: ['./users-detail.component.scss']
})
export class UsersDetailComponent implements OnInit {

  username: String;
  email: String;
  searchResult: User[] = [];

  constructor(private userService: UserApi,
              private data: UserdataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
  }

  doSearch(): void {
    const filter = {};
    if (this.username) {
      // @ts-ignore
      filter.username = this.username;
    }
    if (this.email) {
      // @ts-ignore
      filter.email = this.email;
    }


   this.userService.find({where: filter}).subscribe((searchResult: User[]) => {
      this.searchResult = searchResult;
      this.data.changeSearchParams(this.searchResult);
    });

    // this.searchResult = [new User({username: 'username', email: 'email', password: 'password'}),
    //  new User({username: 'username2', email: 'email2', password: 'password2'}),
    //  new User({username: 'username3', email: 'email3', password: 'password3'})
    // ];
    this.data.changeSearchParams((this.searchResult));
  }


}
