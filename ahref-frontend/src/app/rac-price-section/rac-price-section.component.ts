import {Component, Inject, Input, OnInit} from '@angular/core';
import {RACService, RPriceList, RPriceListItem} from '../shared/sdk/models';
import {RACServiceApi, RPriceListApi, RPriceListItemApi} from '../shared/sdk/services/custom';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-rac-price-section',
  templateUrl: './rac-price-section.component.html',
  styleUrls: ['./rac-price-section.component.scss']
})
export class RacPriceSectionComponent implements OnInit {

  @Input()
  racService: any;

  prices: RPriceListItem[];
  priceList: RPriceList;

  carType: string;
  price: number;

  constructor(private rentacarService: RACServiceApi,
              private rPriceListApi: RPriceListApi,
              private rPriceListItemApi: RPriceListItemApi,
              private toastr: ToastrService,
              @Inject('baseURL') private baseURL) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    console.log(this.racService);
    this.rentacarService.findOne({where: {id: this.racService.id}}).subscribe((service: any) => {
      this.racService = service;
      this.rPriceListApi.findById(this.racService.rPriceListId, {include: 'priceListItems'}).subscribe((priceList: RPriceList) => {
        console.log(priceList);
        this.prices = priceList.priceListItems;
        this.priceList = priceList;
      }, (err) => {
        this.toastr.error(err.message, 'ERROR');
      });
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  addPriceClicked() {
    const newPrice = new RPriceListItem();
    newPrice.carType = this.carType;
    newPrice.price = this.price;
    this.rPriceListApi.createPriceListItems(this.priceList.id, newPrice).subscribe((obj) => {
      this.prices.push(obj);
      this.toastr.success('Price added');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }

  deletePriceClicked(price) {
    console.log(price);
    this.rPriceListItemApi.deleteById(price.id).subscribe(() => {
      this.prices = this.prices.filter(function(value, index, arr) {
        return value.id.toString() !== price.id;
      });
      this.toastr.success('Price deleted');
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
    });
  }
}
