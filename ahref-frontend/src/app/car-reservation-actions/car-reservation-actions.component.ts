import {Component, Inject, Input, OnInit} from '@angular/core';
import {Car, MCarReservation, RACService} from '../shared/sdk/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {CarApi, LoggedUserApi, MCarReservationApi, RACServiceApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-reservation-actions',
  templateUrl: './car-reservation-actions.component.html',
  styleUrls: ['./car-reservation-actions.component.scss']
})
export class CarReservationActionsComponent implements OnInit {

  cancelable: boolean;
  resc;
  constructor(private mcarReservationApi: MCarReservationApi,
              private loggedUserApi: LoggedUserApi,
              private carapi: CarApi,
              private racapi: RACServiceApi,
              private toastr: ToastrService,
    public dialogRef: MatDialogRef<CarReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MCarReservation) {}


  ngOnInit() {
    this.resc = JSON.parse(JSON.stringify(this.res));
    if (new Date(this.res.startDate).getTime() > ((new Date()).getTime() + 172800000)) {
      this.cancelable = true;
    } else {
      this.cancelable = false;
    }
  }

  onCancelClick() {
    if (this.cancelable) {
      this.loggedUserApi.destroyByIdMCarReservations(this.loggedUserApi.getCachedCurrent().id, this.res.id).subscribe((success) => {
        this.toastr.success('Car reservation cancelled successfully', 'Reservation cancelled');
        this.dialogRef.close(this.res.id);
      }, (err) => {
        this.toastr.error('Reservation couldn\'t be cancelled');
      });
    }
  }

  onSave() {
    if (this.resc.racRate === -1 || this.resc.carRate === -1) {
      this.toastr.error('Please input rating before saving!');
    } else if (new Date(this.res.endDate).getTime() > new Date().getTime()) {
      this.toastr.error('It is to early for rating!');
    } else {
      this.mcarReservationApi.updateAttributes(this.res.id, this.resc).subscribe((response) => {
          this.toastr.success('Reservation successfully saved', 'Success');
          this.res = this.resc;
          this.carapi.findById(this.res.carId).subscribe((car: Car) => {
            const uk = car.numOfRates * car.rating;
            car.numOfRates += 1;
            car.rating = (uk + this.res.carRate) / car.numOfRates;
            this.carapi.updateAttributes(car.id, car).subscribe((response1) => console.log('Car rate success'));

            this.racapi.findById(car.rACServiceId).subscribe((rac: RACService) => {
              const ukr = rac.numOfRates * rac.rating;
              rac.numOfRates += 1;
              rac.rating = (ukr + this.res.racRate) / rac.numOfRates;
              this.racapi.updateAttributes(rac.id, rac).subscribe((response2) => console.log('Rac rate success'));
            });
          });
        }
      );
    }
  }

}
