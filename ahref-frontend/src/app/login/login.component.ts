import { Component, OnInit } from '@angular/core';
import {Location} from '@angular/common';
import {LoggedUserApi} from '../shared/sdk/services/custom';
import {UserTypeService} from '../services/user-type.service';

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
              private location: Location,
              private userTypeService: UserTypeService) { }

  ngOnInit() {
    console.log(this.userService.getCachedCurrent());
    if (this.userService.getCachedCurrent()) {
      this.location.back();
    }
  }

  login() {
    this.userService.login({username: this.username, password: this.password}).subscribe((returned) => {
      if (returned) {
        try {
          this.userTypeService.changeSearchParams(returned.user.type);
        } catch (e) {
          this.errmsg = e.message;
          this.userService.logout();
          return;
        }
        this.errmsg = null;
        this.location.back();
      } else {
        this.errmsg = 'Invalid credentials. Try again!';
        this.password = '';
      }
    });

    this.errmsg = 'Invalid credentials. Try again!';
    this.password = '';
  }
}
