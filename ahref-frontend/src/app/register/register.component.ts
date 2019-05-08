import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoggedUser} from '../shared/sdk/models';
import {LoggedUserApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION, baseURL} from '../shared/baseurl';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  profile: LoggedUser;
  passwordConfirm: string;

  constructor(private userService: LoggedUserApi,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private location: Location) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if (this.userService.getCachedCurrent()) {
      this.location.back();
    }
    this.profile = new LoggedUser();
    this.profile.image = 'Images/default.png';
  }

  goBack(): void {
    this.location.back();
  }

  onRegisterClick(): void {
    if (this.passwordConfirm === this.profile.password) {
      this.userService.create(this.profile).subscribe((user: LoggedUser) => {
        if (!user) { console.log('errore di fatale');}
        this.toastr.success(this.profile.username, 'Registered successfully')
        this.location.back();
      }, (err) => {
        this.toastr.error(err.message, 'ERROR');
      });
    } else {
      this.toastr.error('Passwords must match')
      this.location.back();
    }
  }

}
