import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: RowComponent.selector,
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {

  static readonly selector = 'rpr-row';

  @Input() row: number[];

  constructor() {}

  cellCheck(index: number, cellNumber: number, checked: boolean) {
    console.log(arguments);
  }
}
