import {Component, Inject, OnInit} from '@angular/core';
import {RACService, LoggedUser, Destination} from '../shared/sdk/models';
import {RACServiceApi, LoggedUserApi, DestinationApi} from '../shared/sdk/services/custom';
import {Location} from '@angular/common';
import {LoopBackConfig} from '../shared/sdk';
import {API_VERSION} from '../shared/baseurl';

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
   /*this.userTypeService.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user) {
        if (user.type === 'racAdmin' && !user.racservice) {
          this.new_racservice.loggedUserId = user.id;
          this.service.create(this.new_racservice).subscribe((racservice: RACService) => {
            this.destinationApi.findOne({where: {name: this.city}}).subscribe((destination: Destination) => {
              racservice.destinationId = destination.id;
              this.userTypeService.updateRacservice(user.id, racservice).subscribe((returnedUser) => {
                console.log('ok');
              }, (err) => {
                // fix error!
                console.log(err);
              });
              this.new_racservice = new RACService();
            }, (err) => {
              console.log('No such destination!');
            });


          });
        }
      }
    });*/

    this.userTypeService.findOne({where: {email: this.email}}).subscribe((user: LoggedUser) => {
      if (user) {
        if (user.type === 'racAdmin' && !user.racservice) {
          this.new_racservice.loggedUserId = user.id;
          this.destinationApi.findOne({where: {name: this.city}}).subscribe((destination: Destination) => {
            console.log('debuger');
            this.new_racservice.destinationId = destination.id;
            this.service.create(this.new_racservice).subscribe((racservice: RACService) => {
              this.userTypeService.updateRacservice(user.id, racservice).subscribe((returnedUser) => {
                console.log('ok');
              }, (err) => {
                // fix error!
                console.log(err);
              });
              this.new_racservice = new RACService();
            }, (err) => {
              console.log('No such destination!');
            });


          });
        }
      }
    });
  }

}
