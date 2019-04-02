/* tslint:disable */
import {
  RPriceListItem
} from '../index';

declare var Object: any;
export interface RPriceListInterface {
  "id"?: number;
  "rACServiceId"?: number;
  priceListItems?: RPriceListItem[];
}

export class RPriceList implements RPriceListInterface {
  "id": number;
  "rACServiceId": number;
  priceListItems: RPriceListItem[];
  constructor(data?: RPriceListInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `RPriceList`.
   */
  public static getModelName() {
    return "RPriceList";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of RPriceList for dynamic purposes.
  **/
  public static factory(data: RPriceListInterface): RPriceList{
    return new RPriceList(data);
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
      name: 'RPriceList',
      plural: 'RPriceLists',
      path: 'RPriceLists',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
        "rACServiceId": {
          name: 'rACServiceId',
          type: 'number'
        },
      },
      relations: {
        priceListItems: {
          name: 'priceListItems',
          type: 'RPriceListItem[]',
          model: 'RPriceListItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'rPriceListId'
        },
      }
    }
  }
}
