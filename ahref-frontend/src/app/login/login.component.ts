import {Component, Inject, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";

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
              private toastr: ToastrService,
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
      console.log(returned);
      if (returned) {
        this.toastr.success('Login successful', 'Welcome');
        this.waiting = false;
        if (returned.user.firstLogin) {
          this.router.navigate(['/changepassword'])
        } else {
          this.router.navigate(['/home']);
        }
      } else {
        this.toastr.error('Try again', 'Invalid credentials');
        this.password = '';
        this.waiting = false;
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
      this.password = '';
      this.waiting = false;
    });
  }
}
