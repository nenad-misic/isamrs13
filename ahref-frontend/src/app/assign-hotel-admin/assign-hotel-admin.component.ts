import {Component, Inject, OnInit} from '@angular/core';
import {LoggedUser} from "../shared/sdk/models";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {LoggedUserApi} from "../shared/sdk/services/custom";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";

@Component({
  selector: 'app-assign-hotel-admin',
  templateUrl: './assign-hotel-admin.component.html',
  styleUrls: ['./assign-hotel-admin.component.scss']
})
export class AssignHotelAdminComponent implements OnInit {

  hotelId: string;
  email: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL,
              private loggedUserApi: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.hotelId = this.route.snapshot.params['hotelId'];
  }

  assign() {
    this.loggedUserApi.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user.type != 'hotelAdmin') {
        this.toastr.error('User is not a hotel admin');
        return;
      } else {
        this.loggedUserApi.assignHotelAdmin(user.id, this.hotelId).subscribe((uesr)=> {
          this.toastr.success('Admin assigned');
          this.location.back();
        }, (err) => {
          this.toastr.error(err.message, 'ERROR');
        });
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
