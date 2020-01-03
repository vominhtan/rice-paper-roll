import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatJoinChatRoomComponent } from './chat-join-chat-room.component';

describe('ChatJoinChatRoomComponent', () => {
  let component: ChatJoinChatRoomComponent;
  let fixture: ComponentFixture<ChatJoinChatRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatJoinChatRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatJoinChatRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
