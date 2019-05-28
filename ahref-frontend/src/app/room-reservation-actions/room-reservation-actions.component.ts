import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Car, Hotel, MCarReservation, MRoomReservation, RACService, Room} from '../shared/sdk/models';
import {HotelApi, LoggedUserApi, MRoomReservationApi, RoomApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-room-reservation-actions',
  templateUrl: './room-reservation-actions.component.html',
  styleUrls: ['./room-reservation-actions.component.scss']
})
export class RoomReservationActionsComponent implements OnInit {

  cancelable: boolean;
  resc;
  constructor(
    public dialogRef: MatDialogRef<RoomReservationActionsComponent>,
    @Inject(MAT_DIALOG_DATA) public res: MRoomReservation,
    private loggedUserApi: LoggedUserApi,
    private roomApi: RoomApi,
    private hotelApi: HotelApi,
    private mRoomReservationApi: MRoomReservationApi,
    private toastr: ToastrService) {}


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
      this.loggedUserApi.destroyByIdMRoomReservations(this.loggedUserApi.getCachedCurrent().id, this.res.id).subscribe((success) => {
        this.toastr.success('Room reservation cancelled successfully', 'Reservation cancelled');
        this.dialogRef.close(this.res.id);
      }, (err) => {
        this.toastr.error('Reservation couldn\'t be cancelled');
      });
    }
  }

  onSave() {
    if (this.resc.roomRate === -1 || this.resc.hotelRate === -1) {
      this.toastr.error('Please input rating before saving!');
    } else if (new Date(this.res.endDate).getTime() > new Date().getTime()) {
      this.toastr.error('It is to early for rating!');
    } else {
      this.mRoomReservationApi.updateAttributes(this.res.id, this.resc).subscribe((response) => {
          this.toastr.success('Reservation successfully saved', 'Success');
          this.res = this.resc;
          this.roomApi.findById(this.res.roomId).subscribe((room: Room) => {
            const uk = room.numOfRates * room.rating;
            room.numOfRates += 1;
            room.rating = (uk + this.res.roomRate) / room.numOfRates;
            this.roomApi.updateAttributes(room.id, room).subscribe((response1) => console.log('Room rate success'));

            this.hotelApi.findById(room.hotelId).subscribe((hotel: Hotel) => {
              const ukr = hotel.numOfRates * hotel.rating;
              hotel.numOfRates += 1;
              hotel.rating = (ukr + this.res.hotelRate) / hotel.numOfRates;
              this.hotelApi.updateAttributes(hotel.id, hotel).subscribe((response2) => console.log('Hotel rate success'));
            });
          });
        }
      );
    }
  }

}
