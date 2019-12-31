import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../../core/bingo.game';

@Component({
  selector: RowComponent.selector,
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {

  static readonly selector = 'rpr-row';

  @Input() row: Cell[];
  @Input() isBingoRow = false;
  @Input() enable = true;
  @Output() cellClick: EventEmitter<any> = new EventEmitter();

  constructor() { }

  cellCheck(index: number) {
    this.cellClick.emit(index);
  }
}
