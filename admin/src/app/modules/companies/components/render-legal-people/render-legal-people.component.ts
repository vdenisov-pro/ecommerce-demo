import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Company } from 'src/app/@core/models/company.model';


@Component({
  templateUrl: 'render-legal-people.component.html'
})
export class CompaniesRenderLegalPeopleComponent implements ViewCell, OnInit {
  public legalPeople = [];

  @Input() value: string | number;
  @Input() rowData: Company;

  ngOnInit() {
    this.legalPeople = this.rowData.legalPeople;
  }
}
