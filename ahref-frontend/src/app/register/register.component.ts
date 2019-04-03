import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {User} from '../shared/sdk/models';
import {UserApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION, baseURL} from '../shared/baseurl';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  profile: User;
  telephone: string;
  passwordConfirm: string;
  name: string;

  constructor(private userService: UserApi,
              private route: ActivatedRoute,
              private location: Location) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.profile = new User();
  }

  goBack(): void {
    this.location.back();
  }

  onRegisterClick(): void {
    if (this.passwordConfirm === this.profile.password) {
      this.userService.create(this.profile).subscribe((user: User) => {if (!user) { console.log('errore di fatale'); } });
      this.location.back();
    }
  }

}
