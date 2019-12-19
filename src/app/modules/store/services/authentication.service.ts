import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  isManager = false;
  redirectUrl: string;

  constructor(private router: Router) {}

  login(credential: any): Observable<boolean> {
    return of(true).pipe(
      delay(100),
      tap(val => {
        this.isManager = true;
        this.router.navigate([this.redirectUrl]);
      }),
    );
  }

  logout(): void {
    this.isManager = false;
  }
}
