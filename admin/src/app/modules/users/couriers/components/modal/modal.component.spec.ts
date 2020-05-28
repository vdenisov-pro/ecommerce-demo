import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourierModalComponent } from './modal.component';

describe('CouriersModalComponent', () => {
  let component: CourierModalComponent;
  let fixture: ComponentFixture<CourierModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourierModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourierModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
