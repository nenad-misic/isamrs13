import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CarApi, LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {Car, RACService} from '../shared/sdk/models';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {CarReservationDataService} from '../services/car-reservation-data.service';
import {ToastrService} from "ngx-toastr";

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
              private infoData: CarReservationDataService,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (this.loggedUserApi.getCachedCurrent().type === 'regUser') {
      this.infoData.currentSearchParams.subscribe((val) => {
        if (val.startDate && val.endDate) {
          this.reservable = true;
        } else {
          this.reservable = false;
        }
      });
    } else {
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
    this.racServiceApi.updateByIdCars(this.car.rACServiceId, this.car.id, this.car).subscribe((returned: Car) => {
      this.toastr.success(this.car.name, 'Car updated');
      this.location.back();
      }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  onDeleteClick(): void {
    // additional checks needed (will be implemented when the reservations arrive)
    this.racServiceApi.destroyByIdCars(this.car.rACServiceId, this.car.id).subscribe((completed) => {
      this.toastr.success(this.car.name, 'Car deleted');
      this.location.back()
    }, (err) => this.toastr.error(err.message, 'ERROR'));
  }
}
