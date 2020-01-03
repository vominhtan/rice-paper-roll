import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatUserAvatarComponent } from './chat-user-avatar.component';

describe('ChatUserAvatarComponent', () => {
  let component: ChatUserAvatarComponent;
  let fixture: ComponentFixture<ChatUserAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatUserAvatarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatUserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
