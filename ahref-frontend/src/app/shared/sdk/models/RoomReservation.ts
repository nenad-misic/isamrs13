/* tslint:disable */
import {
  SRoom
} from '../index';

declare var Object: any;
export interface RoomReservationInterface {
  "timeStamp"?: Date;
  "startDate"?: Date;
  "endDate"?: Date;
  "id"?: number;
  "sRoomId"?: number;
  sRoom?: SRoom;
}

export class RoomReservation implements RoomReservationInterface {
  "timeStamp": Date;
  "startDate": Date;
  "endDate": Date;
  "id": number;
  "sRoomId": number;
  sRoom: SRoom;
  constructor(data?: RoomReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RoomReservation`.
   */
  public static getModelName() {
    return "RoomReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RoomReservation for dynamic purposes.
  **/
  public static factory(data: RoomReservationInterface): RoomReservation{
    return new RoomReservation(data);
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
      name: 'RoomReservation',
      plural: 'RoomReservations',
      path: 'RoomReservations',
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
        "id": {
          name: 'id',
          type: 'number'
        },
        "sRoomId": {
          name: 'sRoomId',
          type: 'number'
        },
      },
      relations: {
        sRoom: {
          name: 'sRoom',
          type: 'SRoom',
          model: 'SRoom',
          relationType: 'belongsTo',
                  keyFrom: 'sRoomId',
          keyTo: 'id'
        },
      }
    }
  }
}
