import {Component, Inject, OnInit} from '@angular/core';
import {LoggedUser, MCarReservation, MFlightReservation, MRoomReservation} from '../shared/sdk/models';
import {LoggedUserApi, MFlightReservationApi, MRoomReservationApi} from '../shared/sdk/services/custom';
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
  myFlightReservations: MFlightReservation[] = [];


  public isCollapsedFlight = true;
  public isCollapsedHotel = true;
  public isCollapsedCar = true;

  displayedColumnsC: string[] = ['timeStamp', 'startDate', 'endDate', 'car'];
  displayedColumnsR: string[] = ['timeStamp', 'startDate', 'endDate', 'room'];
  displayedColumnsF: string[] = ['flightId', 'seatId', 'id'];

  constructor(private userApi: LoggedUserApi,
              private mFlightReservationApi: MFlightReservationApi,
              private mRoomReservationApi: MRoomReservationApi,
              @Inject('baseURL') private baseURL,
              public dialog: MatDialog) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
  ngOnInit() {

    this.userApi.getCurrent({include: 'mCarReservations'}).subscribe((lu: LoggedUser) => {
      this.myCarReservations = lu.mCarReservations;
    });

    this.userApi.getCurrent({include: 'mRoomReservations'}).subscribe((lu: LoggedUser) => {
      this.myRoomReservations = lu.mRoomReservations;
    });

    this.mFlightReservationApi.find({where: {userId: this.userApi.getCachedCurrent().id}}).subscribe((results: MFlightReservation[]) => {
      results.forEach((res) => {
        this.myFlightReservations.push(res);
        console.log(res);
      });
    });
    this.mFlightReservationApi.find({where: {passengerId: this.userApi.getCachedCurrent().id}}).subscribe((results: MFlightReservation[]) => {
      results.forEach((res) => {
        this.myFlightReservations.push(res);
      });
    });
  }




  onClickedCar(row) {
    const dialogRefC = this.dialog.open(CarReservationActionsComponent, {
      width: '650px',
      data: row
    });


    dialogRefC.afterClosed().subscribe(result => {
      if (result) {
        this.myCarReservations = this.myCarReservations.filter(function(value, index, arr) {
          return value.id.toString() !== result;
        });
      }
    });
  }
  onClickedRoom(row) {
    const dialogRefR = this.dialog.open(RoomReservationActionsComponent, {
      width: '650px',
      data: row
    });

    dialogRefR.afterClosed().subscribe(result => {
      if (result) {
        this.myRoomReservations = this.myRoomReservations.filter(function(value, index, arr) {
          return value.id.toString() !== result;
        });
      } else {
        let indeksObrisanog = -1;
        this.myRoomReservations = this.myRoomReservations.filter(function(value, index, arr) {
          if ( value.id.toString === result ) {
            indeksObrisanog = index;
          }
          return value.id.toString() !== result;
        });
        if (indeksObrisanog !== -1) {
          this.mRoomReservationApi.findOne({where: {id: result}}).subscribe((res: MRoomReservation) => {
            this.myRoomReservations.splice(indeksObrisanog, 0, res);
          });
        }

      }
    });

  }
  onClickedSeat(row) {
    const dialogRefS = this.dialog.open(SeatReservationActionsComponent, {
      width: '650px',
      data: row
    });
    dialogRefS.afterClosed().subscribe(result => {
      if (result) {
        this.myFlightReservations = this.myFlightReservations.filter(function(value, index, arr) {
          return value.id.toString() !== result;
        });
      } else {
        this.ngOnInit();
      }
    });

  }

}
