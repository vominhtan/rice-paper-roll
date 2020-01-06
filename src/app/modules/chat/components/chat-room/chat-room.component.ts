import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
  DocumentReference,
} from '@angular/fire/firestore';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, tap, filter, mapTo, map, first, skip } from 'rxjs/operators';
import { Observable, Subject, merge, combineLatest, from, of, concat } from 'rxjs';
import * as firebase from 'firebase/app';
import * as _ from 'lodash';
import { Room, Message, User } from '../../models/chat-room';

@Component({
  selector: ChatRoomComponent.selector,
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  users$: Observable<any[]>;
  users: any[];
  userIndexById: { [key: string]: number };
  roomMessages: any[] = [];
  userIndex: number;

  @ViewChild('messageList', { static: false }) private messageListContainer: ElementRef;
  @Output() messageRecieved: EventEmitter<Message> = new EventEmitter();

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  constructor(private afs: AngularFirestore, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.listenRoomChange();
    this.listenUsersInRoom();
    this.listenRoomMessages();
    this.listenUserChange();
    this.handleSendMessage();
    this.userIndex = _.random(1, 19);
  }

  private listenRoomChange() {
    this.room$ = this.route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.roomDoc = this.afs.doc<Room>(`rooms/${queryParams.roomId}`);
        return this.roomDoc.valueChanges();
      }),
      filter(room => room !== null && room !== undefined),
      tap(room => console.log(room)),
    );
  }

  private listenUsersInRoom() {
    this.users$ = this.route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.roomMessageCollection = this.afs.collection(`rooms/${queryParams.roomId}/players`);
        return this.roomMessageCollection.valueChanges();
      }),
      tap(usersInChatRoom => {
        this.users = usersInChatRoom;
        this.userIndexById = _.reduce(
          usersInChatRoom,
          (userIndexById, userInChatRoom, index) => {
            userIndexById[userInChatRoom.user.id] = index;
            return userIndexById;
          },
          {},
        );
      }),
    );
    this.users$.subscribe();
  }

  private listenRoomMessages() {
    this.roomMessages$ = this.route.queryParams.pipe(
      switchMap((queryParams: Params) => {
        this.roomMessageCollection = this.afs.collection(`rooms/${queryParams.roomId}/messages`, ref =>
          ref.orderBy('createdAt', 'asc').limitToLast(100),
        );
        return this.roomMessageCollection.stateChanges(['added']);
      }),
      map(actions =>
        actions.map(m => {
          const data = m.payload.doc.data() as Message;
          const id = m.payload.doc.id;
          return { id, ...data };
        }),
      ),
      map(messages => {
        let iteratorMessage = _.last(this.roomMessages);
        _.forEach(messages, (message: any) => {
          iteratorMessage = iteratorMessage || message;
          message.hideUserInformation = message.user.id === iteratorMessage.user.id;
          message.userIndex = this.userIndexById[message.user.id];
          iteratorMessage = message;
        });
        return messages;
      }),
    );

    this.roomMessages$
      .pipe(
        skip(1),
        tap((messages: Message[]) => {
          this.messageRecieved.emit(messages[0]);
        }),
      )
      .subscribe();

    this.roomMessages$.subscribe(newMessages => {
      this.roomMessages.push(...newMessages);
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
      this.cdr.detectChanges();
    });
  }

  scrollToBottom(): void {
    try {
      this.messageListContainer.nativeElement.scrollTop = this.messageListContainer.nativeElement.scrollHeight + 1000;
    } catch (err) {}
  }

  private listenUserChange() {
    this.user$ = this.route.queryParams.pipe(
      filter(queryParams => queryParams.userId !== undefined),
      switchMap((queryParams: Params) => {
        this.userDoc = this.afs.doc<User>(`users/${queryParams.userId}`);
        return this.userDoc.valueChanges();
      }),
      tap(user => {
        this.roomDoc
          .collection('players')
          .doc(user.id)
          .set({
            user: this.userDoc.ref,
          });
      }),
    );
  }

  private handleSendMessage() {
    combineLatest(this.room$, this.user$)
      .pipe(
        filter(([room, user]: [Room, User]) => room !== null && user !== null),
        switchMap(
          ([room, user]) => this.sendMessageSubject.asObservable(),
          (outer, inner) => [...outer, inner],
        ),
        switchMap(([room, user, content]: [Room, User, string]) => {
          const message: Message = {
            content,
            hashtag: '',
            createdAt: this.timestamp,
          };
          return from(
            this.roomMessageCollection.add({
              ...message,
              user: this.userDoc.ref,
            }),
          );
        }),
      )
      .subscribe((messageRef: DocumentReference) => {
        console.log(messageRef);
      });
  }

  sendMessage(message: string) {
    this.sendMessageSubject.next(message);
  }
}
