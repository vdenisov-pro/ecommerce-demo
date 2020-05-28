import assign from 'lodash-es/assign';
import { Courier } from './user.model';

export class Address {
  id?: number;
  country: string;
  street: string;
  house: string;

  companyId?: number;

  city?: string;
  cityId?: number;

  courier?: Courier;
  courierId?: number;

  comment?: string;

  createdAt?: Date;
  updatedAt?: Date;

  constructor(values?: object) {
    assign(this, values);
  }
}
