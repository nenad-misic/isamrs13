import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MCarReservation} from '../shared/sdk/models';

@Component({
  selector: 'app-seat-reservation-actions',
  templateUrl: './seat-reservation-actions.component.html',
  styleUrls: ['./seat-reservation-actions.component.scss']
})
export class SeatReservationActionsComponent implements OnInit {

  cancelable: boolean;
  constructor(
    public dialogRef: MatDialogRef<SeatReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MCarReservation) {}


  ngOnInit() {
    if (new Date(this.res.startDate).getTime() > ((new Date()).getTime() + 10800000)) {
      this.cancelable = true;
    } else {
      this.cancelable = false;
    }
  }

  onCancelClick() {
    alert('Canceling flight +- room +- car reservation');
  }


}
