import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: CellComponent.selector,
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {

  static readonly selector = 'rpr-cell';
  @Input() cellNumber: number;
  @Input() cellIndex: number;
  @Output() check: EventEmitter<any> = new EventEmitter();
  checked = false;

  constructor() { }

  toggle() {
    this.checked = !this.checked;
    if (this.checked) {
      this.check.emit(this.checked);
    }
  }

}
