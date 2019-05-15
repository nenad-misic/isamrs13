import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MCarReservation} from '../shared/sdk/models';

@Component({
  selector: 'app-room-reservation-actions',
  templateUrl: './room-reservation-actions.component.html',
  styleUrls: ['./room-reservation-actions.component.scss']
})
export class RoomReservationActionsComponent implements OnInit {

  cancelable: boolean;
  constructor(
    public dialogRef: MatDialogRef<RoomReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MCarReservation) {}


  ngOnInit() {
    if (new Date(this.res.startDate).getTime() > ((new Date()).getTime() + 172800000)) {
      this.cancelable = true;
    } else {
      this.cancelable = false;
    }
  }

  onCancelClick() {
    alert('Canceling room reservation');
  }


}
