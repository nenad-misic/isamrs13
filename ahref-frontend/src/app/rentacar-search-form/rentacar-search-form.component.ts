import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car';
import {CarService} from '../services/car.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-rentacar-search-form',
  templateUrl: './rentacar-search-form.component.html',
  styleUrls: ['./rentacar-search-form.component.scss']
})
export class RentacarSearchFormComponent implements OnInit {

  search: Car = new Car();
  searchResult: Car[] = [];
  constructor(private carService: CarService,
              private data: DataService) { }

  ngOnInit() {
  }

  doSearch(): void {
    this.carService.searchCars(this.search).subscribe(searchResult => this.searchResult = searchResult);
    this.data.changeSearchParams(this.searchResult);
  }
}
