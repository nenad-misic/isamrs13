import {Component, Input, OnInit} from '@angular/core';
import {HPriceListItem} from '../shared/sdk/models';

@Component({
  selector: 'app-additional-service-profile',
  templateUrl: './additional-service-profile.component.html',
  styleUrls: ['./additional-service-profile.component.scss']
})
export class AdditionalServiceProfileComponent implements OnInit {

  @Input()
  aservice: HPriceListItem;

  constructor() { }

  ngOnInit() {
  }

}
