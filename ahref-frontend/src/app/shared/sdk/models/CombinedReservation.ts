/* tslint:disable */
import {
  LoggedUser,
  MFlightReservation,
  MRoomReservation,
  MCarReservation
} from '../index';

declare var Object: any;
export interface CombinedReservationInterface {
  "id"?: any;
  "loggedUserId"?: any;
  loggedUser?: LoggedUser;
  mFlightReservations?: MFlightReservation[];
  mRoomReservations?: MRoomReservation[];
  mCarReservations?: MCarReservation[];
}

export class CombinedReservation implements CombinedReservationInterface {
  "id": any;
  "loggedUserId": any;
  loggedUser: LoggedUser;
  mFlightReservations: MFlightReservation[];
  mRoomReservations: MRoomReservation[];
  mCarReservations: MCarReservation[];
  constructor(data?: CombinedReservationInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `CombinedReservation`.
   */
  public static getModelName() {
    return "CombinedReservation";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of CombinedReservation for dynamic purposes.
  **/
  public static factory(data: CombinedReservationInterface): CombinedReservation{
    return new CombinedReservation(data);
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
      name: 'CombinedReservation',
      plural: 'CombinedReservations',
      path: 'CombinedReservations',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "loggedUserId": {
          name: 'loggedUserId',
          type: 'any'
        },
      },
      relations: {
        loggedUser: {
          name: 'loggedUser',
          type: 'LoggedUser',
          model: 'LoggedUser',
          relationType: 'belongsTo',
                  keyFrom: 'loggedUserId',
          keyTo: 'id'
        },
        mFlightReservations: {
          name: 'mFlightReservations',
          type: 'MFlightReservation[]',
          model: 'MFlightReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'combinedReservationId'
        },
        mRoomReservations: {
          name: 'mRoomReservations',
          type: 'MRoomReservation[]',
          model: 'MRoomReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'combinedReservationId'
        },
        mCarReservations: {
          name: 'mCarReservations',
          type: 'MCarReservation[]',
          model: 'MCarReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'combinedReservationId'
        },
      }
    }
  }
}
