import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCourierComponent } from './render-courier.component';

describe('RenderCourierComponent', () => {
  let component: RenderCourierComponent;
  let fixture: ComponentFixture<RenderCourierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCourierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCourierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
