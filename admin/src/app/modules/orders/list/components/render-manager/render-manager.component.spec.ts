import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderManagerComponent } from './render-manager.component';

describe('RenderManagerComponent', () => {
  let component: RenderManagerComponent;
  let fixture: ComponentFixture<RenderManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
