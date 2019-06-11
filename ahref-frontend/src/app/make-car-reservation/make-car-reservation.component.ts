import { Component, OnInit } from '@angular/core';
import {CarReservationDataService} from '../services/car-reservation-data.service';
import {CarApi, LoggedUserApi, MCarReservationApi, RACServiceApi, RPriceListApi, RPriceListItemApi} from '../shared/sdk/services/custom';
import {CarReservationInfo} from '../shared/carReservationInfo';
import {Car, CombinedReservation, RACService, RPriceList, RPriceListItem} from '../shared/sdk/models';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from "ngx-toastr";
import {CombinedService} from '../services/combined.service';

@Component({
  selector: 'app-make-car-reservation',
  templateUrl: './make-car-reservation.component.html',
  styleUrls: ['./make-car-reservation.component.scss']
})
export class MakeCarReservationComponent implements OnInit {

  errmsg: string;
  totalCost = 0;
  info: CarReservationInfo;
  car: Car;
  combinedReservation: CombinedReservation;

  constructor(private carReservationData: CarReservationDataService,
              private mCarReservationApi: MCarReservationApi,
              private loggedUserApi: LoggedUserApi,
              private route: ActivatedRoute,
              private router: Router,
              private combinedService: CombinedService,
              private toastr: ToastrService,
              private rplia: RPriceListItemApi,
              private rpla: RPriceListApi,
              private carApi: CarApi,
              private racApi: RACServiceApi) { }

  ngOnInit() {
    this.combinedService.combinedReservation.subscribe((cr) => {
      this.combinedReservation = cr;
    });
    this.carApi.findOne({where: {id: this.route.snapshot.params['id']}}).subscribe((car: Car) => {
      this.car = car;
      this.racApi.findById(this.car.rACServiceId).subscribe((rac: RACService) => {
        this.rpla.find({where: {rACServiceId: rac.id}, include: 'priceListItems'}).subscribe((priceList: RPriceList[]) => {
          priceList[0].priceListItems.forEach((item: RPriceListItem) => {
            if (item.carType === car.carType) {
              this.totalCost = ((new Date(this.info.endDate).getTime() - new Date(this.info.startDate).getTime()) / ( 24 * 60 * 60 * 1000 )) * item.price;
            }
          });
        });
      });
    });
    this.carReservationData.currentSearchParams.subscribe(info => this.info = info );

  }


  onConfirm() {
    //this.mCarReservationApi.create({carId: this.car.id, timeStamp: new Date(), startDate:  new Date(this.info.startDate).getTime(), endDate: new Date(this.info.endDate).getTime()}).
    //subscribe((created) => this.toastr.success('Reservation successful'), (err) => this.toastr.error(err.message, 'ERROR'));
    //return;

    this.loggedUserApi.createMCarReservations(this.loggedUserApi.getCachedCurrent().id,
      {
        carId: this.car.id,
        timeStamp: new Date(),
        startDate:  new Date(this.info.startDate).getTime(),
        endDate: new Date(this.info.endDate).getTime(),
        carRate: -1,
        racRate: -1,
        combinedReservationId: this.combinedReservation.id
      }
      ).subscribe((created) => {
      this.toastr.success('Reservation successful');
      this.combinedService.refreshCombinedReservation();
      this.router.navigate(['/flow']);
    }, (err) => this.toastr.error(err.message, 'ERROR'));
    return;
  }

  onDecline() {
    this.toastr.success('Reservation canceled');
  }
}
