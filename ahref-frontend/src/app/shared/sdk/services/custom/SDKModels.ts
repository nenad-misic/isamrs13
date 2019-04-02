/* tslint:disable */
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Airline } from '../../models/Airline';
import { Flight } from '../../models/Flight';
import { Seat } from '../../models/Seat';
import { APriceList } from '../../models/APriceList';
import { APriceListItem } from '../../models/APriceListItem';
import { Destination } from '../../models/Destination';
import { Hotel } from '../../models/Hotel';
import { Room } from '../../models/Room';
import { DatePrice } from '../../models/DatePrice';
import { HPriceList } from '../../models/HPriceList';
import { HPriceListItem } from '../../models/HPriceListItem';
import { RACService } from '../../models/RACService';
import { BranchOffice } from '../../models/BranchOffice';
import { Car } from '../../models/Car';
import { RPriceList } from '../../models/RPriceList';
import { RPriceListItem } from '../../models/RPriceListItem';
import { God } from '../../models/God';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    User: User,
    Airline: Airline,
    Flight: Flight,
    Seat: Seat,
    APriceList: APriceList,
    APriceListItem: APriceListItem,
    Destination: Destination,
    Hotel: Hotel,
    Room: Room,
    DatePrice: DatePrice,
    HPriceList: HPriceList,
    HPriceListItem: HPriceListItem,
    RACService: RACService,
    BranchOffice: BranchOffice,
    Car: Car,
    RPriceList: RPriceList,
    RPriceListItem: RPriceListItem,
    God: God,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
