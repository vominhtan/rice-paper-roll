import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { chain } from 'lodash';
import { Dealer } from '../../core/bingo.game';
import { filter, switchMap, map, mapTo, startWith, takeUntil } from 'rxjs/operators';
import { Observable, combineLatest, Subject, interval, merge, empty } from 'rxjs';

@Component({
  selector: DrawerComponent.selector,
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
})
export class DrawerComponent implements OnInit {
  static readonly selector = 'rpr-drawer';

  private randomSubject: Subject<any> = new Subject();
  private pauseSubject: Subject<any> = new Subject();
  private resumeSubject: Subject<any> = new Subject();

  @Input() dealer$: Observable<Dealer>;
  @Input() theme: string = 'theme-red';
  @Output() restartDealer: EventEmitter<any> = new EventEmitter();
  dealerExposedNumbers: any;
  dealerExposedNumbers$: Observable<any>;
  currentExposed$: Observable<number>;
  autoStatus$: Observable<boolean>;

  constructor() {}

  ngOnInit() {
    this.currentExposed$ = this.dealer$.pipe(
      filter(dealer => dealer !== null),
      switchMap(dealer => dealer.onExposedNumber),
    );

    const interval$ = interval(3000).pipe(mapTo(-1));
    const pause$ = this.pauseSubject.asObservable().pipe(mapTo(false));
    const resume$ = this.resumeSubject.asObservable().pipe(mapTo(true));
    const autoStatus$ = merge(pause$, resume$).pipe(startWith(false));
    this.autoStatus$ = autoStatus$;

    this.dealer$
      .pipe(
        switchMap(() =>
          autoStatus$.pipe(
            switchMap(val => (val ? interval$ : empty())),
            takeUntil(this.dealer$.pipe(switchMap(dealer => dealer.onEmpty))),
          ),
        ),
      )
      .subscribe(() => {
        this.randomSubject.next();
      });

    this.dealer$
      .pipe(
        switchMap(
          () => this.randomSubject.asObservable(),
          dealer => ({ dealer }),
        ),
      )
      .subscribe(({ dealer }) => {
        dealer.randomFromPool();
      });

    this.dealerExposedNumbers$ = combineLatest(this.currentExposed$, this.dealer$).pipe(
      filter(([currentExposed, dealer]) => currentExposed !== null && dealer !== null),
      map(([currentExposed, dealer]) =>
        chain(dealer.drawerState.exposedNumbers)
          .sortBy()
          .chunk(10)
          .value()
      ),
    );
  }

  pause() {
    this.pauseSubject.next();
  }

  resume() {
    this.resumeSubject.next();
  }

  random() {
    this.randomSubject.next();
  }

  restart() {
    this.restartDealer.emit();
  }
}
