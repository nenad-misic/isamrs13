import {Component, Inject, OnInit} from '@angular/core';
import {Airline} from '../shared/sdk/models';
import {AirlineApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {Location} from '@angular/common';

@Component({
  selector: 'app-airline-add-form',
  templateUrl: './airline-add-form.component.html',
  styleUrls: ['./airline-add-form.component.scss']
})
export class AirlineAddFormComponent implements OnInit {

  new_airline: Airline;

  constructor(private service: AirlineApi,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.new_airline = new Airline();
    this.new_airline.rating = 0;
    this.new_airline.numOfRates = 0;
  }

  addAirline() {

    this.service.create(this.new_airline).subscribe((airline: Airline) => { if (!airline) { console.log(status); }});
    this.new_airline = new Airline();
  }

}
