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
    this.searchResult = this.carService.getCars();
    if (this.search.id) {
      this.searchResult = this.searchResult.filter((car) => car.id === this.search.id);
    }
    if (this.search.brand) {
      this.searchResult = this.searchResult.filter((car) => car.brand === this.search.brand);
    }
    if (this.search.model) {
      this.searchResult = this.searchResult.filter((car) => car.model === this.search.model);
    }
    if (this.search.type) {
      this.searchResult = this.searchResult.filter((car) => car.type === this.search.type);
    }
    console.log(this.searchResult);
    this.data.changeSearchParams(this.searchResult);
  }
}
