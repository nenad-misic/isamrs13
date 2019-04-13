/* tslint:disable */
import {
  Flight,
  Hotel,
  RACService
} from '../index';

declare var Object: any;
export interface DestinationInterface {
  "latitude": number;
  "longitude": number;
  "name": string;
  "code": string;
  "country": string;
  "id"?: any;
  "airlineId"?: any;
  "flightId"?: any;
  startFlights?: Flight[];
  hotels?: Hotel[];
  rACServices?: RACService[];
}

export class Destination implements DestinationInterface {
  "latitude": number;
  "longitude": number;
  "name": string;
  "code": string;
  "country": string;
  "id": any;
  "airlineId": any;
  "flightId": any;
  startFlights: Flight[];
  hotels: Hotel[];
  rACServices: RACService[];
  constructor(data?: DestinationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Destination`.
   */
  public static getModelName() {
    return "Destination";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Destination for dynamic purposes.
  **/
  public static factory(data: DestinationInterface): Destination{
    return new Destination(data);
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
      name: 'Destination',
      plural: 'Destinations',
      path: 'Destinations',
      idName: 'id',
      properties: {
        "latitude": {
          name: 'latitude',
          type: 'number'
        },
        "longitude": {
          name: 'longitude',
          type: 'number'
        },
        "name": {
          name: 'name',
          type: 'string'
        },
        "code": {
          name: 'code',
          type: 'string'
        },
        "country": {
          name: 'country',
          type: 'string'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "airlineId": {
          name: 'airlineId',
          type: 'any'
        },
        "flightId": {
          name: 'flightId',
          type: 'any'
        },
      },
      relations: {
        startFlights: {
          name: 'startFlights',
          type: 'Flight[]',
          model: 'Flight',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'destinationId'
        },
        hotels: {
          name: 'hotels',
          type: 'Hotel[]',
          model: 'Hotel',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'destinationId'
        },
        rACServices: {
          name: 'rACServices',
          type: 'RACService[]',
          model: 'RACService',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'destinationId'
        },
      }
    }
  }
}
