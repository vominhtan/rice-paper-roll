import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import * as firebase from 'firebase/app';

import { GameService } from './game.service';
import { User, Room } from '../models';
import { switchMap, tap, mapTo, take, map } from 'rxjs/operators';
import { Base } from '../models/base.model';
import { BingoGame } from '../core/bingo.game';

interface Game extends Base {}

interface Board extends Base {}

interface Player extends Base {}

interface DocumentAccessor<T extends Base> {}

interface CollectionAccessor<T extends Base, B extends DocumentAccessor<T>> {
  deleteAll: any;
  push: any;
  fromID: (id: string) => B;
}

interface GameAccessor extends DocumentAccessor<Game> {
  boards: CollectionAccessor<Board, DocumentAccessor<Board>>;
}

interface RoomAccessor extends DocumentAccessor<Room> {
  players: CollectionAccessor<Player, DocumentAccessor<Player>>;
  messages: CollectionAccessor<any, DocumentAccessor<any>>;
  games: CollectionAccessor<Game, GameAccessor>;
}

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

  announceNumber(roomID: string, number: number): Observable<any> {
    return this.sendMessage(roomID, number);
  }

  deleteMessages(roomID: string): Observable<any> {
    return this.deleteAllMessageInRoom(roomID);
  }

  updateGame(roomID: string, userID: string, game: BingoGame): Observable<any> {
    return this.fromRoomID(roomID)
      .games.fromID('currentGame')
      .boards.push(userID, game);
  }

  private sendMessage(roomID: string, number: number): Observable<any> {
    return this.fromRoomID(roomID).messages.push({
      createdAt: this.timestamp,
      hashtag: '',
      content: `[${number}}]`,
    });
  }

  private createCollectionsAccessor<T extends Base>(
    collectionRef: AngularFirestoreCollection<T>,
  ): CollectionAccessor<T, DocumentAccessor<T>> {
    const self = this;
    return {
      deleteAll(): Observable<any> {
        return collectionRef.valueChanges({ idField: 'id' }).pipe(
          take(1),
          switchMap((values: T[]) => {
            return from(
              Promise.all(
                values.map(value => {
                  return collectionRef.doc(value.id).delete();
                }),
              ),
            );
          }),
        );
      },
      push(id: string, data: string): Observable<any> {
        let payload = data;
        let uuid = id;
        if(!payload) {
          payload = id;
          uuid = self.afs.createId();
        }
        return from(collectionRef.doc(uuid).set(payload));
      },
      fromID(id: string): DocumentAccessor<T> {
        return self.createGameDocumentAccessor(collectionRef.doc(id));
      },
    };
  }

  private createGameDocumentAccessor<T extends Base>(docRef: AngularFirestoreDocument<T>): GameAccessor {
    return {
      boards: this.createCollectionsAccessor(docRef.collection('boards')),
    };
  }

  private fromRoomID(roomID: string): RoomAccessor {
    const roomDoc = this.roomCol.doc(roomID);
    return {
      players: this.createCollectionsAccessor(roomDoc.collection('players')),
      messages: this.createCollectionsAccessor(roomDoc.collection('messages')),
      games: this.createCollectionsAccessor(roomDoc.collection('games')),
    };
  }

  private deleteAllMessageInRoom(roomID: string): Observable<any> {
    return this.fromRoomID(roomID).messages.deleteAll();
  }

  private addUserToRoom(user: User, roomID: string): Observable<any> {
    const userDoc = this.userCol.doc(user.id);
    return this.fromRoomID(roomID).players.push(user.id, {
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
