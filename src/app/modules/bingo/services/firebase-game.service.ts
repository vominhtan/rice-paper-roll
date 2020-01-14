import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import * as firebase from 'firebase/app';

import { GameService } from './game.service';
import { User, Room } from '../models';
import { switchMap, tap, mapTo } from 'rxjs/operators';

@Injectable()
export class FirebaseGameService extends GameService {
  roomCol: AngularFirestoreCollection<Room>;
  userCol: AngularFirestoreCollection<User>;

  constructor(private afs: AngularFirestore) {
    super();
    this.roomCol = this.afs.collection<Room>('rooms');
    this.userCol = this.afs.collection<User>('users');
  }

  get timestamp() {
    return firebase.firestore.FieldValue.serverTimestamp();
  }

  joinRoom(roomID: string, userName: string): void {
    this.upsertUser(userName)
      .pipe(switchMap((user: User) => this.addUserToRoom(user, roomID)))
      .subscribe();
  }

  leaveRoom(roomID: string): void {
    throw new Error('Method not implemented.');
  }

  createNewRoom(): Observable<any> {
    return this.insertRoom();
  }

  private getPlayersInRoom(roomID: string): AngularFirestoreCollection<User> {
    return this.roomCol.doc(roomID).collection('players');
  }

  private addUserToRoom(user: User, roomID: string): Observable<any> {
    const userDoc = this.userCol.doc(user.id);
    const playerCol = this.getPlayersInRoom(roomID);
    playerCol.doc(user.id).set({
      user: userDoc.ref,
    });
  }

  private upsertUser(username: string): Observable<any> {
    const id = this.afs.createId();
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
    const id = this.afs.createId();
    return from(this.roomCol.doc(id).set({})).pipe(mapTo({ id }));
  }
}
