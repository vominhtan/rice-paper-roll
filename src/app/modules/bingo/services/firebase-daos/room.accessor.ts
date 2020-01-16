import { DocumentAccessible, DocumentAccessor } from './document.accessor';
import { CollectionAccessor } from './collection.accessor';
import { Game, Player, Room } from '../../models';
import { GameCollectionsAccessor } from './game.accessor';
import { AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


export interface RoomAccessible {
  players: CollectionAccessor<Player, DocumentAccessible<Player>>;
  messages: CollectionAccessor<any, DocumentAccessible<any>>;
  games: GameCollectionsAccessor;
}


interface Props extends  RoomAccessible{

}

export class RoomAccessor extends DocumentAccessor<Room> {
  private props: Props;

  constructor(protected docRef: AngularFirestoreDocument<Game>) {
    super(docRef);
    this.props = {
      games: new GameCollectionsAccessor(docRef.collection('games')),
      players: new CollectionAccessor(docRef.collection('players')),
      messages: new CollectionAccessor(docRef.collection('messages')),
    };
  }

  get games(): GameCollectionsAccessor {
    return this.props.games;
  }

  get players(): CollectionAccessor<Player, DocumentAccessible<Player>> {
    return this.props.players;
  }

  get messages(): CollectionAccessor<any, DocumentAccessible<any>> {
    return this.props.messages;
  }
}

export class RoomCollectionsAccessor extends CollectionAccessor<Room, DocumentAccessible<Room>> {
  constructor(protected collectionRef: AngularFirestoreCollection<Room>) {
    super(collectionRef);
  }

  fromID(id: string): RoomAccessor {
    return new RoomAccessor(this.collectionRef.doc(id));
  }
}

