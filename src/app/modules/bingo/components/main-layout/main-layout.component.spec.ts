import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BingoMainLayoutComponent } from './main-layout.component';

describe('BingoMainLayoutComponent', () => {
  let component: BingoMainLayoutComponent;
  let fixture: ComponentFixture<BingoMainLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BingoMainLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BingoMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
