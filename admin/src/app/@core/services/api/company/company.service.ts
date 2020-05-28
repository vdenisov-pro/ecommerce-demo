import { Injectable } from '@angular/core';
import { BaseHttpListService } from '../../base/base-http-list.service';
import { HttpService } from '../../http/http';
import { Observable } from 'rxjs';

import { Address } from 'src/app/@core/models/address.model';
import { Company } from 'src/app/@core/models/company.model';
import { LegalPerson } from 'src/app/@core/models/legal-person.model';


@Injectable({
  providedIn: 'root'
})
export class CompanyService extends BaseHttpListService<Company> {
  constructor(public httpService: HttpService) {
    super(httpService);
  }

  public searchByName(name: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}filter?name=${name}`);
  }
  public searchLegalPeopleByName(companyId: number, legalPersonName: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/legal_people?name=${legalPersonName}`);
  }
  public searchClientsByName(companyId: number, clientName: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/clients?name=${clientName}`);
  }
  public searchManagersByName(companyId: number, managerName: string): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/managers?name=${managerName}`);
  }
  public searchAddressesByQuery(companyId: number, query: string = ''): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/addresses?q=${query}`);
  }


  public getLegalPeople(companyId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/legal_people`);
  }
  public getClients(companyId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/clients`);
  }
  public getManagers(companyId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/managers`);
  }
  public getAddresses(companyId: number): Observable<any> {
    return this.httpService.get(`${this.getPath()}${companyId}/addresses`);
  }

  public updateAddresses(id: number, addresses: Address[]): Observable<any> {
    return this.httpService.post(`${this.getPath()}${id}/addresses`, { addresses });
  }
  public updateLegalPeople(id: number, legalPeople: LegalPerson[]): Observable<any> {
    return this.httpService.post(`${this.getPath()}${id}/legal_people`, { legalPeople });
  }

  protected getPath(): string {
    return `companies/`;
  }

  public createInstance(data: any): Company {
    return new Company(data);
  }

  protected hasPagination(): boolean {
    return true;
  }

  protected getDefaultForceLoad(): boolean {
    return false;
  }
}
