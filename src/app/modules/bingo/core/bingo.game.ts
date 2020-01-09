import * as _ from 'lodash';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export enum GameStatus {
  END = 'END',
  INPROGRESS = 'INPROGRESS',
}

export enum CellStatus {
  CHECKED = 'CHECKED',
  UNCHECKED = 'UNCHECKED',
  DISABLE = 'DISABLE',
}
export interface Cell {
  value: number;
  status: CellStatus;
}
interface Props {
  boardMap: number[][];
  gameState: {
    board: Cell[][];
    bingoRowIndex?: number;
    status: GameStatus;
  };
}
export class BingoGame {
  private changedSubject: Subject<any> = new Subject();
  private statusChangedSubject: Subject<any> = new Subject();

  props: Props = {
    boardMap: [],
    gameState: {
      board: [],
      status: GameStatus.INPROGRESS,
    },
  };

  get boardMap(): number[][] {
    return this.props.boardMap;
  }

  set boardMap(boardMapValue: number[][]) {
    this.props.boardMap = boardMapValue;
    this.createBoardState();
  }

  get boardState(): Cell[][] {
    return this.props.gameState.board;
  }

  get bingoRowIdx(): number {
    return this.props.gameState.bingoRowIndex;
  }

  set gameStatus(status: GameStatus) {
    this.props.gameState.status = status;
    this.statusChangedSubject.next(status);
  }

  get gameStatus(): GameStatus {
    return this.props.gameState.status;
  }

  get onStatusChanged(): Observable<any> {
    return this.statusChangedSubject.asObservable();
  }

  get onChanged(): Observable<any> {
    return this.changedSubject.asObservable();
  }

  constructor(initialBoard?: number[][]) {
    this.statusChangedSubject.pipe(switchMap(() => this.changedSubject.asObservable())).subscribe();
    this.init(initialBoard);
  }

  public init(initialBoard?: number[][]) {
    console.time('initBoardMap');
    this.boardMap = initialBoard ? initialBoard : this.initBoardMap();
    console.timeEnd('initBoardMap');
  }

