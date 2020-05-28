import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  templateUrl: 'client-render-company.component.html',
  styleUrls: []
})
export class ClientRenderCompanyComponent implements ViewCell, OnInit {

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
  }

  public get name() {
    return this.value ? this.value.name : '';
  }
}
