import { Component, OnInit } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { switchMap, filter, map, tap, mapTo } from 'rxjs/operators';

import { BingoGame, GameStatus, Dealer } from '../../core/bingo.game';
import { ActivatedRoute, Params } from '@angular/router';

interface Room {
  messages: any[];
  users: any[];
}
@Component({
  selector: DealerComponent.selector,
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
})
export class DealerComponent implements OnInit {
  static readonly selector = 'rpr-dealer';
  dealerSubject: Subject<Dealer> = new BehaviorSubject(null);
  gameSubject: Subject<BingoGame> = new BehaviorSubject(null);
  dealerSubscription: Subscription;
  dealer$: Observable<Dealer>;
  game$: Observable<BingoGame>;
  isGameInProgress$: Observable<boolean>;
  private roomDoc: AngularFirestoreDocument<Room>;

  room$: Observable<Room>;

  constructor(private afs: AngularFirestore, private route: ActivatedRoute) {
    this.room$ = route.queryParams.pipe(
      switchMap(
        (queryParams: Params) => {
          console.log(queryParams);
          this.roomDoc = afs.doc<Room>(`rooms/${queryParams.roomId}`);
          return this.roomDoc.valueChanges();
        }
      ),
      tap(room => console.log(room)),
    );
  }

  ngOnInit() {
    this.dealer$ = this.dealerSubject.asObservable();
    this.game$ = this.gameSubject.asObservable();

    this.isGameInProgress$ = this.game$.pipe(
      filter(game => game !== null),
      switchMap(game => game.onStatusChanged),
      map(gameStatus => gameStatus !== GameStatus.END),
    );

    combineLatest(this.dealer$, this.game$)
      .pipe(
        filter(([dealer, game]) => {
          return dealer !== null && game !== null;
        }),
      )
      .subscribe(([dealer, game]) => {
        if (this.dealerSubscription) {
          this.dealerSubscription.unsubscribe();
        }
        this.dealerSubscription = dealer.onExposedNumber.subscribe(game.checkByNumber.bind(game));
      });

    this.initDealer();
    this.initGame();
  }

  initGame() {
    const game = new BingoGame();
    this.gameSubject.next(game);
  }

  initDealer() {
    this.dealerSubject.next(new Dealer());
  }
}
