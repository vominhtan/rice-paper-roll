import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../models/chat-room';

@Component({
  selector: 'rpr-chat-user-avatar',
  templateUrl: './chat-user-avatar.component.html',
  styleUrls: ['./chat-user-avatar.component.scss']
})
export class ChatUserAvatarComponent implements OnInit {

  @Input() userId: string;

  user$: Observable<User>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {
    this.user$ = this.afs.doc<User>(`users/${this.userId}`).valueChanges();
  }

}
