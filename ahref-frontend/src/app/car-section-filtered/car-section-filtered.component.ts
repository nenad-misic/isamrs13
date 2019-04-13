import {Component, Inject, OnInit} from '@angular/core';
import {Car, RACService} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RACServiceApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-car-section-filtered',
  templateUrl: './car-section-filtered.component.html',
  styleUrls: ['./car-section-filtered.component.scss']
})
export class CarSectionFilteredComponent implements OnInit {

  cars: Car[];
  errmsg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private racServiceApi: RACServiceApi,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.racServiceApi.findById(id,{include: 'cars'}).subscribe((racService: RACService) => {
      this.cars = racService.cars;
      this.errmsg = '';
    }, (err) => {
      this.errmsg = err;
    });
  }

}
