import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import * as firebase from 'firebase/app';

import { GameService } from './game.service';
import { User, Room } from '../models';
import { switchMap, tap, mapTo, map } from 'rxjs/operators';
import { BingoGame } from '../core/bingo.game';
import { RoomCollectionsAccessor } from './firebase-daos/room.accessor';

@Injectable()
export class FirebaseGameService extends GameService {
  roomCol: AngularFirestoreCollection<Room>;
  userCol: AngularFirestoreCollection<User>;
  roomsAccessor: RoomCollectionsAccessor;

  constructor(private afs: AngularFirestore) {
    super();
    this.roomCol = this.afs.collection<Room>('rooms');
    this.roomsAccessor = new RoomCollectionsAccessor(this.roomCol);
    this.userCol = this.afs.collection<User>('users');
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  joinRoom(roomID: string, userName: string): Observable<{ room: Room; user: User }> {
    return this.upsertUser(userName).pipe(
      switchMap(
        (user: User) => this.addUserToRoom(user, roomID),
        (outerValue: User) => outerValue,
      ),
      map((value: User) => ({ room: { id: roomID }, user: value })),
    );
  }

  leaveRoom(roomID: string): void {
    throw new Error('Method not implemented.');
  }

  createNewRoom(): Observable<any> {
    return this.insertRoom();
  }

  announceNumber(roomID: string, value: number): Observable<any> {
    return this.sendMessage(roomID, value);
  }

  deleteMessages(roomID: string): Observable<any> {
    return this.deleteAllMessageInRoom(roomID);
  }

  updateGame(roomID: string, userID: string, game: BingoGame): Observable<any> {
    return this.roomsAccessor
      .fromID(roomID)
      .games.fromID('currentGame')
      .boards.push(userID, game);
  }

  connectToRoomMessages(roomID: string): Observable<any> {
    // TODO: refactor later
    return this.roomsAccessor.fromID(roomID).ref.collection(`messages`, ref =>
      ref.orderBy('createdAt', 'asc').limitToLast(100),
    ).stateChanges(['added']).pipe(
      map(actions =>
        actions.map(m => {
          const data: any = m.payload.doc.data();
          const id = m.payload.doc.id;
          return { id, ...data };
        }),
      ),
    );
  }

  private genId(): string {
    return this.afs.createId();
  }

  private sendMessage(roomID: string, value: number): Observable<any> {
    return this.roomsAccessor.fromID(roomID).messages.push(this.genId(), {
      createdAt: this.timestamp,
      hashtag: '',
      content: `[${value}]`,
    });
  }

  private deleteAllMessageInRoom(roomID: string): Observable<any> {
    return this.roomsAccessor.fromID(roomID).messages.deleteAll();
  }

  private addUserToRoom(user: User, roomID: string): Observable<any> {
    const userDoc = this.userCol.doc(user.id);
    return this.roomsAccessor.fromID(roomID).players.push(user.id, {
      user: userDoc.ref,
    });
  }

  private upsertUser(username: string): Observable<any> {
    const id = this.genId();
    return this.afs
      .collection<User>('users', ref => ref.where('username', '==', username))
      .valueChanges()
      .pipe(
        switchMap((users: User[]) => {
          return users && users.length <= 0
            ? from(
                this.userCol.doc(id).set({
                  hashtag: 'player',
                  kind: 'user',
                  username,
                  id,
                }),
              ).pipe(tap(value => console.log(value)))
            : of(users[0]);
        }),
      );
  }

  private insertRoom(): Observable<Room> {
    const id = this.genId();
    return from(this.roomCol.doc(id).set({})).pipe(mapTo({ id }));
  }
}
