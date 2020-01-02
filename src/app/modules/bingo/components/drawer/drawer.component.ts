import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { chain, sortBy } from 'lodash';
import { Dealer } from '../../core/bingo.game';

@Component({
  selector: DrawerComponent.selector,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit {
  static readonly selector = 'rpr-drawer';

  @Input() dealer: Dealer;
  @Output() restartDealer: EventEmitter<any> = new EventEmitter();
  dealerExposedNumbers: any;

  constructor() { }

  ngOnInit() {

  }

  random() {
    this.dealer.randomFromPool();
    this.dealerExposedNumbers = chain(this.dealer.drawerState.exposedNumbers)
      .groupBy(value => (Math.floor(value / 10)))
      .mapValues(sortBy)
      .values()
      .value();
  }

  restart() {
    this.restartDealer.emit();
  }

}
