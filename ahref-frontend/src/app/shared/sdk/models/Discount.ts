/* tslint:disable */

declare var Object: any;
export interface DiscountInterface {
  "points"?: number;
  "percentage"?: number;
  "id"?: any;
}

export class Discount implements DiscountInterface {
  "points": number;
  "percentage": number;
  "id": any;
  constructor(data?: DiscountInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `Discount`.
   */
  public static getModelName() {
    return "Discount";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of Discount for dynamic purposes.
  **/
  public static factory(data: DiscountInterface): Discount{
    return new Discount(data);
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
      name: 'Discount',
      plural: 'Discounts',
      path: 'Discounts',
      idName: 'id',
      properties: {
        "points": {
          name: 'points',
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
      },
      relations: {
      }
    }
  }
}
