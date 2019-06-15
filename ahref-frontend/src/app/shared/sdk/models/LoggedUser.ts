/* tslint:disable */
import {
  Hotel,
  RACService,
  Airline,
  MCarReservation,
  MRoomReservation,
  MFlightReservation
} from '../index';

declare var Object: any;
export interface LoggedUserInterface {
  "name": string;
  "image": string;
  "telephone": string;
  "city": string;
  "points": number;
  "type": string;
  "firstLogin"?: boolean;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "hotelId"?: any;
  "rACServiceId"?: any;
  "password"?: string;
  accessTokens?: any[];
  hotel?: Hotel;
  rACService?: RACService;
  airline?: Airline;
  mCarReservations?: MCarReservation[];
  mRoomReservations?: MRoomReservation[];
  mFlightReservations?: MFlightReservation[];
}

export class LoggedUser implements LoggedUserInterface {
  "name": string;
  "image": string;
  "telephone": string;
  "city": string;
  "points": number;
  "type": string;
  "firstLogin": boolean;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "hotelId": any;
  "rACServiceId": any;
  "password": string;
  accessTokens: any[];
  hotel: Hotel;
  rACService: RACService;
  airline: Airline;
  mCarReservations: MCarReservation[];
  mRoomReservations: MRoomReservation[];
  mFlightReservations: MFlightReservation[];
  constructor(data?: LoggedUserInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `LoggedUser`.
   */
  public static getModelName() {
    return "LoggedUser";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of LoggedUser for dynamic purposes.
  **/
  public static factory(data: LoggedUserInterface): LoggedUser{
    return new LoggedUser(data);
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
      name: 'LoggedUser',
      plural: 'LoggedUsers',
      path: 'LoggedUsers',
      idName: 'id',
      properties: {
        "name": {
          name: 'name',
          type: 'string'
        },
        "image": {
          name: 'image',
          type: 'string'
        },
        "telephone": {
          name: 'telephone',
          type: 'string'
        },
        "city": {
          name: 'city',
          type: 'string'
        },
        "points": {
          name: 'points',
          type: 'number',
          default: 0
        },
        "type": {
          name: 'type',
          type: 'string',
          default: 'regUser'
        },
        "firstLogin": {
          name: 'firstLogin',
          type: 'boolean',
          default: false
        },
        "realm": {
          name: 'realm',
          type: 'string'
        },
        "username": {
          name: 'username',
          type: 'string'
        },
        "email": {
          name: 'email',
          type: 'string'
        },
        "emailVerified": {
          name: 'emailVerified',
          type: 'boolean'
        },
        "id": {
          name: 'id',
          type: 'any'
        },
        "hotelId": {
          name: 'hotelId',
          type: 'any'
        },
        "rACServiceId": {
          name: 'rACServiceId',
          type: 'any'
        },
        "password": {
          name: 'password',
          type: 'string'
        },
      },
      relations: {
        accessTokens: {
          name: 'accessTokens',
          type: 'any[]',
          model: '',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'userId'
        },
        hotel: {
          name: 'hotel',
          type: 'Hotel',
          model: 'Hotel',
          relationType: 'belongsTo',
                  keyFrom: 'hotelId',
          keyTo: 'id'
        },
        rACService: {
          name: 'rACService',
          type: 'RACService',
          model: 'RACService',
          relationType: 'belongsTo',
                  keyFrom: 'rACServiceId',
          keyTo: 'id'
        },
        airline: {
          name: 'airline',
          type: 'Airline',
          model: 'Airline',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
        mCarReservations: {
          name: 'mCarReservations',
          type: 'MCarReservation[]',
          model: 'MCarReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
        mRoomReservations: {
          name: 'mRoomReservations',
          type: 'MRoomReservation[]',
          model: 'MRoomReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
        mFlightReservations: {
          name: 'mFlightReservations',
          type: 'MFlightReservation[]',
          model: 'MFlightReservation',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
      }
    }
  }
}
