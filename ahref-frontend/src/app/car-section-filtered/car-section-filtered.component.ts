import {Component, Inject, OnInit} from '@angular/core';
import {Car, RACService} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RACServiceApi} from '../shared/sdk/services/custom';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-car-section-filtered',
  templateUrl: './car-section-filtered.component.html',
  styleUrls: ['./car-section-filtered.component.scss']
})
export class CarSectionFilteredComponent implements OnInit {

  cars: Car[];
  errmsg: string;

  id: string;
  constructor(private route: ActivatedRoute,
              private location: Location,
              private racServiceApi: RACServiceApi,
              private data: DataService,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.data.currentSearchParams.subscribe(searchList => this.cars = searchList );

  }

}
