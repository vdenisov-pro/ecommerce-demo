import { Component, Input, OnInit } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';

@Component({
  templateUrl: 'client-render-manager.component.html',
  styleUrls: []
})
export class ClientRenderManagerComponent implements ViewCell, OnInit {
  public status: string;

  @Input() value: any;
  @Input() rowData: any;

  constructor() {

  }

  ngOnInit() {

  }

  public get name() {
    return this.value ? this.value.name : '';
  }

}
