import { Component, OnInit, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as _ from 'lodash';
import { Cell, CellStatus } from '../../core/bingo.game';

@Component({
  selector: 'rpr-game-status',
  templateUrl: './game-status.component.html',
  styleUrls: ['./game-status.component.scss'],
})
export class GameStatusComponent implements OnInit {
  @Input() roomID: string;
  boardStates$: Observable<Cell[][][]>;

  constructor(private gameService: GameService) {}

  ngOnInit() {
    this.boardStates$ = this.gameService.getGameStatus(this.roomID, 'currentGame').pipe(
      map(gameState => {
        return _.chain(gameState)
          .sortBy((board) => {
            return 0 - _.filter(board.boardState, {status: CellStatus.CHECKED}).length;
          })
          .each(board => {
            board.boardState = _.chunk(board.boardState, 9);
          })
          .value();
      }),
    );
  }
}
