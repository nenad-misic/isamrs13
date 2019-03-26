import { Component, OnInit } from '@angular/core';
import {Airline} from '../shared/airline';
import {AirlineService} from '../services/airline.service';


@Component({
  selector: 'app-airline-section',
  templateUrl: './airline-section.component.html',
  styleUrls: ['./airline-section.component.scss']
})
export class AirlineSectionComponent implements OnInit {

  airlines: Airline[];

  constructor(private airlineService: AirlineService) { }

  ngOnInit() {
    this.airlineService.getAirlines().subscribe(airlines => this.airlines = airlines);
  }

}
