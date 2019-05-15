import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {MCarReservation, MRoomReservation} from '../shared/sdk/models';
import {LoggedUserApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-reservation-actions',
  templateUrl: './room-reservation-actions.component.html',
  styleUrls: ['./room-reservation-actions.component.scss']
})
export class RoomReservationActionsComponent implements OnInit {

  cancelable: boolean;
  constructor(
    public dialogRef: MatDialogRef<RoomReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MRoomReservation,
    private loggedUserApi: LoggedUserApi,
    private toastr: ToastrService) {}


  ngOnInit() {
    if (new Date(this.res.startDate).getTime() > ((new Date()).getTime() + 172800000)) {
      this.cancelable = true;
    } else {
      this.cancelable = false;
    }
  }


  onCancelClick() {
    if (this.cancelable) {
      this.loggedUserApi.destroyByIdMRoomReservations(this.loggedUserApi.getCachedCurrent().id, this.res.id).subscribe((success) => {
        this.toastr.success('Room reservation cancelled successfully', 'Reservation cancelled');
        this.dialogRef.close(this.res.id);
      }, (err) => {
        this.toastr.error('Reservation couldn\'t be cancelled');
      });
    }
  }


}
