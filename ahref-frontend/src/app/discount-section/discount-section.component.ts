import {Component, Inject, OnInit} from '@angular/core';
import {Discount} from "../shared/sdk/models";
import {DiscountApi, LoggedUserApi} from "../shared/sdk/services/custom";
import {LoopBackConfig} from "../shared/sdk";
import {API_VERSION} from "../shared/baseurl";
import {ToastrService} from "ngx-toastr";
import {Location} from "@angular/common";

@Component({
  selector: 'app-discount-section',
  templateUrl: './discount-section.component.html',
  styleUrls: ['./discount-section.component.scss']
})
export class DiscountSectionComponent implements OnInit {

  discounts: Discount[];
  readOnly: boolean;
  new_discount: Discount;

  constructor(private disountApi: DiscountApi,
              @Inject('baseURL') private baseURL,
              private userApi: LoggedUserApi,
              private toastr: ToastrService,
              private location: Location) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    this.readOnly = this.userApi.getCachedCurrent().type != 'sysAdmin';
    this.new_discount = new Discount();
    this.disountApi.find().subscribe((discounts: Discount[]) => {
      this.discounts = discounts;
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
  }

  onAddDiscount() {
    this.disountApi.create(this.new_discount).subscribe(() => {
      this.toastr.success("Discount added");
      this.discounts.push(JSON.parse(JSON.stringify(this.new_discount)));
      this.new_discount = new Discount();
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
  }

  onDeleteDiscount(d: Discount) {
    this.disountApi.deleteById(d.id).subscribe(() => {
      this.discounts.splice(this.discounts.indexOf(d), 1);
      this.toastr.success("Discount deleted");
    }, (err) => {
      this.toastr.error(err.message, "ERROR");
    });
  }

  onBack() {
    this.location.back();
  }

}
