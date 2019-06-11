import {Component, Inject, OnInit} from '@angular/core';
import {QuickCarReservation, RACService} from '../shared/sdk/models';
import {LoggedUserApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-quick-car-section-view',
  templateUrl: './quick-car-section-view.component.html',
  styleUrls: ['./quick-car-section-view.component.scss']
})
export class QuickCarSectionViewComponent implements OnInit {

  qcres: QuickCarReservation[];
  racid: string;
  constructor(private racapi: RACServiceApi,
              private mCarResApi: MCarReservationApi,
              private route: ActivatedRoute,
              private luapi: LoggedUserApi,
              private location: Location,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.racid = this.route.snapshot.params['id'];
    this.racapi.findById(this.racid, {include: {cars: 'quickCarReservations'}}).subscribe((rac: RACService) => {
      this.qcres = [];
      rac.cars.forEach((car) => {
        car.quickCarReservations.forEach((res) => {
          this.qcres.push(res);
        });
      });
    });
  }

  reserve(qcr) {
    /*
    this.luapi.bindQuick(this.luapi.getCachedCurrent().id, qcr.id, qcr.mCarReservationId).subscribe((res) => {
      alert('QUICK CAR RESURVATION RESURVATED PADRE!' + res.retval);
    });*/
  }

}
