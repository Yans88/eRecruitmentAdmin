import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {ILogin} from "./login.model";
import {environment} from "../../environments/environment";

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  const urlApi = environment.capstoneApi;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });


  it('create should make a POST HTTP request on login', () => {
    let postData: ILogin = {
      email: 'admin',
      password: 'SM-887'
    }
    service.login(postData).subscribe(res => {
      expect(res.accesToken).toEqual('12333');
    });

    const req = httpTestingController.expectOne(`${urlApi}/authentication/login/dashboard`, 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(postData);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    let payload = {data: postData, accesToken: "12333"};
    req.flush(payload);
    httpTestingController.verify();
  });

});
