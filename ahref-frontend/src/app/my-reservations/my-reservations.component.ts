import {Component, Inject, OnInit} from '@angular/core';
import {LoggedUser, MCarReservation, MFlightReservation, MRoomReservation} from '../shared/sdk/models';
import {LoggedUserApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {MatDialog} from '@angular/material';
import {CarReservationActionsComponent} from '../car-reservation-actions/car-reservation-actions.component';
import {RoomReservationActionsComponent} from '../room-reservation-actions/room-reservation-actions.component';
import {SeatReservationActionsComponent} from '../seat-reservation-actions/seat-reservation-actions.component';

@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.scss']
})
export class MyReservationsComponent implements OnInit {

  myCarReservations: MCarReservation[];
  myRoomReservations: MRoomReservation[];
  myFlightReservations: MFlightReservation[];


  public isCollapsedFlight = true;
  public isCollapsedHotel = true;
  public isCollapsedCar = true;

  displayedColumnsC: string[] = ['timeStamp', 'startDate', 'endDate', 'car'];
  displayedColumnsR: string[] = ['timeStamp', 'startDate', 'endDate', 'room'];
  displayedColumnsF: string[] = ['timeStamp', 'startDate', 'endDate', 'seat'];

  constructor(private userApi: LoggedUserApi,
              @Inject('baseURL') private baseURL,
              public dialog: MatDialog) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  ngOnInit() {

    this.userApi.getCurrent({include: 'mCarReservations'}).subscribe((lu: LoggedUser) => {
      this.myCarReservations = lu.mCarReservations;
    });
  }


  onClickedCar(row) {
    const dialogRef = this.dialog.open(CarReservationActionsComponent, {
      width: '650px',
      data: row
    });


    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.myCarReservations = this.myCarReservations.filter(function(value, index, arr) {
          return value.id.toString() !== result;
        });
      }
    });
  }
  onClickedRoom(row) {
    const dialogRef = this.dialog.open(RoomReservationActionsComponent, {
      width: '650px',
      data: row
    });

  }
  onClickedSeat(row) {
    const dialogRef = this.dialog.open(SeatReservationActionsComponent, {
      width: '650px',
      data: row
    });
  }

}
