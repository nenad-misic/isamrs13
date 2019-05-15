/* tslint:disable */
import {
  MRoomReservation
} from '../index';

declare var Object: any;
export interface QuickRoomReservationInterface {
  "id"?: any;
  "mRoomReservationId"?: any;
  "hotelId"?: any;
  mRoomReservation?: MRoomReservation;
}

export class QuickRoomReservation implements QuickRoomReservationInterface {
  "id": any;
  "mRoomReservationId": any;
  "hotelId": any;
  mRoomReservation: MRoomReservation;
  constructor(data?: QuickRoomReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `QuickRoomReservation`.
   */
  public static getModelName() {
    return "QuickRoomReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of QuickRoomReservation for dynamic purposes.
  **/
  public static factory(data: QuickRoomReservationInterface): QuickRoomReservation{
    return new QuickRoomReservation(data);
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
      name: 'QuickRoomReservation',
      plural: 'QuickRoomReservations',
      path: 'QuickRoomReservations',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "mRoomReservationId": {
          name: 'mRoomReservationId',
          type: 'any'
        },
        "hotelId": {
          name: 'hotelId',
          type: 'any'
        },
      },
      relations: {
        mRoomReservation: {
          name: 'mRoomReservation',
          type: 'MRoomReservation',
          model: 'MRoomReservation',
          relationType: 'belongsTo',
                  keyFrom: 'mRoomReservationId',
          keyTo: 'id'
        },
      }
    }
  }
}
