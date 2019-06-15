import {Component, Input, OnInit} from '@angular/core';
import {HPriceList, HPriceListItem} from '../shared/sdk/models';
import {HPriceListApi} from '../shared/sdk/services/custom';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-additional-service-add-form',
  templateUrl: './additional-service-add-form.component.html',
  styleUrls: ['./additional-service-add-form.component.scss']
})
export class AdditionalServiceAddFormComponent implements OnInit {

  @Input()
  aservices: HPriceList;

  new_aservice: HPriceListItem = new HPriceListItem();

  constructor(private aserviceApi: HPriceListApi,
              private toastr: ToastrService) { }

  ngOnInit() {
    this.aserviceApi.findOne({where: {id: this.aservices.id}, include: 'priceListItems'} ).subscribe((as: HPriceList) => {
      this.aservices = as;
    });
    this.new_aservice = new HPriceListItem();
  }

  addSerivceClicked() {
    if (this.new_aservice.discount > 100) {
      this.toastr.error('Discount cant be greater than 100');
      return;
    }
    this.new_aservice.hPriceListId = this.aservices.id;
    this.aserviceApi.createPriceListItems(this.aservices.id, this.new_aservice).subscribe(() => {
      this.new_aservice = new HPriceListItem();
      this.toastr.success(this.new_aservice.name, 'Additional service added');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
