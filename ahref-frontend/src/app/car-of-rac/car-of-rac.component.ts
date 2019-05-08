import {Component, Inject, OnInit} from '@angular/core';
import {Car} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {CarApi, RACServiceApi} from '../shared/sdk/services/custom';
import {DataService} from '../services/data.service';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-car-of-rac',
  templateUrl: './car-of-rac.component.html',
  styleUrls: ['./car-of-rac.component.scss']
})
export class CarOfRacComponent implements OnInit {

  cars: Car[];
  errmsg: string;

  id: string;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private racServiceApi: RACServiceApi,
              private carApi: CarApi,
              private data: DataService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.carApi.find({where: {rACServiceId: this.id}}).subscribe((data: Car[]) => this.cars = data);

  }
}
