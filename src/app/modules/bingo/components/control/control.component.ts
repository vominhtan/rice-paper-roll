import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { BingoGame } from '../../core/bingo.game';

@Component({
  selector: ControlComponent.selector,
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  static readonly selector = 'rpr-control';

  @Input() game: BingoGame;

  constructor() { }

  ngOnInit() {
  }

  newGame() {
    this.game.restart();
  }

  newBoard() {
    this.game.init();
  }

  waiting() {

  }
}