  private initBoardMap(from: number = 1, to: number = 90, sets: number = 9, of: number = 5): number[][] {
    const allNumbers = fill(from, to);

    function randomPullOut(columns: number, keep: number) {
      const columnIndexs: number[] = fill(0, columns - 1);
      return (array: any[]): any[] => {
        const pullOutColumnIndexs = _.chain(columnIndexs)
          .tap(shuffle)
          .take(columns - keep)
          .value();
        _.forEach(pullOutColumnIndexs, pullOutColumnIndex => {
          array[pullOutColumnIndex] = null;
        });
        return array;
      };
    }

    function invert(array: any[][]): any[][] {
      const resultArray = [];
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (!resultArray[j]) {
            resultArray[j] = [];
          }
          resultArray[j][i] = array[i][j];
        }
      }
      return resultArray;
    }

    function checkRule(array: any[][]): boolean {
      const counts: any[] = _.reduce(array, (prev, row) => {
        _.forEach(row, (cell, cellIdx) => {
          prev[cellIdx] = prev[cellIdx] + (cell ? 1 : 0);
        });
        return prev;
      }, [0, 0, 0, 0, 0, 0, 0, 0, 0]);

      return _.max(counts) - _.min(counts) <= 2;
    }

    let numberPools: any = _.chain(allNumbers)
      .groupBy(value => Math.floor((value === to ? to - 1 : value) / 10))
      .map(array => shuffle(array))
      .map(array => _.take(array, 9))
      .value();

    numberPools = invert(numberPools);
    const randomPullOutFn = randomPullOut(numberPools.length, of);
    let result = [];

    for (let rowIndex = 0; rowIndex < numberPools.length; rowIndex++) {
      let temp = [];
      let newRow = [];
      do {
        newRow = randomPullOutFn(_.cloneDeep(numberPools[rowIndex]));
        temp = [...result, newRow];
      } while (!checkRule(temp));
      result.push(newRow);
    }
    return result;
  }

  private createBoardState() {
    const newBoardState: Cell[][] = [];
    this.boardMap.forEach((row, rowIdx) => {
      const newRow = [];
      row.forEach(cell => {
        const newCell: Cell = {
          status: cell ? CellStatus.UNCHECKED : CellStatus.DISABLE,
          value: cell,
        };
        newRow.push(newCell);
      });
      newBoardState.push(newRow);
    });

    this.props.gameState.board = newBoardState;
    delete this.props.gameState.bingoRowIndex;
    this.props.gameState.status = GameStatus.INPROGRESS;
  }

  private getCellByNumber(ball: number): Cell {
    return _.chain(this.boardState)
      .flatten()
      .find(['value', ball])
      .value();
  }

  public checkByNumber(ball: number) {
    const cell = this.getCellByNumber(ball);
    if (cell) {
      this.changeCellStatus(cell, CellStatus.CHECKED);
    }
  }

  public check(rowIdx: number, columnIdx: number, status?: CellStatus) {
    const row = this.boardState[rowIdx];
    const cell = row[columnIdx];
    if (cell.value) {
      this.changeCellStatus(cell);
    }
  }

  public restart() {
    this.createBoardState();
  }

  private findBingoRow() {
    const index = this.boardState.findIndex(row => this.isBingoRow(row));
    this.bingoRowFound(index);
  }

  private bingoRowFound(index) {
    this.props.gameState.bingoRowIndex = index;
    this.props.gameState.status = index < 0 ? GameStatus.INPROGRESS : GameStatus.END;
  }

  private isBingoRow(row: Cell[]) {
    return !_.find(row, ['status', CellStatus.UNCHECKED]);
  }

  private changeCellStatus(cell: Cell, status?: CellStatus) {
    if (status) {
      cell.status = status;
      this.findBingoRow();
      this.changedSubject.next();
    } else {
      switch (cell.status) {
        case CellStatus.CHECKED:
          cell.status = CellStatus.UNCHECKED;
          this.findBingoRow();
          this.changedSubject.next();
          break;
        case CellStatus.UNCHECKED:
          cell.status = CellStatus.CHECKED;
          this.findBingoRow();
          this.changedSubject.next();
          break;
        default:
          break;
      }
    }
  }
}

interface DrawerState {
  exposedNumbers: number[];
  numbersPoll: number[];
}

export class Dealer {
  private static readonly defaultDrawerState = {
    exposedNumbers: [],
    numbersPoll: [],
  };

  private exposedNumberSubject: Subject<number> = new Subject();
  private emptyPoolSubject: Subject<boolean> = new Subject();

  drawerState: DrawerState;

  constructor(drawerState: DrawerState = Dealer.defaultDrawerState) {
    this.drawerState = _.cloneDeep(drawerState);
    fill(1, 90, this.drawerState.numbersPoll);
  }

  get onExposedNumber(): Observable<number> {
    return this.exposedNumberSubject.asObservable();
  }

  get onEmpty(): Observable<boolean> {
    return this.emptyPoolSubject.asObservable();
  }

  private exposeNumber(ball: number) {
    this.drawerState.exposedNumbers.push(ball);
    this.exposedNumberSubject.next(ball);
  }

  shufflePool() {
    shuffle(this.drawerState.numbersPoll);
  }

  randomFromPool() {
    const idx = _.random(0, this.drawerState.numbersPoll.length - 1);
    this.exposeNumber(this.drawerState.numbersPoll[idx]);
    this.drawerState.numbersPoll.splice(idx, 1);
    if (this.drawerState.numbersPoll.length === 0) {
      this.emptyPoolSubject.next(true);
    }
  }

  restart() {}
}

function fill(fromA: number, toB: number, array: number[] = []): number[] {
  for (let i = fromA; i <= toB; i++) {
    array.push(i);
  }
  return array;
}

function shuffle<T extends any>(array: T[]): T[] {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
