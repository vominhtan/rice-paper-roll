import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap, filter, mapTo, map } from 'rxjs/operators';
import { Observable, Subject, merge, combineLatest, from, of } from 'rxjs';
import { Room, Message, User } from '../../models/chat-room';
import * as firebase from 'firebase/app';

@Component({
  selector: ChatRoomComponent.selector,
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
})
export class ChatRoomComponent implements OnInit {
  static readonly selector = 'rpr-chat-room';

  private sendMessageSubject: Subject<string> = new Subject();

  room$: Observable<Room>;
  user$: Observable<User>;
  roomMessages$: Observable<any[]>;
  private roomDoc: AngularFirestoreDocument<Room>;
  private userDoc: AngularFirestoreDocument<User>;
  private roomMessageCollection: AngularFirestoreCollection<Message | any>;

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.room$ = route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.roomDoc = afs.doc<Room>(`rooms/${queryParams.roomId}`);
        return this.roomDoc.valueChanges();
      }),
      filter(room => room !== null && room !== undefined),
    );

    this.roomMessages$ = route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.roomMessageCollection = afs.collection(`rooms/${queryParams.roomId}/messages`);
        return this.roomMessageCollection.valueChanges(({idField: 'id'}));
      }),
      tap(value => console.log(value)),
    );

    this.user$ = route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.userDoc = afs.doc<User>(`users/${queryParams.username}`);
        return this.userDoc.valueChanges();
      }),
    );

    combineLatest(this.room$, this.user$)
      .pipe(
        filter(([room, user]: [Room, User]) => room !== null && user !== null),
        switchMap(
          ([room, user]) => this.sendMessageSubject.asObservable(),
          (outer, inner) => ([...outer, inner]),
        ),
        switchMap(([room, user, content]: [Room, User, string]) => {
          const message: Message = {
            content,
            hashtag: '',
            createdAt: this.timestamp,
         };
          return from(this.roomMessageCollection.add({
            ...message,
            user: this.userDoc.ref,
          }));
        })
      )
      .subscribe((messageRef: DocumentReference) => {
        console.log(messageRef);
      });
  }

  ngOnInit() {}

  sendMessage(message: string) {
    this.sendMessageSubject.next(message);
  }
}
