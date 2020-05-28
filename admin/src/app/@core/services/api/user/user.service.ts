import { Injectable } from '@angular/core';
import { BaseHttpListService } from '../../base/base-http-list.service';
import { UserRoles, Manager, Client, Courier } from 'src/app/@core/models/user.model';
import { Observable } from 'rxjs';

import { PrivateUser } from 'src/app/@core/models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseHttpListService<PrivateUser> {
  public searchBy(role: UserRoles, name: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}filter?role=${role}&name=${name}`);
  }

  public searchByCompany(role: UserRoles, name: string, comnanyId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}filter?role=${role}&name=${name}&companyId=${comnanyId}`);
  }

  public createInstance(data: any): PrivateUser {
    switch (data.role) {
      case UserRoles.Manager:
        return new Manager(data);
      case UserRoles.Client:
        return new Client(data);
      case UserRoles.Courier:
        return new Courier(data);
      default:
        return new PrivateUser(data);
    }
  }

  protected getPath(): string {
    return `users/`;
  }

  protected hasPagination(): boolean {
    return true;
  }

  protected getDefaultForceLoad(): boolean {
    return false;
  }
}
