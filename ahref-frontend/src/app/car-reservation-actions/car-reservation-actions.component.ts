import {Component, Inject, Input, OnInit} from '@angular/core';
import {MCarReservation} from '../shared/sdk/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {LoggedUserApi, MCarReservationApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-car-reservation-actions',
  templateUrl: './car-reservation-actions.component.html',
  styleUrls: ['./car-reservation-actions.component.scss']
})
export class CarReservationActionsComponent implements OnInit {

  cancelable: boolean;
  constructor(private mcarReservationApi: MCarReservationApi,
              private loggedUserApi: LoggedUserApi,
              private toastr: ToastrService,
    public dialogRef: MatDialogRef<CarReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MCarReservation) {}


  ngOnInit() {
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

}
