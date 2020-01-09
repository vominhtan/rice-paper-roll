import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';

@Component({
  selector: 'rpr-bingo-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class BingoMainLayoutComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Input() hasSideMenu = false;

  constructor() {}
}
