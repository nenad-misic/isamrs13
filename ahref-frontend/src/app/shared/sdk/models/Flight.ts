/* tslint:disable */
import {
  Airline,
  Seat,
  Destination
} from '../index';

declare var Object: any;
export interface FlightInterface {
  "startTime": number;
  "endTime": number;
  "length": number;
  "ticketPrice": number;
  "rating": number;
  "numOfRates": number;
  "id"?: any;
  "airlineId"?: any;
  "destinationId"?: any;
  "startDestinationId"?: any;
  "endDestinationId"?: any;
  airline?: Airline;
  seats?: Seat[];
  startDestination?: Destination;
  endDestination?: Destination;
  connectedDestinaions?: Destination[];
}

export class Flight implements FlightInterface {
  "startTime": number;
  "endTime": number;
  "length": number;
  "ticketPrice": number;
  "rating": number;
  "numOfRates": number;
  "id": any;
  "airlineId": any;
  "destinationId": any;
  "startDestinationId": any;
  "endDestinationId": any;
  airline: Airline;
  seats: Seat[];
  startDestination: Destination;
  endDestination: Destination;
  connectedDestinaions: Destination[];
  constructor(data?: FlightInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Flight`.
   */
  public static getModelName() {
    return "Flight";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Flight for dynamic purposes.
  **/
  public static factory(data: FlightInterface): Flight{
    return new Flight(data);
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
      name: 'Flight',
      plural: 'Flights',
      path: 'Flights',
      idName: 'id',
      properties: {
        "startTime": {
          name: 'startTime',
          type: 'number'
        },
        "endTime": {
          name: 'endTime',
          type: 'number'
        },
        "length": {
          name: 'length',
          type: 'number'
        },
        "ticketPrice": {
          name: 'ticketPrice',
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
        "id": {
          name: 'id',
          type: 'any'
        },
        "airlineId": {
          name: 'airlineId',
          type: 'any'
        },
        "destinationId": {
          name: 'destinationId',
          type: 'any'
        },
        "startDestinationId": {
          name: 'startDestinationId',
          type: 'any'
        },
        "endDestinationId": {
          name: 'endDestinationId',
          type: 'any'
        },
      },
      relations: {
        airline: {
          name: 'airline',
          type: 'Airline',
          model: 'Airline',
          relationType: 'belongsTo',
                  keyFrom: 'airlineId',
          keyTo: 'id'
        },
        seats: {
          name: 'seats',
          type: 'Seat[]',
          model: 'Seat',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'flightId'
        },
        startDestination: {
          name: 'startDestination',
          type: 'Destination',
          model: 'Destination',
          relationType: 'belongsTo',
                  keyFrom: 'startDestinationId',
          keyTo: 'id'
        },
        endDestination: {
          name: 'endDestination',
          type: 'Destination',
          model: 'Destination',
          relationType: 'belongsTo',
                  keyFrom: 'endDestinationId',
          keyTo: 'id'
        },
        connectedDestinaions: {
          name: 'connectedDestinaions',
          type: 'Destination[]',
          model: 'Destination',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'flightId'
        },
      }
    }
  }
}
