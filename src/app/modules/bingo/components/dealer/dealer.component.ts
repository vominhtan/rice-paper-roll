import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { BingoGame, GameStatus, Dealer } from '../../core/bingo.game';
import { Subscription } from 'rxjs';
@Component({
  selector: DealerComponent.selector,
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DealerComponent implements OnInit {
  static readonly selector = 'rpr-dealer';
  game: BingoGame;
  dealer: Dealer;
  dealerSubscription: Subscription;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.game = new BingoGame();
    this.game.onChanged.subscribe(this.cdr.detectChanges.bind(this.cdr));
    this.initDealer();
  }

  initDealer() {
    if (this.dealerSubscription) {
      this.dealerSubscription.unsubscribe();
    }
    this.dealer = new Dealer();
    this.dealerSubscription = this.dealer.onExposedNumber.subscribe(this.game.checkByNumber.bind(this.game));
  }

  get isGameInprogress(): boolean {
    return this.game.gameStatus !== GameStatus.END;
  }
}
