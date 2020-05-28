import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Company } from 'src/app/@core/models/company.model';


@Component({
  templateUrl: 'render-addresses.component.html',
  styleUrls: []
})
export class CompaniesRenderAddressesComponent implements ViewCell, OnInit {
  public addresses = [];

  @Input() value: string | number;
  @Input() rowData: Company;

  ngOnInit() {
    this.addresses = this.rowData.addresses;
  }
}
