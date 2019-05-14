/* tslint:disable */
import {
  LoggedUser
} from '../index';

declare var Object: any;
export interface FriendshipInterface {
  "id"?: any;
  "accepted"?: boolean;
  "startUserId"?: any;
  "endUserId"?: any;
  startUser?: LoggedUser;
  endUser?: LoggedUser;
}

export class Friendship implements FriendshipInterface {
  "id": any;
  "accepted": boolean;
  "startUserId": any;
  "endUserId": any;
  startUser: LoggedUser;
  endUser: LoggedUser;
  constructor(data?: FriendshipInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Friendship`.
   */
  public static getModelName() {
    return "Friendship";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Friendship for dynamic purposes.
  **/
  public static factory(data: FriendshipInterface): Friendship{
    return new Friendship(data);
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
      name: 'Friendship',
      plural: 'Friendships',
      path: 'Friendships',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'any'
        },
        "accepted": {
          name: 'accepted',
          type: 'boolean'
        },
        "startUserId": {
          name: 'startUserId',
          type: 'any'
        },
        "endUserId": {
          name: 'endUserId',
          type: 'any'
        },
      },
      relations: {
        startUser: {
          name: 'startUser',
          type: 'LoggedUser',
          model: 'LoggedUser',
          relationType: 'belongsTo',
                  keyFrom: 'startUserId',
          keyTo: 'id'
        },
        endUser: {
          name: 'endUser',
          type: 'LoggedUser',
          model: 'LoggedUser',
          relationType: 'belongsTo',
                  keyFrom: 'endUserId',
          keyTo: 'id'
        },
      }
    }
  }
}
