import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Router} from '@angular/router';
import {MySessionService} from '../auth/my-session.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private sessionService: MySessionService
  ) {
  }

  canActivate() {
    return this.canLoad();
  }

  canLoad(): boolean {
    const result = this.isLogin();
    if (result == false) {
      this.router.navigateByUrl('/auth/login');
    }
    return result;
  }

  isLogin(): boolean {
    if (this.sessionService.isUserLogin()) {
      return true;
    } else {
      return false;
    }
  }
}
