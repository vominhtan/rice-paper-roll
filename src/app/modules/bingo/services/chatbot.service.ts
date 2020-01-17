import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class ChatbotService {

  private readonly msgs: {[key: string]: string} = {
    volumeMuted: '🔇 => Âm thanh đã được tắt 😖',
    volumeUnmuted: '🔊 => Âm thanh đã mở 🎉',
  }

  constructor(private snackBar: MatSnackBar) {}

  speak(msg: string) {
    this.snackBar.open(this.msgs[msg] ? this.msgs[msg] : msg, '', {
      duration: 1000,
    });
  }
}
