import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ILogin} from './login.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.capstoneApi;

  constructor(private httpClient: HttpClient) {
  }

  login(body: ILogin): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/authentication/login/dashboard`, body);
  }

}
