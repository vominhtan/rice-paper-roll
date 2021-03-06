import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreMainViewComponent } from './main-view.component';

describe('MainViewComponent', () => {
  let component: StoreMainViewComponent;
  let fixture: ComponentFixture<StoreMainViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreMainViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreMainViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
