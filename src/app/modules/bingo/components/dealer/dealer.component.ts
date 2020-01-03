import { Component, OnInit } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';

import { BingoGame, GameStatus, Dealer } from '../../core/bingo.game';

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

  constructor() {}

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
