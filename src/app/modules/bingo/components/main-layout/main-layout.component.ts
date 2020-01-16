import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'rpr-bingo-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class BingoMainLayoutComponent {
  @Output() back: EventEmitter<any> = new EventEmitter();
  @Input() hasSideMenu = false;
  muted$: Observable<boolean>;

  constructor(private settingService: SettingService) {
    this.muted$ = this.settingService.muted$;
  }

  toggleMute(value) {
    this.settingService.mute = value;
  }
}
