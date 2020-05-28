import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabPositionsComponent } from './tab-positions.component';

describe('TabPositionsComponent', () => {
  let component: TabPositionsComponent;
  let fixture: ComponentFixture<TabPositionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabPositionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
