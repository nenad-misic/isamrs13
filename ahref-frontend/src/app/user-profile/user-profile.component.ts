import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RACServiceApi, UserApi} from '../shared/sdk/services/custom';
import {User} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profile: User;
  profile_new: User;

  constructor(private loggedUserService: UserApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    // this.loggedUserService.findOne().subscribe((user: User) => {
    //  this.profile = user;
    //  this.profile_new = this.profile;
    // });
    this.profile = new User({username: 'username', email: 'email', password: 'password'});
    this.profile_new = this.profile;
  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    //this.loggedUserService.saveChanges(this.profile_new).subscribe(status => console.log(status));
    this.profile = this.profile_new;
    this.location.back();
  }

}
