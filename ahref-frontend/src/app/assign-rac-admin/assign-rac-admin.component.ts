import {Component, Inject, OnInit} from '@angular/core';
import {LoggedUser} from "../shared/sdk/models";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {ToastrService} from "ngx-toastr";
import {LoggedUserApi} from "../shared/sdk/services/custom";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";

@Component({
  selector: 'app-assign-rac-admin',
  templateUrl: './assign-rac-admin.component.html',
  styleUrls: ['./assign-rac-admin.component.scss']
})
export class AssignRacAdminComponent implements OnInit {

  racId: string;
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
    this.racId = this.route.snapshot.params['racId'];
  }

  assign() {
    this.loggedUserApi.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user.type != 'racAdmin') {
        this.toastr.error('User is not a rent-a-car service admin');
        return;
      } else {
        this.loggedUserApi.assignRacAdmin(user.id, this.racId).subscribe(()=> {
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
