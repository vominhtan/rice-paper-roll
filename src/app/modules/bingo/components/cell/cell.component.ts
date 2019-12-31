import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'rpr-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  @Input() cellNumber: number;
  checked = false;

  constructor() { }

  toggle() {
    this.checked = !this.checked;
  }

}
