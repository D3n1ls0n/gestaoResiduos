// EventService.service.ts

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private loginSuccessSubject = new Subject<void>();

  loginSuccess$ = this.loginSuccessSubject.asObservable();

  emitLoginSuccess(): void {
    this.loginSuccessSubject.next();
  }
}
