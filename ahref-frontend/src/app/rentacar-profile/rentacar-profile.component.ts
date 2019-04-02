import {Component, Input, OnInit} from '@angular/core';
import {RACService} from '../shared/sdk/models';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.scss']
})
export class RentacarProfileComponent implements OnInit {

  @Input()
  profile: RACService;

  constructor() {}

  ngOnInit() {
  }

}
