/* tslint:disable */

declare var Object: any;
export interface HotelDiscountInterface {
  "numberOfServices"?: number;
  "percentage"?: number;
  "id"?: any;
  "hotelId"?: any;
}

export class HotelDiscount implements HotelDiscountInterface {
  "numberOfServices": number;
  "percentage": number;
  "id": any;
  "hotelId": any;
  constructor(data?: HotelDiscountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `HotelDiscount`.
   */
  public static getModelName() {
    return "HotelDiscount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of HotelDiscount for dynamic purposes.
  **/
  public static factory(data: HotelDiscountInterface): HotelDiscount{
    return new HotelDiscount(data);
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
      name: 'HotelDiscount',
      plural: 'HotelDiscounts',
      path: 'HotelDiscounts',
      idName: 'id',
      properties: {
        "numberOfServices": {
          name: 'numberOfServices',
          type: 'number'
        },
        "percentage": {
          name: 'percentage',
          type: 'number'
        },
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
      }
    }
  }
}
