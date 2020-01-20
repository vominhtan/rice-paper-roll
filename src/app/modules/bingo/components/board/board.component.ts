import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BingoGame } from '../../core/bingo.game';
import { GameService } from '../../services/game.service';
import { tap, switchMap } from 'rxjs/operators';
import { flatten } from 'lodash';
import { SettingService } from '../../services/setting.service';
import { Subject, empty } from 'rxjs';
import { ChatbotService } from '../../services/chatbot.service';

const ballTexts = ['0️⃣', '1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣'];

@Component({
  selector: BoardComponent.selector,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  static readonly selector = 'rpr-board';
  @Input() theme = 'theme-red';
  @Input() game: BingoGame;
  @Input() roomID: string;
  @Input() userID: string;
  playSoundSrc: Subject<any> = new Subject();
  voices: { [key: string]: any } = {};

  constructor(
    private cdr: ChangeDetectorRef,
    private gameService: GameService,
    private settingService: SettingService,
    private chatbotService: ChatbotService,
  ) {
    this.initVoice();

    this.settingService.muted$
      .pipe(switchMap(val => (val ? empty() : this.playSoundSrc.asObservable())))
      .subscribe(this.playSound.bind(this));
  }

  isBingoCandiate(idx: number): boolean {
    if (this.game && this.game.bingoCandidateRowIdxs) {
      return this.game.bingoCandidateRowIdxs.includes(idx);
    } else {
      return false;
    }
  }

  ngOnInit() {
    if (!this.game) {
      this.game = new BingoGame();
    }

    this.game.onChanged
      .pipe(
        tap(() => {
          if (!this.roomID || !this.userID) {
            return;
          }
          this.gameService
            .updateGame(this.roomID, this.userID, ({
              kind: 'board',
              boardState: flatten(this.game.boardState),
              theme: this.theme,
            } as unknown) as BingoGame)
            .subscribe(value => {
              console.log(value);
            });
        }),
      )
      .subscribe(this.cdr.detectChanges.bind(this.cdr));
  }

  initVoice() {
    for (let i = 1; i <= 90; i++) {
      this.voices[i] = new Audio();
      this.voices[i].src = `../../../assets/voices/vn/google/${i < 10 ? '0' + i : i}.mp3`;
      this.voices[i].load();
    }
  }

  playSound(value: number) {
    this.voices[value].play();
  }

  announce(value: number) {
    this.chatbotService.speak(this.toText(value));
    this.playSoundSrc.next(value);
  }

  toText(value: number): string {
    const text = '' + value;
    console.log('1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣8️⃣9️⃣');
    return `🎲 => ${text
      .split('')
      .map(character => ballTexts[parseInt(character, 10)])
      .join('')}`;
  }
}
