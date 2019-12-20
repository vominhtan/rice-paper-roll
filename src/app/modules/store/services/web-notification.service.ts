import { Injectable } from '@angular/core';
import { SwPush } from '@angular/service-worker';

@Injectable({
  providedIn: 'root',
})
export class WebNotificationService {
  readonly VAPID_PUBLIC_KEY = 'BF-jqXGZ4Ylkr8rdFieuqyF8n3uXhG8MEEdiYd5ApYs0jO499JEFSp8Id6wNX3HuZH4zaMpSbJFc1XUZAAbsKrk';
  private baseUrl = 'http://localhost:5000/notifications';
  constructor(private swPush: SwPush) {}

  subscribeToNotification() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY,
      })
      .then(sub => this.sendToServer(sub))
      .catch(err => console.error('Could not subscribe to notifications', err));
  }

  sendToServer(params: any) {
    console.log(params);
    // this.http.post(this.baseUrl, { notification: params }).subscribe();
    const t = {
      notification: {
        title: 'Cửa hàng đã mở, anh em vào order thôi',
        body: 'Đơn hàng tập thể số 4404 đã mở anh em vào order sớm nha',
        icon: 'https://www.shareicon.net/data/256x256/2015/10/02/110808_blog_512x512.png',
        vibrate: [100, 50, 100],
        data: { url: 'https://medium.com/@arjenbrandenburgh/angulars-pwa-swpush-and-swupdate-15a7e5c154ac' },
      },
    };
  }
}
