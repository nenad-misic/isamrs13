import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CarApi, LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {Car, RACService} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-car-detail-profile',
  templateUrl: './car-detail-profile.component.html',
  styleUrls: ['./car-detail-profile.component.scss']
})
export class CarDetailProfileComponent implements OnInit {

  car: Car;
  readOnly: boolean;
  reservable: boolean;
  errmsg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private carApi: CarApi,
              private racServiceApi: RACServiceApi,
              private loggedUserApi: LoggedUserApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (this.loggedUserApi.getCachedCurrent().type === 'regUser') {
      this.reservable = true;
    }else{
      this.reservable = false;
    }
    this.carApi.findById(id).subscribe((car: Car) => {
      this.car = car;
      this.racServiceApi.findById(car.rACServiceId).subscribe((racService: RACService) => {
        if (racService.loggedUserId === this.loggedUserApi.getCachedCurrent().id) {
          this.readOnly = false;
        } else {
          this.readOnly = true;
        }
      });
    });
  }



  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.carApi.updateAttributes(this.car.id, this.car).subscribe((returned: Car) => { this.errmsg = ''; }, (err) => {this.errmsg = err;});
    this.location.back();
  }

  onDeleteClick(): void {
    // additional checks needed (will be implemented when the reservations arrive)
    this.carApi.deleteById(this.car.id).subscribe((completed) => this.errmsg = '', (err) => this.errmsg = err);
    this.location.back();
  }
}
