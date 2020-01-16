import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Props {
  colorTheme$: BehaviorSubject<string>
  darkTheme$: BehaviorSubject<boolean>,
  muted$: BehaviorSubject<boolean>,
}

@Injectable()
export class SettingService {

  props: Props = {
    colorTheme$: new BehaviorSubject('theme-red'),
    darkTheme$: new BehaviorSubject(true),
    muted$:new BehaviorSubject(false),
  }

  constructor() {
    this.props.colorTheme$.next(localStorage.getItem('bingoColorTheme') || 'theme-red');
    this.props.darkTheme$.next(localStorage.getItem('bingoDarkTheme') === 'true' || false);
    this.props.muted$.next(localStorage.getItem('muted') === 'true' || false);
  }

  get colorTheme$(): Observable<string> {
    return this.props.colorTheme$.asObservable();
  }

  get darkTheme$(): Observable<boolean> {
    return this.props.darkTheme$.asObservable();
  }

  get muted$(): Observable<boolean> {
    return this.props.muted$.asObservable();
  }

  set colorTheme(newColorTheme: string) {
    this.props.colorTheme$.next(newColorTheme);
    localStorage.setItem('bingoColorTheme', newColorTheme);
  }

  set darkTheme(value: boolean) {
    this.props.darkTheme$.next(value);
    localStorage.setItem('bingoDarkTheme', value ? 'true' : 'false');
  }

  set mute(value: boolean) {
    this.props.muted$.next(value);
    localStorage.setItem('muted', value ? 'true' : 'false');
  }
}
