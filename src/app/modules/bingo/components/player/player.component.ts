import { Component, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { BoardComponent } from '../board/board.component';
import { Router, ActivatedRoute } from '@angular/router';
import { SettingService } from '../../services/setting.service';
import { Observable } from 'rxjs';

@Component({
  selector: PlayerComponent.selector,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  static readonly selector = 'rpr-player';
  @ViewChild('board', {static: true}) board: BoardComponent;

  theme$: Observable<string>;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private settingService: SettingService) {

  }

  ngOnInit() {
    this.theme$ = this.settingService.colorTheme$;
  }

  onMessageRecieved(message) {
    const content = message.content as string;
    // Filter message
    const numberRegex = /(?<=\[)\d*(?=\])/g;
    const found = content.match(numberRegex);

    if (found &&  found.length) {
      this.announceNumber(parseInt(found[0]));
    }
  }

  announceNumber(number) {
    this.board.announce(number);
  }

  back() {
    this.router.navigate(['..'], {relativeTo: this.activatedRoute})
  }
}
