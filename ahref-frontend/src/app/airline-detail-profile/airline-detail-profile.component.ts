import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import { API_VERSION } from '../shared/baseurl';
import {AirlineApi, LoggedUserApi, LoopBackConfig} from '../shared/sdk';
import { Airline } from '../shared/sdk/models';

@Component({
  selector: 'app-airline-detail-profile',
  templateUrl: './airline-detail-profile.component.html',
  styleUrls: ['./airline-detail-profile.component.scss']
})
export class AirlineDetailProfileComponent implements OnInit {

  profile: Airline;
  profile_new: Airline;
  readOnly = true;

  constructor(private airlineService: AirlineApi,
              private route: ActivatedRoute,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    console.log('Nisam dosao');
    const id = this.route.snapshot.params['id'];
    console.log(id);
    this.airlineService.findOne({where: {id: id}}).subscribe((airline: Airline) => {
      this.profile = airline;
      this.profile_new = new Airline();
      this.profile_new.id = this.profile.id;
      this.profile_new.name = this.profile.name;
      this.profile_new.address = this.profile.address;
      this.profile_new.latitude = this.profile.latitude;
      this.profile_new.longitude = this.profile.longitude;
      this.profile_new.description = this.profile.description;
      this.profile_new.rating = this.profile.rating;
      this.profile_new.numOfRates = this.profile.numOfRates;

        if (this.profile.loggedUserId === this.userApi.getCachedCurrent().id) {
          this.readOnly = false;
        } else {
          this.readOnly = true;
        }
      }
    );

  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    this.airlineService.updateAttributes(this.profile.id, this.profile_new).subscribe((returned: Airline) => { if (!returned) {console.log(status); }});
    this.location.back();
  }
}
