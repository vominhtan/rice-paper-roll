
import * as _ from 'lodash';

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

    props: Props = {
        boardMap: [],
        gameState: {
            board: [],
            status: GameStatus.INPROGRESS,
        }
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

    get gameStatus(): GameStatus {
        return this.props.gameState.status;
    }

    constructor(initialBoard?: number[][]) {
        this.init(initialBoard);
    }

    public init(initialBoard?: number[][]) {
        this.boardMap = initialBoard ? initialBoard : this.initBoardMap();
    }

    private initBoardMap(from: number = 1, to: number = 90, sets: number = 9, of: number = 5): number[][] {
        const allNumbers = fill(from, to);

        function fill(fromA: number, toB: number, array: number[] = []): number[] {
            for (let i = fromA; i <= toB; i++) {
                array.push(i);
            }
            return array;
        }

        function shuffle(array) {
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

        function randomPullOut(columns: number, keep: number) {
            const columnIndexs: number[] = fill(0, columns - 1);
            return (array: any[]): any[] => {
                console.log(array.length);
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

        let numberPools: any = _.chain(allNumbers)
            .groupBy(value => Math.floor((value === to ? to - 1 : value) / 10))
            .map(array => shuffle(array))
            .map(array => _.take(array, 9))
            .value();

        numberPools = invert(numberPools);
        console.log(numberPools);
        const randomPullOutFn = randomPullOut(numberPools.length, of);
        const result = _.map(_.cloneDeep(numberPools), array => {
            return randomPullOutFn(array);
        });

        return result;
    }

    private createBoardState() {
        const newBoardState: Cell[][] = [];
        this.boardMap.forEach((row, rowIdx) => {
            const newRow = [];
            row.forEach((cell) => {
                const newCell: Cell = {
                    status: cell ? CellStatus.UNCHECKED : CellStatus.DISABLE,
                    value: cell
                };
                newRow.push(newCell);
            });
            newBoardState.push(newRow);
        });

        this.props.gameState.board = newBoardState;
        delete this.props.gameState.bingoRowIndex;
        this.props.gameState.status = GameStatus.INPROGRESS;
    }

    public check(rowIdx: number, columnIdx: number) {
        if (this.props.gameState.status === GameStatus.END) { return; }
        const row = this.boardState[rowIdx];
        const cell = row[columnIdx];
        if (cell.value) {
            this.changeCellStatus(cell);
            if (this.isBingoRow(row)) {
                this.bingoRowFound(rowIdx);
            }
        }
    }

    public restart() {
        this.createBoardState();
    }

    private bingoRowFound(index) {
        this.props.gameState.bingoRowIndex = index;
        this.props.gameState.status = GameStatus.END;
    }

    private isBingoRow(row: Cell[]) {
        return !_.find(row, ['status', CellStatus.UNCHECKED]);
    }

    private changeCellStatus(cell: Cell) {
        switch (cell.status) {
            case CellStatus.CHECKED:
                cell.status = CellStatus.UNCHECKED;
                return;
            case CellStatus.UNCHECKED:
                cell.status = CellStatus.CHECKED;
                return;
            default:
                return;
        }
    }
}