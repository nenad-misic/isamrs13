import {Component, Inject, OnInit} from '@angular/core';
import {Airline, LoggedUser} from '../shared/sdk/models';
import {AirlineApi, LoggedUserApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {Location} from '@angular/common';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-airline-add-form',
  templateUrl: './airline-add-form.component.html',
  styleUrls: ['./airline-add-form.component.scss']
})
export class AirlineAddFormComponent implements OnInit {

  new_airline: Airline;
  type: string;
  email: string;

  constructor(private service: AirlineApi,
              private userTypeService: LoggedUserApi,
              private location: Location,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if (this.userTypeService.getCachedCurrent() ) {
      this.type = this.userTypeService.getCachedCurrent().type;
    } else {
      this.type = '';
    }
    this.new_airline = new Airline();
    this.new_airline.rating = 0;
    this.new_airline.numOfRates = 0;
  }

  addAirline() {
    this.userTypeService.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user) {
        if (user.type === 'airlineAdmin' && !user.airline) {
          this.new_airline.loggedUser = user;
          this.service.create(this.new_airline).subscribe((airline: Airline) => {
            if (!airline) {
              console.log(status);
            }
            this.userTypeService.updateAirline(user.id, this.new_airline).subscribe((returnedUser) => {
              console.log('ok');
              this.toastr.success(this.new_airline.name, 'Airline added')
              this.new_airline = new Airline();
            }, (err) => {
              this.toastr.error(err.message, 'ERROR');
            });
          });
        }
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }


}

