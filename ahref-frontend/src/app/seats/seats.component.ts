import {Component, Inject, OnInit} from '@angular/core';
import {Flight, Seat} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AirlineApi, FlightApi} from '../shared/sdk/services/custom';
import {routes} from '../app-routing/routes';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  flight: Flight;
  seatlist: Seat[] = [];
  taken: Seat[] = [];
  nor: number;
  noc: number;
  rows: number[];
  cols: number[];
  msg: string;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private airlineApi: AirlineApi,
              private flightApi: FlightApi,
              @Inject('baseURL') private baseURL) { }

  ngOnInit() {

    const id = this.route.snapshot.params['id'];
    this.flightApi.findById(id, {include : 'seats'}).subscribe((flight: Flight) => {
      this.flight = flight;
      this.seatlist = this.flight.seats;
      console.log('Sta ', this.seatlist);
    });


    this.nor = 5;
    this.noc = 5;


    this.rows = Array(this.nor).fill(1).map((x, i) => i);
    this.cols = Array(this.noc).fill(1).map((x, i) => i);
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

  seatClicked(row: number, col: number): void {
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col ) {
        this.msg = 'Good job padre! You have successfully selected your seat! Row:' + row + ', Col:' + col;
        this.taken[i] = this.seatlist[i];
        return;
      }
    }
    this.msg = '';
  }


  reserveSeats() {
    console.log('Ovde rezervisem te karte valjda?');
  }
}
