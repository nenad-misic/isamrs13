import {Component, Inject, Input, OnInit} from '@angular/core';
import {Destination, Flight, Passenger, QuickFlightReservation} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {
  AirlineApi,
  DestinationApi,
  FlightApi,
  LoggedUserApi,
  MFlightReservationApi, PassengerApi,
  QuickFlightReservationApi,
  SeatApi
} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

@Component({
  selector: 'app-quick-flight-profile',
  templateUrl: './quick-flight-profile.component.html',
  styleUrls: ['./quick-flight-profile.component.scss']
})
export class QuickFlightProfileComponent implements OnInit {

  @Input()
  reservation: QuickFlightReservation;
  flight : Flight;
  noSeats: String;
  removeBul : boolean;


  constructor(private route: ActivatedRoute,
              private location: Location,
              private flightApi: FlightApi,
              private airlineApi: AirlineApi,
              private seatApi: SeatApi,
              private loggedUserApi: LoggedUserApi,
              private reservationApi: QuickFlightReservationApi,
              private passengerApi: PassengerApi,
              private flightres : MFlightReservationApi,
              private toastr: ToastrService,
              private destinationApi: DestinationApi,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION); }

  ngOnInit() {

    this.reservationApi.findById(this.reservation.id,{include: 'mFlightReservations'}).subscribe((res : QuickFlightReservation)=>{
      console.log(res);
      this.noSeats = res.mFlightReservations.length+'';

      this.removeBul = res.mFlightReservations[0].userId == this.loggedUserApi.getCachedCurrent().id && this.loggedUserApi.getCachedCurrent().type == 'airlineAdmin';
      console.log(this.removeBul, ' removed bull');
      this.flightApi.findById(res.mFlightReservations[0].flightId,{include: ['startDestination','endDestination']}).subscribe((fl: Flight)=>{
        this.flight = fl;
      });
    });

  }

  remove() {

    this.reservationApi.findById(this.reservation.id,{include: 'mFlightReservations'}).subscribe((res: QuickFlightReservation) =>{
      console.log('STANJE ',res.mFlightReservations);
      for(let i=0; i<res.mFlightReservations.length;i++){
        console.log('Stanje sta ');
        this.passengerApi.deleteById(res.mFlightReservations[i].passengerId).subscribe(()=>console.log('Deleted passenger'));
        this.flightres.deleteById(res.mFlightReservations[i].id).subscribe(()=> console.log('Deleted res'));
        if(i==res.mFlightReservations.length-1)
          this.reservationApi.deleteById(this.reservation.id).subscribe(()=>console.log('Deleted'));
      }
    });


  }

  book() {
    this.reservationApi.findById(this.reservation.id,{include: 'mFlightReservations'}).subscribe((quick: QuickFlightReservation) =>{

      for(let i =0;i<quick.mFlightReservations.length;i++){
        this.passengerApi.findById(quick.mFlightReservations[i].passengerId).subscribe((pas: Passenger)=>{
          quick.mFlightReservations[i].userId = this.loggedUserApi.getCachedCurrent().id;
          pas.name = this.loggedUserApi.getCachedCurrent().name;
          pas.city = this.loggedUserApi.getCachedCurrent().city;
          pas.telephone = this.loggedUserApi.getCachedCurrent().telephone;
          pas.passport = '1111';
          pas.taken = i == 0;

          this.passengerApi.updateAttributes(pas.id,pas).subscribe(()=>{
            this.flightres.updateAttributes(quick.mFlightReservations[i].id,quick.mFlightReservations[i]).subscribe(()=>{
              console.log('Updated ',i);
              if(i==quick.mFlightReservations.length-1){
                this.reservationApi.deleteById(this.reservation.id).subscribe(()=>console.log('Deleted quick reservation'));
              }
            });
          });
        });
      }


    });
  }
}
