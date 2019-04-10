import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {LoggedUserApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errmsg: string;
  constructor(private userService: LoggedUserApi,
              private location: Location) { }

  ngOnInit() {
    if (this.userService.getCachedCurrent()) {
      this.location.back();
    }
  }

  login() {
    this.userService.login({username: this.username, password: this.password}).subscribe(
      (returned) => {
        if (returned) {
          this.errmsg = null;
          this.location.back();
        } else {
          this.errmsg = 'Invalid credentials. Try again!';
          this.password = '';
        }

      this.errmsg = 'Invalid credentials. Try again!';
      this.password = '';
    }, 
    err => {
      this.errmsg = 'Invalid credentials. Try again!';
      this.password = '';
    });
}
  
}
