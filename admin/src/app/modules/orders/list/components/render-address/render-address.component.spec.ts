import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderAddressComponent } from './render-address.component';

describe('RenderAddressComponent', () => {
  let component: RenderAddressComponent;
  let fixture: ComponentFixture<RenderAddressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderAddressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
