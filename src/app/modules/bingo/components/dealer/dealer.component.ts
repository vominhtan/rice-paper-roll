import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription, Subject, BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { switchMap, filter, map } from 'rxjs/operators';
import { chain } from 'lodash';

import { BingoGame, GameStatus, Dealer, CellStatus, Cell } from '../../core/bingo.game';
import { BoardComponent } from '../board/board.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { SettingService } from '../../services/setting.service';
import { getFullTreeParams } from '../../utils/common.utils';
import { GameService } from '../../services/game.service';

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
  checkedNumbers$: Observable<number[]>;
  game$: Observable<BingoGame>;
  isGameInProgress$: Observable<boolean>;
  theme$: Observable<string>;
  roomID: string;
  userID: string;

  @ViewChild('board', { static: true }) board: BoardComponent;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingService: SettingService,
    private gameService: GameService,
  ) {}

  ngOnInit() {
    this.roomID = getFullTreeParams(this.activatedRoute)['roomID'];

    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.userID = queryParams.userID;
    });

    this.dealer$ = this.dealerSubject.asObservable();
    this.game$ = this.gameSubject.asObservable();
    this.theme$ = this.settingService.colorTheme$;

    this.isGameInProgress$ = this.game$.pipe(
      filter(game => game !== null),
      switchMap(game => game.onStatusChanged),
      map(gameStatus => gameStatus !== GameStatus.END),
    );

    this.checkedNumbers$ = this.game$.pipe(
      filter(game => game !== null),
      switchMap(
        game => game.onChanged,
        (outerValue: BingoGame) => outerValue,
      ),
      map((game: BingoGame) =>
        chain(game.boardState)
          .flatten()
          .filter((cell: Cell) => {
            return cell.value && cell.status === CellStatus.CHECKED;
          })
          .map('value')
          .value(),
      ),
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
        this.dealerSubscription = dealer.onExposedNumber.subscribe(value => {
          this.gameService.announceNumber(this.roomID, value);
          this.announceNumber(value);
          game.checkByNumber(value);
        });
      });

    this.initDealer();
    this.initGame();
  }

  announceNumber(value: number) {
    this.board.announce(value);
  }

  initGame() {
    const game = new BingoGame();
    this.gameSubject.next(game);
  }

  initDealer() {
    this.dealerSubject.next(new Dealer());
    this.gameService.deleteMessages(this.roomID).subscribe();
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute, queryParamsHandling: 'merge' });
  }
}
