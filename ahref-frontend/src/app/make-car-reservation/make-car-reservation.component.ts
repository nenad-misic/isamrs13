import { Component, OnInit } from '@angular/core';
import {CarReservationDataService} from '../services/car-reservation-data.service';
import {CarApi, MCarReservationApi} from '../shared/sdk/services/custom';
import {CarReservationInfo} from '../shared/carReservationInfo';
import {Car} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-make-car-reservation',
  templateUrl: './make-car-reservation.component.html',
  styleUrls: ['./make-car-reservation.component.scss']
})
export class MakeCarReservationComponent implements OnInit {

  errmsg: string;

  info: CarReservationInfo;
  car: Car;
  constructor(private carReservationData: CarReservationDataService,
              private mCarReservationApi: MCarReservationApi,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private carApi: CarApi) { }

  ngOnInit() {
    this.carApi.findOne({where: {id: this.route.snapshot.params['id']}}).subscribe((car: Car) => this.car = car);
    this.carReservationData.currentSearchParams.subscribe(info => this.info = info );
  }


  onConfirm() {
    this.mCarReservationApi.create({carId: this.car.id, timeStamp: new Date(), startDate:  new Date(this.info.startDate).getTime(), endDate: new Date(this.info.endDate).getTime()}).
    subscribe((created) => this.toastr.success('Reservation successful'), (err) => this.toastr.error(err.message, 'ERROR'));
    return;
  }

  onDecline() {
    this.toastr.success('Reservation canceled')
  }
}
