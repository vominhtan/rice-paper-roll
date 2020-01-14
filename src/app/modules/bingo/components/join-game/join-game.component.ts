import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Room } from '../../models';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

enum KeyCodes {
  ESCAPE_KEYCODE = 27,
  ENTER_KEYCODE = 13,
}

@Component({
  selector: 'rpr-join-game',
  templateUrl: './join-game.component.html',
  styleUrls: ['./join-game.component.scss'],
})
export class JoinGameComponent implements OnInit {

  showJoinRoomForm = false;
  credentialForm: FormGroup;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private gameService: GameService, private fb: FormBuilder) {
    this.credentialForm = fb.group({
      roomId: ['', Validators.required],
      username: ['', Validators.required],
    });
  }

  ngOnInit() {}

  private goto(path: string) {
    this.router.navigate([path], { relativeTo: this.activatedRoute });
  }

  createNewRoom() {
    this.gameService.createNewRoom().subscribe((room: Room) => {
      this.goto(room.id);
    });
  }

  displayJoinRoomForm() {
    this.showJoinRoomForm = true;
  }

  hideJoinRoomForm() {
    this.showJoinRoomForm = false;
  }

  join() {
    this.gameService.joinRoom().subscribe((room: Room) => {
      this.router.navigate([room.id, 'player'], { relativeTo: this.activatedRoute });
    });
  }

  clear() {
    this.credentialForm.reset('');
  }

  @HostListener('keydown', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    switch (event.keyCode as KeyCodes) {
      case KeyCodes.ENTER_KEYCODE:
        this.join();
        break;
      case KeyCodes.ESCAPE_KEYCODE:
        this.clear();
        break;
      default:
        break;
    }
  }
}
