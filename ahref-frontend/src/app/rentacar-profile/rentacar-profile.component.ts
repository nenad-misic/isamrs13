import {Component, Input, OnInit} from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.scss']
})
export class RentacarProfileComponent implements OnInit {

  @Input()
  profile: RentACarService;

  constructor() {}

  ngOnInit() {
  }

}
