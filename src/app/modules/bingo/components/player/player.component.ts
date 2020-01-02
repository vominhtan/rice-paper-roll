import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: PlayerComponent.selector,
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayerComponent {
  static readonly selector = 'rpr-player';
}
