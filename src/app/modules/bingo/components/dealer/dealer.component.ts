import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

class BingoGame {
  board: number[][] = [];
  constructor(initialBoard?: number[][]) {
    this.board = initialBoard ? initialBoard : this.initBoard();
  }

  private initBoard(from: number = 1, to: number = 90, sets: number = 9, of: number = 5): number[][] {
    console.time('initBoard');
    const allNumbers = fill(from, to);

    function fill(from: number, to: number, array: number[] = []): number[] {
      const result = array;
      for (let i = from; i <= to; i++) {
        result.push(i);
      }
      return result;
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
      const columnIndexs: number[] = fill(0, columns-1);
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
      const result = [];
      for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array[i].length; j++) {
          if (!result[j]) {
            result[j] = [];
          }
          result[j][i] = array[i][j];
        }
      }
      return result;
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

    console.timeEnd('initBoard');

    return result;
  }
}

@Component({
  selector: 'rpr-dealer',
  templateUrl: './dealer.component.html',
  styleUrls: ['./dealer.component.scss'],
})
export class DealerComponent implements OnInit {
  bg: BingoGame;

  constructor() {}

  ngOnInit() {
    this.bg = new BingoGame();
  }
}
