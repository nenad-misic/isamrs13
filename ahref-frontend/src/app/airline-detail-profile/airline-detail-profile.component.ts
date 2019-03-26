import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Airline} from '../shared/airline';
import {AirlineService} from '../services/airline.service';

@Component({
  selector: 'app-airline-detail-profile',
  templateUrl: './airline-detail-profile.component.html',
  styleUrls: ['./airline-detail-profile.component.scss']
})
export class AirlineDetailProfileComponent implements OnInit {

  profile: Airline;
  profile_new: Airline;

  constructor(private airlineService: AirlineService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.airlineService.getAirline(id).subscribe(airline => {
        this.profile = airline;
        this.profile_new = new Airline();
        this.profile_new.id = this.profile.id;
        this.profile_new.name = this.profile.name;
        this.profile_new.address = this.profile.address;
        this.profile_new.description = this.profile.description;
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.airlineService.saveChanges(this.profile.id, this.profile_new).subscribe(status => console.log(status));
    this.location.back();
  }
}
