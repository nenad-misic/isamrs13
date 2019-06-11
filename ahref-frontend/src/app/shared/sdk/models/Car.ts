/* tslint:disable */
import {
  RACService,
  QuickCarReservation
} from '../index';

declare var Object: any;
export interface CarInterface {
  "name": string;
  "brand": string;
  "model": string;
  "year": number;
  "numOfSeats": number;
  "fuelConsumption": number;
  "rating": number;
  "numOfRates": number;
  "carType": string;
  "id"?: any;
  "rACServiceId"?: any;
  rACService?: RACService;
  quickCarReservations?: QuickCarReservation[];
}

export class Car implements CarInterface {
  "name": string;
  "brand": string;
  "model": string;
  "year": number;
  "numOfSeats": number;
  "fuelConsumption": number;
  "rating": number;
  "numOfRates": number;
  "carType": string;
  "id": any;
  "rACServiceId": any;
  rACService: RACService;
  quickCarReservations: QuickCarReservation[];
  constructor(data?: CarInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Car`.
   */
  public static getModelName() {
    return "Car";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Car for dynamic purposes.
  **/
  public static factory(data: CarInterface): Car{
    return new Car(data);
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
      name: 'Car',
      plural: 'Cars',
      path: 'Cars',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "brand": {
          name: 'brand',
          type: 'string'
        },
        "model": {
          name: 'model',
          type: 'string'
        },
        "year": {
          name: 'year',
          type: 'number'
        },
        "numOfSeats": {
          name: 'numOfSeats',
          type: 'number'
        },
        "fuelConsumption": {
          name: 'fuelConsumption',
          type: 'number'
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
        "carType": {
          name: 'carType',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "rACServiceId": {
          name: 'rACServiceId',
          type: 'any'
        },
      },
      relations: {
        rACService: {
          name: 'rACService',
          type: 'RACService',
          model: 'RACService',
          relationType: 'belongsTo',
                  keyFrom: 'rACServiceId',
          keyTo: 'id'
        },
        quickCarReservations: {
          name: 'quickCarReservations',
          type: 'QuickCarReservation[]',
          model: 'QuickCarReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'carId'
        },
      }
    }
  }
}
