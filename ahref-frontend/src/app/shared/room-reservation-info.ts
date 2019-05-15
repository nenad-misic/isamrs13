import {HPriceListItem} from "./sdk/models";

export class RoomReservationInfo {
  startDate: Date;
  endDate: Date;
  additionalServices: HPriceListItem[] = [];
}
