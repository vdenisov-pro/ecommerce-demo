import { Directive, OnInit, Input, ElementRef, ViewContainerRef } from '@angular/core';
import { OverlayRef, Overlay, ConnectionPositionPair } from '@angular/cdk/overlay';
import { NgControl } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';

import { fromEvent } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { filter } from 'rxjs/operators';

import { AutocompleteComponent } from './autocomplete.component';

@Directive({
  selector: '[spAutocomplete]'
})
export class AutocompleteDirective implements OnInit {

  @Input() spAutocomplete: AutocompleteComponent;
  private overlayRef: OverlayRef;

  constructor(
    private host: ElementRef<HTMLInputElement>,
    private ngControl: NgControl,
    private vcr: ViewContainerRef,
    private overlay: Overlay,
  ) { }

  public get control() {
    return this.ngControl.control;
  }

  ngOnInit() {
    fromEvent(this.origin, 'focus').subscribe(() => {
      this.openDropdown();

      this.spAutocomplete.optionsClick()
        .pipe(takeUntil(this.overlayRef.detachments()))
        .subscribe(( value: string ) => {
          this.control.setValue(value);
          this.close();
        });
    });
  }

  public openDropdown() {
    this.overlayRef = this.overlay.create({
      width: this.origin.offsetWidth,
      maxHeight: 40 * 3,
      backdropClass: '',
      scrollStrategy: this.overlay.scrollStrategies.reposition(),
      positionStrategy: this.getOverlayPosition()
    });

    const template = new TemplatePortal(this.spAutocomplete.rootTemplate, this.vcr);
    this.overlayRef.attach(template);

    overlayClickOutside(this.overlayRef, this.origin).subscribe(() => this.close());
  }

  private close() {
    this.overlayRef.detach();
    this.overlayRef = null;
  }

  private getOverlayPosition() {
    const positions = [
      new ConnectionPositionPair(
        { originX: 'start', originY: 'bottom' },
        { overlayX: 'start', overlayY: 'top' }
      ),
      new ConnectionPositionPair(
        { originX: 'start', originY: 'top' },
        { overlayX: 'start', overlayY: 'bottom' }
      )
    ];

    return this.overlay
      .position()
      .flexibleConnectedTo(this.origin)
      .withPositions(positions)
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  public get origin() {
    return this.host.nativeElement;
  }
}

export function overlayClickOutside( overlayRef: OverlayRef, origin: HTMLElement ) {
  return fromEvent<MouseEvent>(document, 'click')
    .pipe(
      filter(event => {
        const clickTarget = event.target as HTMLElement;
        const notOrigin = clickTarget !== origin; // the input
        const notOverlay = !!overlayRef && (overlayRef.overlayElement.contains(clickTarget) === false);
        return notOrigin && notOverlay;
      }),
      takeUntil(overlayRef.detachments())
    );
}
