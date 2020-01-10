import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Props {
  colorTheme$: BehaviorSubject<string>
}

@Injectable()
export class SettingService {

  props: Props = {
    colorTheme$: new BehaviorSubject('theme-red'),
  }

  constructor() {
    this.props.colorTheme$.next(localStorage.getItem('bingoColorTheme') || 'theme-red');
  }

  get colorTheme$(): Observable<string> {
    return this.props.colorTheme$.asObservable();
  }

  set colorTheme(newColorTheme: string) {
    this.props.colorTheme$.next(newColorTheme);
    localStorage.setItem('bingoColorTheme', newColorTheme);
  }
}
