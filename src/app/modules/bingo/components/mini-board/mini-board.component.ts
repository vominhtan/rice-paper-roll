import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { BingoGame, Cell } from '../../core/bingo.game';

@Component({
  selector: MiniBoardComponent.selector,
  templateUrl: './mini-board.component.html',
  styleUrls: ['./mini-board.component.scss'],
})
export class MiniBoardComponent implements OnInit {
  static readonly selector = 'rpr-mini-board';
  @Input() theme = 'theme-red';
  @Input() username = 'N/A';
  @Input() boardState: Cell[][];
  // @Input() roomID: string;
  // @Input() userID: string;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    // if (!this.game) {
    //   this.game = new BingoGame();
    // }
    // this.game.onChanged.subscribe(this.cdr.detectChanges.bind(this.cdr));
  }
}
