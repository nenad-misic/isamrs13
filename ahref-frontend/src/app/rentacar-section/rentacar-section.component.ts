import { Component, OnInit } from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';
import {RentacarService} from '../services/rentacar.service';

@Component({
  selector: 'app-rentacar-section',
  templateUrl: './rentacar-section.component.html',
  styleUrls: ['./rentacar-section.component.scss']
})
export class RentacarSectionComponent implements OnInit {

  racservices: RentACarService[];

  constructor(private rentacarService: RentacarService) { }

  ngOnInit() {
    this.racservices = this.rentacarService.getServices();
  }

}
