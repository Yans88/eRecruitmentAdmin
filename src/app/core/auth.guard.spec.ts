import {TestBed} from '@angular/core/testing';

import {AuthGuard} from './auth.guard';
import {RouterTestingModule} from "@angular/router/testing";
import {LoginComponent} from "../auth/login/login.component";

describe('AuthGuard', () => {
  let guard: AuthGuard;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(
          [{path: 'auth/login', component: LoginComponent}]
        )
      ],
    });
    guard = TestBed.inject(AuthGuard);

  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should be created', () => {
    expect(guard.isLogin).toBeTruthy();
  });

  it('should be isLogin true', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(guard.isLogin()).toEqual(true);
    done();
  });

  it('should be isLogin false', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '');
    expect(guard.isLogin()).toEqual(false);
    done();
  });

  it('should be canLoad true', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(guard.canLoad()).toEqual(true);
    done();
  });

  it('should be canLoad false', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '');
    expect(guard.canLoad()).toEqual(false);
    done();
  });

  it('should be canActivate true', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(guard.canActivate()).toEqual(true);
    done();
  });

  it('should be canActivate false', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '');
    expect(guard.canActivate()).toEqual(false);
    done();
  });

});
