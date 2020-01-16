import { Base } from '../../models/base.model';
import { DocumentAccessible } from './document.accessor';
import { from, Observable } from 'rxjs';
import { AngularFirestoreCollection, QueryFn } from '@angular/fire/firestore';
import { take, switchMap } from 'rxjs/operators';

export interface CollectionAccessible<T extends Base, B extends DocumentAccessible<T>> {
  deleteAll(): Observable<any>;
  push(id: string, data: string): Observable<any>;
  fromID?(id: string): B;
  ref: AngularFirestoreCollection<T>;
}

export class CollectionAccessor<T extends Base, B extends DocumentAccessible<T>> implements CollectionAccessible<T, B> {
  constructor(protected collectionRef: AngularFirestoreCollection<T>) {}

  deleteAll(): Observable<any> {
    return this.collectionRef.valueChanges({ idField: 'id' }).pipe(
      take(1),
      switchMap((values: T[]) => {
        return from(
          Promise.all(
            values.map(value => {
              return this.collectionRef.doc(value.id).delete();
            }),
          ),
        );
      }),
    );
  }
  push(id: string, data: any): Observable<any> {
    return from(this.collectionRef.doc(id).set(data));
  }

  get ref(): AngularFirestoreCollection<T> {
    return this.collectionRef;
  }
}
