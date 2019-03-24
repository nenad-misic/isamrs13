import { Component, OnInit } from '@angular/core';
import {Car} from '../shared/car';
import {CarService} from '../services/car.service';
import {DataService} from '../services/data.service';

@Component({
  selector: 'app-car-section',
  templateUrl: './car-section.component.html',
  styleUrls: ['./car-section.component.scss']
})
export class CarSectionComponent implements OnInit {


  cars: Car[];

  constructor(private carService: CarService,
              private data: DataService) { }

  ngOnInit() {
    this.data.currentSearchParams.subscribe(searchList => this.cars = searchList );
  }

}
