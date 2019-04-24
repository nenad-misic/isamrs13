import {Component, Input, OnInit} from '@angular/core';
import {HPriceList, HPriceListItem} from '../shared/sdk/models';
import {HPriceListApi} from '../shared/sdk/services/custom';

@Component({
  selector: 'app-additional-service-add-form',
  templateUrl: './additional-service-add-form.component.html',
  styleUrls: ['./additional-service-add-form.component.scss']
})
export class AdditionalServiceAddFormComponent implements OnInit {

  @Input()
  aservices: HPriceList;

  new_aservice: HPriceListItem = new HPriceListItem();

  constructor(private aserviceApi: HPriceListApi) { }

  ngOnInit() {
    this.aserviceApi.findOne({where: {id: this.aservices.id}, include: 'priceListItems'} ).subscribe((as: HPriceList) => {
      this.aservices = as;
    });
    this.new_aservice = new HPriceListItem();
  }

  addSerivceClicked() {
    this.new_aservice.hPriceListId = this.aservices.id;
    this.aserviceApi.createPriceListItems(this.aservices.id, this.new_aservice).subscribe(() => {
      this.new_aservice = new HPriceListItem();
    });
  }
}
