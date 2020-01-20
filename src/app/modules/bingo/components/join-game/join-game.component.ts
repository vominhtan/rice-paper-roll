import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Room, User } from '../../models';
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

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private gameService: GameService,
    private fb: FormBuilder,
  ) {
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

  deleteAllMessage() {
    if (this.credentialForm.invalid) return;
    const { roomId } = this.credentialForm.value;
    this.gameService.deleteMessages(roomId).subscribe(value => {
      console.log(value);
    });
  }

  join() {
    if (this.credentialForm.invalid) return;
    const { roomId, username } = this.credentialForm.value;
    this.gameService.joinRoom(roomId, username).subscribe(({ room, user }: { room: Room; user: User }) => {
      this.router.navigate([room.id], {
        queryParams: {
          userID: user.id,
        },
        relativeTo: this.activatedRoute,
        queryParamsHandling: 'merge',
      });
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
