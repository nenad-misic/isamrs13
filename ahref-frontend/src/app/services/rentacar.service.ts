import { Injectable } from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';

@Injectable({
  providedIn: 'root'
})
export class RentacarService {

  racservices: RentACarService[] = [
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
  constructor() { }

  getServices(): RentACarService[] {
    return this.racservices;
  }

  getService(id: string): RentACarService {
    return this.racservices.filter((rac) => rac.id === id)[0];
  }

  saveChanges(id: string, changes: RentACarService): boolean {
    let racToChange: RentACarService;
    racToChange = this.racservices.filter((rac) => rac.id === changes.id)[0];
    racToChange.description = changes.description;
    racToChange.address = changes.address;
    racToChange.name = changes.name;

    return true;
  }
}
