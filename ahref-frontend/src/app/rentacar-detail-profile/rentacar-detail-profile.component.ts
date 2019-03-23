import {Component, Inject, Input, OnInit} from '@angular/core';
import {RentACarService} from '../shared/rentacarservice';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-rentacar-detail-profile',
  templateUrl: './rentacar-detail-profile.component.html',
  styleUrls: ['./rentacar-detail-profile.component.scss']
})
export class RentacarDetailProfileComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RentacarDetailProfileComponent>,
    @Inject(MAT_DIALOG_DATA) public data: RentACarService) {}

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    // do the save :O
    this.dialogRef.close();
  }

}
