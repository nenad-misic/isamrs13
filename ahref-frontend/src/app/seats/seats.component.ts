import {Component, Inject, OnInit} from '@angular/core';
import {Flight, Seat} from '../shared/sdk/models';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {AirlineApi, FlightApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-seats',
  templateUrl: './seats.component.html',
  styleUrls: ['./seats.component.scss']
})
export class SeatsComponent implements OnInit {

  seatlist: Seat[] = [];
  taken: boolean[] = [];
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
      console.log('Dosao', flight.id);
     // this.seatlist = flight.seats;
    });

    this.nor = 5;
    this.noc = 10;


    this.rows = Array(this.nor).fill(0).map((x, i) => i);
    this.cols = Array(this.noc).fill(0).map((x, i) => i);

    for (let r = 0; r < this.nor; r++) {
      for (let c = 0; c < this.noc; c++) {
        const seat = new Seat();
        seat.row = r;
        seat.column = c;
        this.seatlist.push(seat);
      }
    }
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
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col ) {
        return this.taken[i];
      }
    }
    return false;
  }

  seatClicked(row: number, col: number): void {
    for (let i = 0; i < this.seatlist.length; i++) {
      if (this.seatlist[i].row === row && this.seatlist[i].column === col ) {
        if (this.taken[i]) {
          this.msg = 'Selected seat is taken and reservation button should be disabled for you idioto. Row:' + row + ', Col:' + col;
          return;
        } else {
          this.msg = 'Good job padre! You have successfully selected your seat! Row:' + row + ', Col:' + col;
          return;
        }
      }
    }
    this.msg = '';
  }

}
