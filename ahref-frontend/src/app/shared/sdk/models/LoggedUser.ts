/* tslint:disable */
import {
  Airline,
  Hotel,
  RACService,
  MCarReservation
} from '../index';

declare var Object: any;
export interface LoggedUserInterface {
  "name": string;
  "image": string;
  "telephone": string;
  "city": string;
  "points": number;
  "type": string;
  "realm"?: string;
  "username"?: string;
  "email": string;
  "emailVerified"?: boolean;
  "id"?: any;
  "password"?: string;
  accessTokens?: any[];
  airline?: Airline;
  hotel?: Hotel;
  racservice?: RACService;
  mCarReservations?: MCarReservation[];
}

export class LoggedUser implements LoggedUserInterface {
  "name": string;
  "image": string;
  "telephone": string;
  "city": string;
  "points": number;
  "type": string;
  "realm": string;
  "username": string;
  "email": string;
  "emailVerified": boolean;
  "id": any;
  "password": string;
  accessTokens: any[];
  airline: Airline;
  hotel: Hotel;
  racservice: RACService;
  mCarReservations: MCarReservation[];
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
        airline: {
          name: 'airline',
          type: 'Airline',
          model: 'Airline',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
        hotel: {
          name: 'hotel',
          type: 'Hotel',
          model: 'Hotel',
          relationType: 'hasOne',
                  keyFrom: 'id',
          keyTo: 'loggedUserId'
        },
        racservice: {
          name: 'racservice',
          type: 'RACService',
          model: 'RACService',
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
      }
    }
  }
}
