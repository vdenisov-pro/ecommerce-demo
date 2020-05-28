import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCreatedAtComponent } from './render-created-at.component';

describe('RenderCreatedAtComponent', () => {
  let component: RenderCreatedAtComponent;
  let fixture: ComponentFixture<RenderCreatedAtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCreatedAtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCreatedAtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
