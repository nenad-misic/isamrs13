import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {RACServiceApi, UserApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {LoggedUser} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {WsFriendsService} from '../services/ws-friends.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profile: LoggedUser;
  profile_new: LoggedUser;

  constructor(private loggedUserService: LoggedUserApi,
              private route: ActivatedRoute,
              private location: Location,
              private wsService: WsFriendsService,
              private router: Router,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    // this.loggedUserService.findOne().subscribe((user: User) => {
    //  this.profile = user;
    //  this.profile_new = this.profile;
    // });
    this.loggedUserService.getCurrent().subscribe((prf) => {
      this.profile = prf;

      this.profile_new = JSON.parse(JSON.stringify(this.profile));
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.loggedUserService.patchAttributes(this.profile_new.id, this.profile_new).subscribe((status) => console.log(status));
    this.profile = this.profile_new;
    this.location.back();
  }

  logout() {
    this.loggedUserService.logout();
    this.wsService.disconnect();
    this.router.navigate(['/home']);
  }


}
