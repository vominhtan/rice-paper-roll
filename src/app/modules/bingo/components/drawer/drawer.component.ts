import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { chain } from 'lodash';
import { Dealer } from '../../core/bingo.game';
import { filter, switchMap, map, mapTo, startWith, takeUntil } from 'rxjs/operators';
import { Observable, combineLatest, Subject, interval, merge, empty, BehaviorSubject, ReplaySubject } from 'rxjs';

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
  private sortedSubject: Subject<any> = new Subject();
  private noSortedSubject: Subject<any> = new Subject();

  @Input() dealer$: Observable<Dealer>;
  @Input() excludedNumbers: number[] = [];
  @Input() theme = 'theme-red';
  @Output() restartDealer: EventEmitter<any> = new EventEmitter();
  dealerExposedNumbers: any;
  dealerExposedNumbers$: Observable<any>;
  currentExposed$: Observable<number>;
  autoStatus$: Observable<boolean>;
  sortedStatus$: Observable<boolean>;
  currentExposed: number;

  constructor() {}

  ngOnInit() {
    this.currentExposed$ = this.dealer$.pipe(
      filter(dealer => dealer !== null),
      switchMap(dealer => dealer.onExposedNumber),
    );

    this.currentExposed$.subscribe(value => {
      this.currentExposed = value;
    });

    const interval$ = interval(3000).pipe(mapTo(-1));
    const pause$ = this.pauseSubject.asObservable().pipe(mapTo(false));
    const resume$ = this.resumeSubject.asObservable().pipe(mapTo(true));
    const autoStatus$ = merge(pause$, resume$).pipe(startWith(false));
    this.autoStatus$ = autoStatus$;
    const sorted$ = this.sortedSubject.asObservable().pipe(mapTo(true));
    const noSorted$ = this.noSortedSubject.asObservable().pipe(mapTo(false));
    const sortedStatus$ = merge(sorted$, noSorted$).pipe(startWith(true));
    this.sortedStatus$ = sortedStatus$;

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

    const subject = new ReplaySubject<any>();
    combineLatest(this.currentExposed$, this.dealer$).subscribe(subject);
    this.dealerExposedNumbers$ = sortedStatus$.pipe(
      switchMap((sorted) => subject.asObservable().pipe(
          filter(([currentExposed, dealer]) => currentExposed !== null && dealer !== null),
          map(([currentExposed, dealer]) => {
            const diferrentNumber = chain(dealer.drawerState.exposedNumbers).difference(this.excludedNumbers);
            return (sorted ? diferrentNumber.sortBy() : diferrentNumber).chunk(10).value();
          }),
        )
      )
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

  sort() {
    this.sortedSubject.next();
  }

  noSort() {
    this.noSortedSubject.next();
  }

  restart() {
    this.restartDealer.emit();
  }
}
