import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rpr-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
})
export class RowComponent {
  @Input() row: number[];

  constructor() {}
}
