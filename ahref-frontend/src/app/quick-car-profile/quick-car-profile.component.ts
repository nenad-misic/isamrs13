import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {QuickCarReservation} from '../shared/sdk/models';
import {QuickCarReservationApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-quick-car-profile',
  templateUrl: './quick-car-profile.component.html',
  styleUrls: ['./quick-car-profile.component.scss']
})
export class QuickCarProfileComponent implements OnInit, OnChanges {

  @Input()
  qcr: QuickCarReservation;
  picturePath: string;

  constructor(private quickApi: QuickCarReservationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }


  ngOnInit() {
    this.quickApi.findById(this.qcr.id, {include: ['mCarReservation', 'car']}).subscribe((qcr: QuickCarReservation) => {
      console.log(qcr);
      this.qcr = qcr;
    });
  }
  changePicPath(): void {
    this.picturePath = this.baseURL + '/carImages/' + 'missing.png';
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.picturePath = this.baseURL + '/carImages/' + this.qcr.carId + '.jpg';
  }
}
