/* tslint:disable */
import {
  HPriceListItem
} from '../index';

declare var Object: any;
export interface HPriceListInterface {
  "id"?: any;
  "hotelId"?: any;
  priceListItems?: HPriceListItem[];
}

export class HPriceList implements HPriceListInterface {
  "id": any;
  "hotelId": any;
  priceListItems: HPriceListItem[];
  constructor(data?: HPriceListInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HPriceList`.
   */
  public static getModelName() {
    return "HPriceList";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HPriceList for dynamic purposes.
  **/
  public static factory(data: HPriceListInterface): HPriceList{
    return new HPriceList(data);
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
      name: 'HPriceList',
      plural: 'HPriceLists',
      path: 'HPriceLists',
      idName: 'id',
      properties: {
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
        priceListItems: {
          name: 'priceListItems',
          type: 'HPriceListItem[]',
          model: 'HPriceListItem',
          relationType: 'hasMany',
                  keyFrom: 'id',
          keyTo: 'hPriceListId'
        },
      }
    }
  }
}
