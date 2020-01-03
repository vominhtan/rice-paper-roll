import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DealerComponent } from './components/dealer/dealer.component';
import { BingoRoutingModule } from './routing.module';
import { CellComponent } from './components/cell/cell.component';
import { ControlComponent } from './components/control/control.component';
import { PlayerComponent } from './components/player/player.component';
import { DrawerComponent } from './components/drawer/drawer.component';
import { BoardComponent } from './components/board/board.component';
import { ChatRoomComponent } from './components/chat-room/chat-room.component';
import { ChatMessageComponent } from './components/chat-message/chat-message.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { MaterialModule } from '../shared/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatUserAvatarComponent } from './components/chat-user-avatar/chat-user-avatar.component';
import { ChatJoinChatRoomComponent } from './components/chat-join-chat-room/chat-join-chat-room.component';

@NgModule({
  declarations: [
    DealerComponent,
    CellComponent,
    ControlComponent,
    PlayerComponent,
    DrawerComponent,
    BoardComponent,
    ChatRoomComponent,
    ChatMessageComponent,
    ChatBoxComponent,
    ChatUserAvatarComponent,
    ChatJoinChatRoomComponent,
  ],
  imports: [ReactiveFormsModule, BingoRoutingModule, CommonModule, MaterialModule],
})
export class BingoModule {}
