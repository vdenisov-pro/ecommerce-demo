import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBasicInfoComponent } from './tab-basic-info.component';

describe('TabBasicInfoComponent', () => {
  let component: TabBasicInfoComponent;
  let fixture: ComponentFixture<TabBasicInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabBasicInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBasicInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
