import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderDeliveryDateComponent } from './render-delivery-date.component';

describe('RenderDeliveryDateComponent', () => {
  let component: RenderDeliveryDateComponent;
  let fixture: ComponentFixture<RenderDeliveryDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderDeliveryDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderDeliveryDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
