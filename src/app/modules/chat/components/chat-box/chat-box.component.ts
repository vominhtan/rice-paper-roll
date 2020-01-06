import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

enum KeyCodes {
  ESCAPE_KEYCODE = 27,
  ENTER_KEYCODE = 13,
}

@Component({
  selector: ChatBoxComponent.selector,
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit {
  static readonly selector = 'rpr-chat-box';

  @Output() sendMessage: EventEmitter<string> = new EventEmitter();

  newMessageFC: FormControl;

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {
    this.newMessageFC = fb.control('', [Validators.required]);
  }

  ngOnInit() {}

  send() {
    if (this.newMessageFC.valid) {
      this.sendMessage.emit(this.newMessageFC.value);
      this.clear();
    }
  }

  clear() {
    this.newMessageFC.reset('');
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    switch (event.keyCode as KeyCodes) {
      case KeyCodes.ENTER_KEYCODE:
        this.send();
        break;
        case KeyCodes.ESCAPE_KEYCODE:
        this.clear();
        break;
      default:
        break;
    }
  }
}
