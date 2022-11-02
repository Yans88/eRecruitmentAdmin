import {TestBed} from '@angular/core/testing';

import {MySessionService} from './my-session.service';

describe('MySessionService', () => {
  let service: MySessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MySessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be isUserLogin when has jwt', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(service.isUserLogin).toBeTruthy();
    done();
  });

  it('should be isUserLogin when no jwt', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '');
    expect(service.isUserLogin()).toBeFalsy();
    done();
  })

  it('should be getToken when has jwt', (done: DoneFn) => {
    localStorage.setItem('jwt_token', '123131');
    expect(service.getToken()).toEqual('123131');
    done();
  });

  it('should be create session', (done: DoneFn) => {
    let user_info = {
      name: "Admin",
    }
    service.createSession(user_info);
    expect(service.getSession()).toEqual(user_info);
    done();
  });

  it('should be destroy session', (done: DoneFn) => {
    service.destroySession();
    expect(service.getSession()).toBeNull();
    done();
  });

  it('Get data from session', (done: DoneFn) => {
    let user_info = {
      name: "Admin"
    }
    service.createSession(user_info);
    service.getName().subscribe(value => {
      expect(value).toEqual(user_info.name);
      done();
    });
  });

  it('Get data from session', (done: DoneFn) => {
    let user_info = {
      role: "USER"
    }
    service.createSession(user_info);
    service.getRole().subscribe(value => {
      expect(value).toEqual(user_info.role);
      done();
    });
  });
});
