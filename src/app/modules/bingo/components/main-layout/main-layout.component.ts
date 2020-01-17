import {
  Component,
  Output,
  EventEmitter,
  Input,
} from '@angular/core';
import { SettingService } from '../../services/setting.service';
import { ChatbotService } from '../../services/chatbot.service';
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

  constructor(
    private settingService: SettingService,
    private chatbotService: ChatbotService,
    ) {
    this.muted$ = this.settingService.muted$;
    this.muted$.subscribe((value) => {
      this.chatbotService.speak(value ? 'volumeMuted' : 'volumeUnmuted');
    });
  }

  toggleMute(value) {
    this.settingService.mute = value;

  }
}
