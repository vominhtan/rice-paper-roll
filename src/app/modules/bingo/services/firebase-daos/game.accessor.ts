import { DocumentAccessible, DocumentAccessor } from './document.accessor';
import { CollectionAccessor } from './collection.accessor';
import { Board, Game } from '../../models';
import { AngularFirestoreDocument, AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

export interface GameAccessible extends DocumentAccessible<Game> {
  boards: CollectionAccessor<Board, DocumentAccessible<Board>>;
}

interface Props {
  boards?: CollectionAccessor<Board, DocumentAccessible<Board>>;
}

export class GameAccessor extends DocumentAccessor<Game> implements GameAccessible {
  private props: Props = {};

  constructor(protected docRef: AngularFirestoreDocument<Game>) {
    super(docRef);
    this.props.boards = new CollectionAccessor(docRef.collection('boards'));
  }

  get boards(): CollectionAccessor<Board, DocumentAccessible<Board>> {
    return this.props.boards;
  }
}

export class GameCollectionsAccessor extends CollectionAccessor<Game, GameAccessor> {
  constructor(protected collectionRef: AngularFirestoreCollection<Game>) {
    super(collectionRef);
  }

  fromID(id: string): GameAccessor {
    return new GameAccessor(this.collectionRef.doc(id));
  }
}
