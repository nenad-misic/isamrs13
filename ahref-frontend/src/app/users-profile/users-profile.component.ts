import {Component, Inject, Input, OnInit} from '@angular/core';
import {Friendship, LoggedUser, User} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  @Input()
  profile: LoggedUser;
  picturePath: string;

  constructor(@Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    this.picturePath = this.baseURL + '/userImages/' + this.profile.id + '.jpg';
  }


  changePicPath(): void {
    console.log('Here we go!');
    this.picturePath = this.baseURL + '/carImages/' + 'missing.png';
  }
}
