import { Component, OnInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of, from } from 'rxjs';
import { User } from '../../models/chat-room';
import * as firebase from 'firebase/app';
import { switchMap, tap } from 'rxjs/operators';

enum KeyCodes {
  ESCAPE_KEYCODE = 27,
  ENTER_KEYCODE = 13,
}

@Component({
  selector: ChatJoinChatRoomComponent.selector,
  templateUrl: './chat-join-chat-room.component.html',
  styleUrls: ['./chat-join-chat-room.component.scss'],
})
export class ChatJoinChatRoomComponent implements OnInit {
  static readonly selector = 'rpr-chat-join-chat-room';

  joinChatRoomFG: FormGroup;

  constructor(private router: Router, private fb: FormBuilder, private afs: AngularFirestore) {
    this.joinChatRoomFG = fb.group({
      roomId: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {}

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  join() {
    if (this.joinChatRoomFG.valid) {
      this.createOrUpdateUser(this.joinChatRoomFG.value['username']).subscribe(() => {
        this.router.navigate(['./'], { queryParams: this.joinChatRoomFG.value });
      });
    }
  }

  clear() {
    this.joinChatRoomFG.reset('');
  }

  createOrUpdateUser(username: string): Observable<any> {
    const userCol = this.afs.collection<User>('users');
    const id = this.afs.createId();
    return this.afs
      .collection<User>('users', ref => ref.where('username', '==', username))
      .valueChanges()
      .pipe(
        switchMap((users: User[]) => {
          return users && users.length <= 0
            ? from(
                userCol.doc<User>(id).set({
                  hashtag: 'player',
                  username,
                  id,
                }),
              ).pipe(tap(value => console.log(value)))
            : of(users[0]);
        }),
      );
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    switch (event.keyCode as KeyCodes) {
      case KeyCodes.ENTER_KEYCODE:
        this.join();
        break;
      case KeyCodes.ESCAPE_KEYCODE:
        this.clear();
        break;
      default:
        break;
    }
  }
}
