import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.scss']
})
export class PasswordChangeComponent implements OnInit {

  password_original: string;
  password_confirm: string;
  errmsg: string;

  constructor(private userService: LoggedUserApi,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    if (!this.userService.getCachedCurrent()){
      this.location.go('/home');
    }
  }

  submitChange() {
    if (this.password_original !== this.password_confirm) {
      this.errmsg = 'Passwords doesn\'t match!';
    } else {
      this.errmsg = null;
      const user = this.userService.getCachedCurrent();
      user.password = this.password_original;
      this.userService.updateAttributes(user.id, user).subscribe(success => { if (success) { console.log(success); }});
      this.location.back();
    }
  }
  unsubmitChange() {
    this.location.back();
  }
}
