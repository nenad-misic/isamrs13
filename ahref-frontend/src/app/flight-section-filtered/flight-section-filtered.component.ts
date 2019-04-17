import {Component, Inject, OnInit} from '@angular/core';
import {Airline, Flight} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AirlineApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-flight-section-filtered',
  templateUrl: './flight-section-filtered.component.html',
  styleUrls: ['./flight-section-filtered.component.scss']
})
export class FlightSectionFilteredComponent implements OnInit {


  flights: Flight[];
  errmsg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private airlineApi: AirlineApi,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.airlineApi.findById(id, {include: 'flights'}).subscribe((airline: Airline) => {
      this.flights = airline.flights;
      this.errmsg = '';
    }, (err) => {
      this.errmsg = err;
    });
  }


}
