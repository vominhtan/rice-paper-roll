import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export abstract class GameService {
  abstract joinRoom(roomID: string, userName: string): void;
  abstract leaveRoom(roomID: string): void;
  abstract createNewRoom(): Observable<any>;
}

