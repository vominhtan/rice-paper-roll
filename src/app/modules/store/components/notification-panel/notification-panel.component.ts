import { Component, OnInit } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { WebNotificationService } from '../../services/web-notification.service';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mergeMapTo, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'rpr-notification-panel',
  templateUrl: './notification-panel.component.html',
  styleUrls: ['./notification-panel.component.scss'],
})
export class NotificationPanelComponent {
  isEnabled = this.swPush.isEnabled;
  isGranted = Notification.permission === 'granted';
  constructor(
    private swPush: SwPush,
    private snackBar: MatSnackBar,
    private webNotificationService: WebNotificationService,
    private readonly afMessaging: AngularFireMessaging,
  ) {}
  submitNotification(): void {
    this.webNotificationService.subscribeToNotification();
  }

  requestPermission() {
    this.afMessaging.requestPermission.pipe(mergeMapTo(this.afMessaging.tokenChanges)).subscribe(
      () => {
        this.snackBar.open('Hurrey!!! Permission granted!', '', {
          duration: 2000,
        });
      },
      error => {
        this.snackBar.open('Error!!! Permission can not granted!', '', {
          duration: 2000,
        });
        console.error(error);
      },
    );
  }

  deleteToken() {
    this.afMessaging.getToken
      .pipe(mergeMap(token => this.afMessaging.deleteToken(token)))
      .subscribe(
        (token) => { console.log('Deleted!'); },
      );
  }

  listen() {
    this.afMessaging.messages
      .subscribe((message) => { console.log(message); });
  }
}
