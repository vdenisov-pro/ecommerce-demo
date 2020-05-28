import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'sp-autocomplete-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss']
})
export class AutocompleteOptionComponent implements OnInit {

  @Input() value: string;
  public click$: Observable<string>;

  constructor(private host: ElementRef) {}

  ngOnInit() {
    this.click$ = fromEvent(this.element, 'click').pipe(mapTo(this.value));
  }

  public get element() {  return this.host.nativeElement; }
}

