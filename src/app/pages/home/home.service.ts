import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {MasterHomeModel} from "./home-model";

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  urlApi: string = environment.capstoneApi + '/dashboard';

  constructor(private http: HttpClient) {
  }

  getData(): Observable<MasterHomeModel> {
    return this.http.get<MasterHomeModel>(`${this.urlApi}`);
  }
}
