import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatUserAvatarComponent } from './components/chat-user-avatar/chat-user-avatar.component';
import { ChatJoinChatRoomComponent } from './components/chat-join-chat-room/chat-join-chat-room.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { DatePipe } from './pipes/date.pipe';



@NgModule({
  declarations: [
    ChatRoomComponent,
    ChatMessageComponent,
    ChatBoxComponent,
    ChatUserAvatarComponent,
    ChatJoinChatRoomComponent,
    DatePipe,
  ],
  imports: [
    ReactiveFormsModule,
    MaterialModule,
    CommonModule
  ],
  exports: [
    ChatRoomComponent,
  ]
})
export class ChatModule { }
