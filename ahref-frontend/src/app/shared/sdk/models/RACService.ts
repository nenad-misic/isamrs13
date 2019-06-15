/* tslint:disable */
import {
  Destination,
  BranchOffice,
  Car,
  RPriceList
} from '../index';

declare var Object: any;
export interface RACServiceInterface {
  "name": string;
  "address": string;
  "latitude": number;
  "longitude": number;
  "description": string;
  "rating": number;
  "numOfRates": number;
  "id"?: any;
  "destinationId"?: any;
  "loggedUserId"?: any;
  destination?: Destination;
  branchOffices?: BranchOffice[];
  cars?: Car[];
  rPriceList?: RPriceList;
}

export class RACService implements RACServiceInterface {
  "name": string;
  "address": string;
  "latitude": number;
  "longitude": number;
  "description": string;
  "rating": number;
  "numOfRates": number;
  "id": any;
  "destinationId": any;
  "loggedUserId": any;
  destination: Destination;
  branchOffices: BranchOffice[];
  cars: Car[];
  rPriceList: RPriceList;
  constructor(data?: RACServiceInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RACService`.
   */
  public static getModelName() {
    return "RACService";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RACService for dynamic purposes.
  **/
  public static factory(data: RACServiceInterface): RACService{
    return new RACService(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'RACService',
      plural: 'RACServices',
      path: 'RACServices',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "address": {
          name: 'address',
          type: 'string'
        },
        "latitude": {
          name: 'latitude',
          type: 'number'
        },
        "longitude": {
          name: 'longitude',
          type: 'number'
        },
        "description": {
          name: 'description',
          type: 'string'
        },
        "rating": {
          name: 'rating',
          type: 'number',
          default: 0
        },
        "numOfRates": {
          name: 'numOfRates',
          type: 'number',
          default: 0
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "destinationId": {
          name: 'destinationId',
          type: 'any'
        },
        "loggedUserId": {
          name: 'loggedUserId',
          type: 'any'
        },
      },
      relations: {
        destination: {
          name: 'destination',
          type: 'Destination',
          model: 'Destination',
          relationType: 'belongsTo',
                  keyFrom: 'destinationId',
          keyTo: 'id'
        },
        branchOffices: {
          name: 'branchOffices',
          type: 'BranchOffice[]',
          model: 'BranchOffice',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'rACServiceId'
        },
        cars: {
          name: 'cars',
          type: 'Car[]',
          model: 'Car',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'rACServiceId'
        },
        rPriceList: {
          name: 'rPriceList',
          type: 'RPriceList',
          model: 'RPriceList',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'rACServiceId'
        },
      }
    }
  }
}
