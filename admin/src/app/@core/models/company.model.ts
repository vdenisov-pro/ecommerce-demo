import assign from 'lodash-es/assign';
import { Address } from './address.model';
import { LegalPerson } from './legal-person.model';
import { Manager, Client } from './user.model';

export class Company {
  id: number;
  name: string;

  managerId: number;
  manager?: Manager;

  clients?: Client[];
  addresses?: Address[];
  legalPeople?: LegalPerson[];

  createdAt?: Date;
  updatedAt?: Date;

  constructor(values?: object) {
    assign(this, values);
  }
}
