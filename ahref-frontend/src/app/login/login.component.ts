import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errmsg: string;
  waiting = false;
  constructor(private userService: LoggedUserApi,
              private location: Location,
              private router: Router,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    console.log(this.userService.getCachedCurrent());
    if (this.userService.getCachedCurrent()) {
      this.location.back();
    }
  }

  login() {
    this.waiting = true;
    this.userService.login({username: this.username, password: this.password}).subscribe((returned) => {
      if (returned) {
        this.errmsg = null;
        this.waiting = false;
        this.router.navigate(['/home']);
      } else {
        this.errmsg = 'Invalid credentials. Try again!';
        this.password = '';
        this.waiting = false;
      }
    }, (err) => {
      this.errmsg = 'Invalid credentials. Try again!';
      this.password = '';
      this.waiting = false;
    });
  }
}
