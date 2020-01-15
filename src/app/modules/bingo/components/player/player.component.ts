import { Component, ChangeDetectionStrategy, ViewChild, OnInit } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { SettingService } from '../../services/setting.service';
import { Observable } from 'rxjs';
import { getFullTreeParams } from '../../utils/common.utils';
import { GameService } from '../../services/game.service';

@Component({
  selector: PlayerComponent.selector,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent implements OnInit {
  static readonly selector = 'rpr-player';
  @ViewChild('board', { static: true }) board: BoardComponent;

  theme$: Observable<string>;
  roomID: string;
  userID: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private settingService: SettingService,
    private gameService: GameService) {

  }

  ngOnInit() {
    this.theme$ = this.settingService.colorTheme$;
    this.roomID = getFullTreeParams(this.activatedRoute)['roomID'];
    this.activatedRoute.queryParams.subscribe((queryParams: Params) => {
      this.userID = queryParams.userID;
    });
    this.gameService.connectToRoomMessages(this.roomID).subscribe(this.onMessageRecieved.bind(this));
  }

  onMessageRecieved(message) {
    const content = message.content as string;
    // Filter message
    const numberRegex = /(?<=\[)\d*(?=\])/g;
    const found = content.match(numberRegex);

    if (found && found.length) {
      this.announceNumber(parseInt(found[0], 10));
    }
  }

  announceNumber(value: number) {
    this.board.announce(value);
  }

  back() {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute });
  }
}
