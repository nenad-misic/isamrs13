import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rentacar-search-form',
  templateUrl: './rentacar-search-form.component.html',
  styleUrls: ['./rentacar-search-form.component.scss']
})
export class RentacarSearchFormComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  doSearch(): void {
     // do actual search
  }
}
