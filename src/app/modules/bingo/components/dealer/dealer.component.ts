import { Component, OnInit } from '@angular/core';
import { BingoGame, GameStatus } from '../../core/bingo.game';
@Component({
  selector: DealerComponent.selector,
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
})
export class DealerComponent implements OnInit {
  static readonly selector = 'rpr-dealer';
  game: BingoGame;

  constructor() { }

  ngOnInit() {
    this.game = new BingoGame();
  }

  get isGameInprogress(): boolean {
    return this.game.gameStatus !== GameStatus.END;
  }
}
