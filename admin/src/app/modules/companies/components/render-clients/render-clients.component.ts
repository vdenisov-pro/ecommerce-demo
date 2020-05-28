import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Company } from 'src/app/@core/models/company.model';


@Component({
  templateUrl: 'render-clients.component.html'
})
export class CompaniesRenderClientsComponent implements ViewCell, OnInit {
  public clients = [];

  @Input() value: string | number;
  @Input() rowData: Company;

  ngOnInit() {
    this.clients = this.rowData.clients;
  }
}
