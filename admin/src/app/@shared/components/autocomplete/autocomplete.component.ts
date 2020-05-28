import {
  Component,
  ViewChild,
  TemplateRef,
  QueryList,
  Input,
  ViewChildren,
  Output,
  EventEmitter
} from '@angular/core';

import { switchMap } from 'rxjs/operators';
import { merge } from 'rxjs';
import { AutocompleteOptionComponent } from './option/option.component';


interface IOption {
  name: string;
}

@Component({
  selector: 'sp-autocomplete',
  templateUrl: './autocomplete.component.html',
  exportAs: 'spAutocomplete',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent {

  @ViewChild('root', { static: false }) rootTemplate: TemplateRef<any>;
  @ViewChildren(AutocompleteOptionComponent) public options: QueryList<AutocompleteOptionComponent>;

  _sourceList: IOption[];
  @Output() selectOption = new EventEmitter();

  @Input()
  public set sourceList(val: IOption[]) {
    if (this._sourceList !== val) {
      this._sourceList = val;
    }
  }

  public get sourceList() {
    return this._sourceList;
  }

  constructor() { }

  public onOptionSelect(option) {
    this.selectOption.emit(option);
  }

  public optionsClick() {
    return this.options.changes.pipe(
      switchMap(options => {
        const clicks$ = options.map(option => option.click$);
        return merge(...clicks$);
      })
    );
  }

}
