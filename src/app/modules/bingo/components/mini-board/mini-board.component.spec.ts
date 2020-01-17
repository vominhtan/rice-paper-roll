import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniBoardComponent } from './mini-board.component';

describe('MiniBoardComponent', () => {
  let component: MiniBoardComponent;
  let fixture: ComponentFixture<MiniBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
