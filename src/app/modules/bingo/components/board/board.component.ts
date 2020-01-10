import { Component, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BingoGame } from '../../core/bingo.game';

@Component({
  selector: BoardComponent.selector,
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  static readonly selector = 'rpr-board';
  @Input() theme: string = 'theme-red';
  @Input() game: BingoGame;
  voices: { [key: string]: any } = {};

  constructor(private cdr: ChangeDetectorRef) {
    this.initVoice();
  }

  ngOnInit() {
    if (!this.game) {
      this.game = new BingoGame();
    }
    this.game.onChanged.subscribe(this.cdr.detectChanges.bind(this.cdr));
  }

  initVoice() {
    for (let i = 1; i <= 90; i++) {
      this.voices[i] = new Audio();
      this.voices[i].src = `../../../assets/voices/vn/google/${i < 10 ? '0' + i : i}.mp3`;
      this.voices[i].load();
    }
  }

  announce(number) {
    this.voices[number].play();
  }
}
