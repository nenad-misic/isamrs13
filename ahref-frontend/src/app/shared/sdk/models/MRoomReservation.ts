/* tslint:disable */
import {
  Room,
  HPriceListItem
} from '../index';

declare var Object: any;
export interface MRoomReservationInterface {
  "timeStamp"?: Date;
  "startDate"?: Date;
  "endDate"?: Date;
  "roomRate": number;
  "hotelRate": number;
  "id"?: any;
  "roomId"?: any;
  room?: Room;
  hPriceListItems?: HPriceListItem[];
}

export class MRoomReservation implements MRoomReservationInterface {
  "timeStamp": Date;
  "startDate": Date;
  "endDate": Date;
  "roomRate": number;
  "hotelRate": number;
  "id": any;
  "roomId": any;
  room: Room;
  hPriceListItems: HPriceListItem[];
  constructor(data?: MRoomReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `MRoomReservation`.
   */
  public static getModelName() {
    return "MRoomReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of MRoomReservation for dynamic purposes.
  **/
  public static factory(data: MRoomReservationInterface): MRoomReservation{
    return new MRoomReservation(data);
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
      name: 'MRoomReservation',
      plural: 'MRoomReservations',
      path: 'MRoomReservations',
      idName: 'id',
      properties: {
        "timeStamp": {
          name: 'timeStamp',
          type: 'Date'
        },
        "startDate": {
          name: 'startDate',
          type: 'Date'
        },
        "endDate": {
          name: 'endDate',
          type: 'Date'
        },
        "roomRate": {
          name: 'roomRate',
          type: 'number',
          default: -1
        },
        "hotelRate": {
          name: 'hotelRate',
          type: 'number',
          default: -1
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "roomId": {
          name: 'roomId',
          type: 'any'
        },
      },
      relations: {
        room: {
          name: 'room',
          type: 'Room',
          model: 'Room',
          relationType: 'belongsTo',
                  keyFrom: 'roomId',
          keyTo: 'id'
        },
        hPriceListItems: {
          name: 'hPriceListItems',
          type: 'HPriceListItem[]',
          model: 'HPriceListItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'mRoomReservationId'
        },
      }
    }
  }
}
