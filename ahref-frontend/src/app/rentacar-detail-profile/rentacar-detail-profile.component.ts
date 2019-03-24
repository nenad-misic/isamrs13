import {Component, OnInit} from '@angular/core';

import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { RentacarService } from '../services/rentacar.service';
import {RentACarService} from '../shared/rentacarservice';

@Component({
  selector: 'app-rentacar-detail-profile',
  templateUrl: './rentacar-detail-profile.component.html',
  styleUrls: ['./rentacar-detail-profile.component.scss']
})
export class RentacarDetailProfileComponent implements OnInit {

  profile: RentACarService;
  profile_new: RentACarService;

  constructor(private rentacarService: RentacarService,
              private route: ActivatedRoute,
              private location: Location) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.profile = this.rentacarService.getService(id);
    this.profile_new = new RentACarService();
    this.profile_new.id = this.profile.id;
    this.profile_new.name = this.profile.name;
    this.profile_new.address = this.profile.address;
    this.profile_new.description = this.profile.description;
  }

  goBack(): void {
    this.location.back();
  }

  onSaveClick(): void {
    console.log(this.profile.name);
    console.log(this.profile_new.name);
    this.rentacarService.saveChanges(this.profile.id, this.profile_new);
  }
}
