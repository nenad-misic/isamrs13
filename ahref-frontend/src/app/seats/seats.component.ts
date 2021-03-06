import {Component, Inject, OnInit} from '@angular/core';
import {CombinedReservation, Flight, MFlightReservation, Passenger, QuickFlightReservation, Seat} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {
  AirlineApi, CombinedReservationApi,
  FlightApi,
  LoggedUserApi,
  MFlightReservationApi,
  PassengerApi,
  QuickFlightReservationApi
} from '../shared/sdk/services/custom';
import {routes} from '../app-routing/routes';
import {ToastrService} from 'ngx-toastr';
import {CombinedService} from '../services/combined.service';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  flight: Flight;
  seatlist: Seat[] = [];
  taken: Seat[] = [];
  send: Seat[] = [];
  nor: number;
  noc: number;
  rows: number[];
  cols: number[];
  msg: string;
  readType: boolean;
  combinedReservation: CombinedReservation;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private airlineApi: AirlineApi,
              private flightApi: FlightApi,
              private reserve: MFlightReservationApi,
              private userApi: LoggedUserApi,
              private combinedApi: CombinedReservationApi,
              private passApi: PassengerApi,
              private toastr: ToastrService,
              private combinedService: CombinedService,
              private quickApi: QuickFlightReservationApi,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {

    this.readType = this.userApi.getCachedCurrent().type == 'regUser';


    const id = this.route.snapshot.params['id'];
    this.flightApi.findById(id, {include : 'seats'}).subscribe((flight: Flight) => {
      this.flight = flight;
      this.seatlist = this.flight.seats;
      console.log('Sta ', this.seatlist);

      this.nor = this.seatlist[this.seatlist.length - 1].row+1;
      this.noc = this.seatlist[this.seatlist.length - 1].column+1;


      this.rows = Array(this.nor).fill(1).map((x, i) => i);
      this.cols = Array(this.noc).fill(1).map((x, i) => i);

      this.reserve.find({include: 'seat'}).subscribe((reservations: MFlightReservation[])=>{
        reservations.forEach((element) =>{
          if(element.flightId === id){
            this.seatlist.forEach((sit)=>{
              if(sit.id === element.seatId){
                this.taken.push(sit);
              }
            });
          }
        });
      });

    });


  }

  seatExists(row: number, col: number): boolean {
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col ) {
        return true;
      }
    }
    return false;
  }

  seatTaken(row: number, col: number): boolean {
    for (let i = 0; i < this.taken.length; i++) {
      if (this.taken[i] && this.taken[i].row === row && this.taken[i].column === col ) {
        return true;
      }
    }
    return false;
  }


  seatPrva(row: number, col: number) {
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col && this.seatlist[i].prva) {
        return true;
      }
    }
    return false;
  }

  seatClicked(row: number, col: number): void {
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col ) {
        this.msg = 'Good job padre! You have successfully selected your seat! Row:' + row + ', Col:' + col;
        this.taken.push(this.seatlist[i]);
        this.send.push(this.seatlist[i]);
        return;
      }
    }
    this.msg = '';
  }


  reserveSeats() {
    const combinedReservation = new CombinedReservation();
    combinedReservation.loggedUserId = this.userApi.getCachedCurrent().id;
    this.combinedApi.create(combinedReservation).subscribe((cr: CombinedReservation) => {
      this.combinedReservation = cr;
      this.combinedService.changeCombinedReservation(cr);
      for (let i = 0; i < this.send.length; i++){

        const flightrez = new MFlightReservation();
        flightrez.flightId = this.route.snapshot.params['id'];
        flightrez.seatId = this.send[i].id;
        flightrez.userId = this.userApi.getCachedCurrent().id;

        const pasn = new Passenger();
        pasn.name = this.userApi.getCachedCurrent().name;
        pasn.city = this.userApi.getCachedCurrent().city;
        pasn.telephone = this.userApi.getCachedCurrent().telephone;
        pasn.passport = '1111';
        pasn.taken = i == 0;

      this.passApi.create(pasn).subscribe(
        (p: Passenger) => {
          flightrez.passengerId = p.id;
          flightrez.combinedReservationId = this.combinedReservation.id;
          this.reserve.create(flightrez).subscribe(() => {
            console.log('Created');

          });
        });
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });



  }

  reserveSeatsAdmin(){
    const reservations = [];
    let quick = new QuickFlightReservation();
    this.quickApi.create(quick).subscribe((qres : QuickFlightReservation)=>{

      qres.mFlightReservations = [];
      for(let i=0;i < this.send.length; i++){

        const flightrez = new MFlightReservation();
        flightrez.flightId = this.route.snapshot.params['id'];
        flightrez.seatId = this.send[i].id;
        flightrez.userId = this.userApi.getCachedCurrent().id;

        const pasn = new Passenger();
        pasn.name = 'a'+i;
        pasn.city = 'a'+i;
        pasn.telephone = '1111';
        pasn.passport = '1111';
        pasn.taken = false;

        this.passApi.create(pasn).subscribe((p:Passenger)=> {

          flightrez.passengerId = p.id;
          this.quickApi.createMFlightReservations(qres.id,flightrez).subscribe((f:MFlightReservation)=>{
            qres.mFlightReservations.push(f);
          });
        });
      }
      console.log(qres);
      this.quickApi.updateAttributes(qres.id,qres).subscribe(()=> console.log('Updated'));

    });
  }

}
