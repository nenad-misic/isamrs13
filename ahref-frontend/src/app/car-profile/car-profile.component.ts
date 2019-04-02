import {Component, Input, OnInit} from '@angular/core';
import {Car} from '../shared/sdk/models';

@Component({
  selector: 'app-car-profile',
  templateUrl: './car-profile.component.html',
  styleUrls: ['./car-profile.component.scss']
})
export class CarProfileComponent implements OnInit {

  @Input()
  profile: Car;

  constructor() { }

  ngOnInit() {
  }

}
