import { Company } from './company.model';
import assign from 'lodash-es/assign';


export const enum ClientState {
  New = 'new',
  Active = 'active',
  Notactive = 'notactive'
}

export const enum UserRoles {
  Manager = 'manager',
  Client = 'client',
  Courier = 'courier'
}

export const ClientStates = [
  { key: ClientState.New, value: 'новый' },
  { key: ClientState.Active, value: 'активный' },
  { key: ClientState.Notactive, value: 'не активный' },
];


export class User {

  public id: number = 0;
  public name: string = '';

  constructor(values?: object) {
    if (values !== undefined) {
      assign(this, values);
    }
  }

}

export class PrivateUser extends User {
  public id: number;
  public companyId: number;
  public role: string;
  public email: string;
  public status: string;
  public password?: string;
  public name: string;
  public phone: string;
  public description?: string;
  public first_name: string = '';
  public last_name: string = '';
  public date_joined: string = '';
  public photoURL: string = '';
  public displayName: string = '';

  constructor(values?: object) {
    super(undefined);
    assign(this, values);
  }

  public getTitle() {
    return this.displayName || this.name || this.email || 'unknown';
  }

}

export class Manager extends PrivateUser {
  public static readonly role = UserRoles.Manager;
}

export class Courier extends PrivateUser {
  public static readonly role = UserRoles.Courier;
}

export class Client extends PrivateUser {
  public static readonly role = UserRoles.Client;
  public company: Company;
  public manager: Manager;
  public status: ClientState;

  public static getStatus(status) {
    switch (status) {
      case ClientState.New:
        return 'новый';

      case ClientState.Active:
        return 'активный';

      case ClientState.Notactive:
        return 'не активный';

      default:
        return '';
    }
  }

  public isNew() {
    return this.status === ClientState.New;
  }

  public isActivate() {
    return this.status === ClientState.Active;
  }

  public isNotActive() {
    return this.status === ClientState.Notactive;
  }
}
