import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MySessionService {
  constructor() {
  }

  createSession(info: any) {
    localStorage.setItem('user_info', JSON.stringify(info));
  }

  getSession() {
    return JSON.parse(localStorage.getItem('user_info')!);
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  isUserLogin(): boolean {
    const jwt = localStorage.getItem('jwt_token');
    return jwt ? true : false;
  }

  getName(): Observable<string> {
    const name = this.getSession()?.name;
    return of(name);
  }

  getRole(): Observable<string> {
    const role = this.getSession()?.role;
    return of(role);
  }

  destroySession() {
    localStorage.clear();
  }
}
