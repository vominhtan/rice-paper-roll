import { Base } from "../../models/base.model";
import { AngularFirestoreDocument } from '@angular/fire/firestore';

export interface DocumentAccessible<T extends Base> {
  ref: AngularFirestoreDocument<T>;
}

export class DocumentAccessor<T extends Base> implements DocumentAccessible<T>{

  constructor(protected docRef: AngularFirestoreDocument<T>) {

  }

  get ref(): AngularFirestoreDocument<T> {
    return this.docRef;
  }
}
