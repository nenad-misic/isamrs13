/* tslint:disable */
import {
  Destination,
  Room,
  HPriceList,
  QuickRoomReservation,
  HotelDiscount
} from '../index';

declare var Object: any;
export interface HotelInterface {
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
  rooms?: Room[];
  hPriceList?: HPriceList;
  quickRoomReservations?: QuickRoomReservation[];
  hotelDiscounts?: HotelDiscount[];
}

export class Hotel implements HotelInterface {
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
  rooms: Room[];
  hPriceList: HPriceList;
  quickRoomReservations: QuickRoomReservation[];
  hotelDiscounts: HotelDiscount[];
  constructor(data?: HotelInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Hotel`.
   */
  public static getModelName() {
    return "Hotel";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Hotel for dynamic purposes.
  **/
  public static factory(data: HotelInterface): Hotel{
    return new Hotel(data);
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
      name: 'Hotel',
      plural: 'Hotels',
      path: 'Hotels',
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
        rooms: {
          name: 'rooms',
          type: 'Room[]',
          model: 'Room',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'hotelId'
        },
        hPriceList: {
          name: 'hPriceList',
          type: 'HPriceList',
          model: 'HPriceList',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'hotelId'
        },
        quickRoomReservations: {
          name: 'quickRoomReservations',
          type: 'QuickRoomReservation[]',
          model: 'QuickRoomReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'hotelId'
        },
        hotelDiscounts: {
          name: 'hotelDiscounts',
          type: 'HotelDiscount[]',
          model: 'HotelDiscount',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'hotelId'
        },
      }
    }
  }
}
