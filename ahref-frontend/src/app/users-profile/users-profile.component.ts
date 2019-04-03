import {Component, Input, OnInit} from '@angular/core';
import {User} from '../shared/sdk/models';

@Component({
  selector: 'app-users-profile',
  templateUrl: './users-profile.component.html',
  styleUrls: ['./users-profile.component.scss']
})
export class UsersProfileComponent implements OnInit {

  @Input()
  profile: User;

  constructor() { }

  ngOnInit() {
  }

}
