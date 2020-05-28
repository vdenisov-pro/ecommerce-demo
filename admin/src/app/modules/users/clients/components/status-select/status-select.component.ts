import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

import { Client } from 'src/app/@core/models/user.model';


@Component({
  templateUrl: './status-select.component.html',
  styleUrls: ['./status-select.component.scss']
})
export class StatusCustomRenderComponent implements ViewCell, OnInit {
  public status: string;

  @Input() value: string | number;
  @Input() rowData: Client;

  ngOnInit() {
    this.status = Client.getStatus(this.value);
  }
}
