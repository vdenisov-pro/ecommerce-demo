import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderCompanyComponent } from './render-company.component';

describe('RenderCompanyComponent', () => {
  let component: RenderCompanyComponent;
  let fixture: ComponentFixture<RenderCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
