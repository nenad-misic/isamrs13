import {Component, Inject, Input, OnInit} from '@angular/core';
import {Car, RACService} from '../shared/sdk/models';
import {CarApi, LoggedUserApi, RACServiceApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-car-add-form',
  templateUrl: './car-add-form.component.html',
  styleUrls: ['./car-add-form.component.scss']
})
export class CarAddFormComponent implements OnInit {

  @Input()
  racService: RACService;
  type: string;
  new_car: Car;
  errmsg: string;
  constructor(private carApi: CarApi,
              private loggedUserApi: LoggedUserApi,
              private racServiceApi: RACServiceApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
    this.new_car = new Car();
    this.errmsg = '';
  }

  ngOnInit() {
    this.type = this.loggedUserApi.getCachedCurrent().type;
  }

  addCar() {
    this.new_car.rACServiceId = this.racService.id;
    this.racServiceApi.createCars(this.racService.id, this.new_car).subscribe((car) => {
      this.errmsg = '';
    }, (err) => {
      this.errmsg = err;
    });
  }

}
