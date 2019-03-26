import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoggeduserService} from '../services/loggeduser.service';
import {User} from '../shared/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  profile: User;
  profile_new: User;

  constructor(private loggedUserService: LoggeduserService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    this.loggedUserService.getLoggedUser().subscribe(user => {
        this.profile = user;
        this.profile_new = new User();
        this.profile_new.username = this.profile.username;
        this.profile_new.name = this.profile.name;
        this.profile_new.password = this.profile.password;
        this.profile_new.email = this.profile.email;
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.loggedUserService.saveChanges(this.profile_new).subscribe(status => console.log(status));
    this.location.back();
  }

}
