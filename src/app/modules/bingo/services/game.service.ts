import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Room, User } from '../models';
import { BingoGame } from '../core/bingo.game';

@Injectable()
export abstract class GameService {
  abstract joinRoom(roomID: string, userName: string): Observable<{room: Room, user: User}>;
  abstract updateGame(roomID: string, userID: string, game: BingoGame): Observable<any>;
  abstract leaveRoom(roomID: string): void;
  abstract deleteMessages(roomID: string): Observable<any>;
  abstract announceNumber(roomID: string, value: number): Observable<any>;
  abstract connectToRoomMessages(roomID: string): Observable<any>;
  abstract createNewRoom(): Observable<any>;
}

