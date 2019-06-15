import {Component, Inject, OnInit} from '@angular/core';
import {RACService, LoggedUser, Destination, Hotel} from '../shared/sdk/models';
import {RACServiceApi, LoggedUserApi, DestinationApi, RPriceListApi} from '../shared/sdk/services/custom';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-rentacar-add-form',
  templateUrl: './rentacar-add-form.component.html',
  styleUrls: ['./rentacar-add-form.component.scss']
})
export class RentacarAddFormComponent implements OnInit {

  new_racservice: RACService;
  type: string;
  email: string;
  city: string;
  constructor(private service: RACServiceApi,
              private location: Location,
              @Inject('baseURL') private baseURL,
              private userTypeService: LoggedUserApi,
              private toastr: ToastrService,
              private racServiceApiMotherF: RACServiceApi,
              private rPriceApi: RPriceListApi,
              private destinationApi: DestinationApi) {
    LoopBackConfig.setBaseURL(baseURL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }

  ngOnInit() {
    if ( this.userTypeService.getCachedCurrent() ) {
      this.type = this.userTypeService.getCachedCurrent().type;
    } else {
      this.type = '';
    }
    this.new_racservice = new RACService();
    this.new_racservice.rating = 0;
    this.new_racservice.numOfRates = 0;
  }


  addRACService() {
    this.userTypeService.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user) {
        if (user.type === 'racAdmin' && !user.hotel) {
          this.destinationApi.findOne({where: {name: this.city}}).subscribe((destination: Destination) => {
            if (destination) {
              this.new_racservice.destinationId = destination.id;
            } else {
              this.toastr.error('No destination named like that thot!');
            }
            this.new_racservice.loggedUserId = user.id;
            this.racServiceApiMotherF.create(this.new_racservice).subscribe((rac: RACService) => {
              this.toastr.success(rac.name, 'Rent a car service added');
              this.new_racservice = new RACService();
            }, (err) => {
              this.toastr.error(err.message, 'ERROR');
            });
          }, (err) => {
            this.toastr.error('No destination named like that thot!');
          });
        }
      }
    }, (err) => {
      this.toastr.error(err.message, 'ERROR');
      this.new_racservice = new RACService();
    });

  }
}
