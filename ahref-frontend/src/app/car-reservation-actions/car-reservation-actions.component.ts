import {Component, Inject, Input, OnInit} from '@angular/core';
import {MCarReservation} from '../shared/sdk/models';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-car-reservation-actions',
  templateUrl: './car-reservation-actions.component.html',
  styleUrls: ['./car-reservation-actions.component.scss']
})
export class CarReservationActionsComponent implements OnInit {

  cancelable: boolean;
  constructor(
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
    alert('Canceling car reservation');
  }

}
