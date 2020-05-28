import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CompaniesModalTabsComponent } from './modal-tabs.component';


describe('CompaniesModalComponent', () => {
  let component: CompaniesModalTabsComponent;
  let fixture: ComponentFixture<CompaniesModalTabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesModalTabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesModalTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
