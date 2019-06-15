import { Component, OnInit } from '@angular/core';
import {LoggedUser} from '../shared/sdk/models';
import {LoggedUserApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-add-user-form',
  templateUrl: './add-user-form.component.html',
  styleUrls: ['./add-user-form.component.scss']
})
export class AddUserFormComponent implements OnInit {

  new_user: LoggedUser;
  types: string[];
  selected_type: string;
  passwordConfirm: string;

  constructor(private userService: LoggedUserApi,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.new_user = new LoggedUser();
    this.types = ['sysAdmin', 'hotelAdmin', 'racAdmin', 'airlineAdmin'];
  }

  addUser() {
    if (this.new_user.password !== this.passwordConfirm) {
      return;
    }
    this.new_user.emailVerified = true;
    this.new_user.type = this.selected_type;
    this.new_user.image = '../assets/images/user.png';
    this.userService.create(this.new_user).subscribe((succ) => {
      this.new_user = new LoggedUser();
      this.toastr.success(this.new_user.username, 'User added.');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
