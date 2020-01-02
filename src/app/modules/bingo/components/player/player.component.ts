import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input } from '@angular/core';
import { BingoGame, GameStatus } from '../../core/bingo.game';

@Component({
  selector: PlayerComponent.selector,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
  static readonly selector = 'rpr-player';
  @Input() game: BingoGame;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (!this.game) {
      this.game = new BingoGame();
    }
    this.game.onChanged.subscribe(this.cdr.detectChanges.bind(this.cdr));
  }

  get isGameInprogress(): boolean {
    return this.game.gameStatus !== GameStatus.END;
  }
}
