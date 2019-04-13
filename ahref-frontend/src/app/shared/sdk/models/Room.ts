/* tslint:disable */
import {
  DatePrice
} from '../index';

declare var Object: any;
export interface RoomInterface {
  "floor": number;
  "numOfBeds": number;
  "rating": number;
  "numOfRates": number;
  "id"?: any;
  "hotelId"?: any;
  datePrices?: DatePrice[];
}

export class Room implements RoomInterface {
  "floor": number;
  "numOfBeds": number;
  "rating": number;
  "numOfRates": number;
  "id": any;
  "hotelId": any;
  datePrices: DatePrice[];
  constructor(data?: RoomInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Room`.
   */
  public static getModelName() {
    return "Room";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Room for dynamic purposes.
  **/
  public static factory(data: RoomInterface): Room{
    return new Room(data);
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
      name: 'Room',
      plural: 'Rooms',
      path: 'Rooms',
      idName: 'id',
      properties: {
        "floor": {
          name: 'floor',
          type: 'number'
        },
        "numOfBeds": {
          name: 'numOfBeds',
          type: 'number'
        },
        "rating": {
          name: 'rating',
          type: 'number'
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
        "hotelId": {
          name: 'hotelId',
          type: 'any'
        },
      },
      relations: {
        datePrices: {
          name: 'datePrices',
          type: 'DatePrice[]',
          model: 'DatePrice',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'roomId'
        },
      }
    }
  }
}
