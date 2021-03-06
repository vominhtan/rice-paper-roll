import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CellStatus } from '../../core/bingo.game';

@Component({
  selector: CellComponent.selector,
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  static readonly selector = 'rpr-cell';
  @Input() cellNumber = 0;
  @Input() status: CellStatus = CellStatus.DISABLE;
  @Input() enable = false;

  constructor() { }
}
