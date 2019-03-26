import {Component, Input, OnInit} from '@angular/core';
import {Airline} from '../shared/airline';

@Component({
  selector: 'app-airline-profile',
  templateUrl: './airline-profile.component.html',
  styleUrls: ['./airline-profile.component.scss']
})
export class AirlineProfileComponent implements OnInit {

  @Input()
  profile: Airline;

  constructor() { }

  ngOnInit() {
  }

}
