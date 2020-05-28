import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderAuthorComponent } from './render-author.component';

describe('RenderAuthorComponent', () => {
  let component: RenderAuthorComponent;
  let fixture: ComponentFixture<RenderAuthorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderAuthorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderAuthorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
