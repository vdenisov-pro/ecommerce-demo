import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Company } from 'src/app/@core/models/company.model';


@Component({
  templateUrl: 'render-manager.component.html',
  styleUrls: []
})
export class CompaniesRenderManagerComponent implements ViewCell, OnInit {
  public manager;

  @Input() value: string | number;
  @Input() rowData: Company;

  ngOnInit() {
    this.manager = this.rowData.manager;
  }
}
