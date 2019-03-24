import { Injectable } from '@angular/core';
import {Car} from '../shared/car';
import {RentACarService} from '../shared/rentacarservice';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  cars: Car[] = [
    {
      id: '0',
      model: 'Golf 7',
      brand: 'VolksWagen',
      type: 'hatchback'
    },
    {
      id: '1',
      model: 'RX7',
      brand: 'Mazda',
      type: 'cabrio'
    }
  ];

  constructor() { }

  getCars(): Car[] {
    return this.cars;
  }
}
