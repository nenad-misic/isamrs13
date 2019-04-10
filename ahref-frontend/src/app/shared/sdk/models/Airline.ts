/* tslint:disable */
import {
  Flight,
  APriceList,
  Destination
} from '../index';

declare var Object: any;
export interface AirlineInterface {
  "name": string;
  "address": string;
  "latitude": number;
  "longitude": number;
  "description": string;
  "rating": number;
  "numOfRates": number;
  "id"?: any;
  flights?: Flight[];
  priceList?: APriceList;
  destinations?: Destination[];
}

export class Airline implements AirlineInterface {
  "name": string;
  "address": string;
  "latitude": number;
  "longitude": number;
  "description": string;
  "rating": number;
  "numOfRates": number;
  "id": any;
  flights: Flight[];
  priceList: APriceList;
  destinations: Destination[];
  constructor(data?: AirlineInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Airline`.
   */
  public static getModelName() {
    return "Airline";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Airline for dynamic purposes.
  **/
  public static factory(data: AirlineInterface): Airline{
    return new Airline(data);
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
      name: 'Airline',
      plural: 'Airlines',
      path: 'Airlines',
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
      },
      relations: {
        flights: {
          name: 'flights',
          type: 'Flight[]',
          model: 'Flight',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'airlineId'
        },
        priceList: {
          name: 'priceList',
          type: 'APriceList',
          model: 'APriceList',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'airlineId'
        },
        destinations: {
          name: 'destinations',
          type: 'Destination[]',
          model: 'Destination',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'airlineId'
        },
      }
    }
  }
}
