import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BingoGame, GameStatus } from '../../core/bingo.game';

@Component({
  selector: BoardComponent.selector,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  static readonly selector = 'rpr-board';
  @Input() game: BingoGame;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.game) {
      this.game = new BingoGame();
    }
    this.game.onChanged.subscribe(this.cdr.detectChanges.bind(this.cdr));
  }
}
