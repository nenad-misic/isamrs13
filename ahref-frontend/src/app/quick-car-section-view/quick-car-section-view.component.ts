import {Component, Inject, OnInit} from '@angular/core';
import {CombinedReservation, QuickCarReservation, RACService} from '../shared/sdk/models';
import {LoggedUserApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {CombinedService} from '../services/combined.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-quick-car-section-view',
  templateUrl: './quick-car-section-view.component.html',
  styleUrls: ['./quick-car-section-view.component.scss']
})
export class QuickCarSectionViewComponent implements OnInit {

  qcres: QuickCarReservation[];
  combinedReservation: CombinedReservation;
  racid: string;
  constructor(private racapi: RACServiceApi,
              private mCarResApi: MCarReservationApi,
              private luapi: LoggedUserApi,
              private location: Location,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private combinedService: CombinedService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.combinedService.combinedReservation.subscribe((cr) => {
      if (cr.id) {
        this.combinedReservation = cr;
      } else {
        this.combinedReservation = null;
      }
    });
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

  reserve(qcr: QuickCarReservation) {
    this.luapi.bindQuick(this.luapi.getCachedCurrent().id, qcr.id, qcr.mCarReservationId, qcr.carId ,this.combinedReservation.id)
      .subscribe((res) => {
      this.toastr.success('Reservation successful');
      this.combinedService.refreshCombinedReservation();
      this.router.navigate(['/flow']);
    }, (err) => {
      this.toastr.success(err.message, 'Reservation failed');
    });
  }

}
