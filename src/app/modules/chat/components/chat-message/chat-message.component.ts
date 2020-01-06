import { Component, OnInit, Input } from '@angular/core';
import { AngularFirestoreDocument, AngularFirestore, DocumentReference } from '@angular/fire/firestore';
import { Message } from '../../models/chat-room';

interface CustomeMessage extends Message {
  user: DocumentReference
}

@Component({
  selector: ChatMessageComponent.selector,
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.scss']
})
export class ChatMessageComponent implements OnInit {

  @Input() message: CustomeMessage;
  @Input() userIndex: number;
  @Input() currentUserId: string;

  static readonly selector = 'rpr-chat-message';
  private messageDoc: AngularFirestoreDocument<Message>;

  constructor(private afs: AngularFirestore) {}

  ngOnInit() {
  }
}
