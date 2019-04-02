/* tslint:disable */
import {
  APriceListItem
} from '../index';

declare var Object: any;
export interface APriceListInterface {
  "id"?: number;
  "airlineId"?: number;
  priceListItems?: APriceListItem[];
}

export class APriceList implements APriceListInterface {
  "id": number;
  "airlineId": number;
  priceListItems: APriceListItem[];
  constructor(data?: APriceListInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `APriceList`.
   */
  public static getModelName() {
    return "APriceList";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of APriceList for dynamic purposes.
  **/
  public static factory(data: APriceListInterface): APriceList{
    return new APriceList(data);
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
      name: 'APriceList',
      plural: 'APriceLists',
      path: 'APriceLists',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "airlineId": {
          name: 'airlineId',
          type: 'number'
        },
      },
      relations: {
        priceListItems: {
          name: 'priceListItems',
          type: 'APriceListItem[]',
          model: 'APriceListItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'aPriceListId'
        },
      }
    }
  }
}
