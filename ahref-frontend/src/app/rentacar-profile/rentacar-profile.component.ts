import {Component, Input, OnInit} from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';
import {MatDialog} from '@angular/material';
import {RentacarDetailProfileComponent} from '../rentacar-detail-profile/rentacar-detail-profile.component';

@Component({
  selector: 'app-rentacar-profile',
  templateUrl: './rentacar-profile.component.html',
  styleUrls: ['./rentacar-profile.component.scss']
})
export class RentacarProfileComponent implements OnInit {

  @Input()
  profile: RentACarService;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RentacarDetailProfileComponent, {
      width: '500px',
      data: this.profile
    });

  }

}
