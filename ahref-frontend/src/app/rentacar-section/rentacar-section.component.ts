import { Component, OnInit } from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';
import {Car} from '../shared/car';

@Component({
  selector: 'app-rentacar-section',
  templateUrl: './rentacar-section.component.html',
  styleUrls: ['./rentacar-section.component.scss']
})
export class RentacarSectionComponent implements OnInit {

  racservices: RentACarService[];
  searchedCars: Car[];

  constructor() { }

  ngOnInit() {
    this.racservices = [
      {
        id: '1',
        name: 'Rent a car service number one',
        description: 'The best rent a car service in Novi Sad',
        address: 'Bulevar Oslobodjenja 1, Novi Sad'
      },
      {
        id: '2',
        name: 'Rent a car service number two',
        description: 'The best rent a car service in Belgrade',
        address: 'Bulevar Kralja Aleksandra 2, Belgrade'
      },
      {
        id: '3',
        name: 'Rent a car service number three',
        description: 'The best rent a car service in New York',
        address: '123 6th Avenue, New York'
      },
      {
        id: '4',
        name: 'Rent a car service number four',
        description: 'The best rent a car service in Kabul',
        address: 'Alahu Akhbar 13, Kabul'
      },
    ];
  }

}
