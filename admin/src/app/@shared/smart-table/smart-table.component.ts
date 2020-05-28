import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActionState } from '../components/base-modal/base-modal.component';
import { defaultSettings } from './settings';
import assign from 'lodash-es/assign';

@Component({
  selector: 'sp-smart-table',
  templateUrl: './smart-table.component.html',
  styleUrls: ['./smart-table.component.scss']
})
export class SmartTableComponent implements OnInit, OnDestroy {
  public smartSettings: any; // = defaultSettings;
  public pred = false;

  @Input() public smartTitle: string;
  @Input() public settings: object = {};
  @Input() public smartColumns: any;
  @Input() public smartRows: any;

  @Output() create = new EventEmitter<any>();
  @Output() about = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  constructor() {}

  public ngOnInit() {
    this.smartSettings = assign({}, defaultSettings, this.settings);
    this.smartSettings.columns = this.smartColumns;
  }

  public ngOnDestroy() {
    this.smartRows = [];
  }

  public onCustomAction(event) {
    switch (event.action) {
      case ActionState.Details:
        this.about.emit(event);
        break;
      case ActionState.Update:
        this.edit.emit(event);
        break;
      case ActionState.Remove:
        this.delete.emit(event);
        break;
    }
  }

  public onCreate(event): void {
    this.create.emit(event);
  }

  public openDetails(event): void {
    this.about.emit(event);
  }
}
