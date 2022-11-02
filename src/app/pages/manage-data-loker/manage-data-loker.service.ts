import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AddDataLokerModel, DetailDataLoker, ManageDataLoker} from "./manage-data-loker";

@Injectable({
  providedIn: 'root'
})
export class ManageDataLokerService {

  urlApi: string = environment.capstoneApi + '/request_sdm';

  constructor(private http: HttpClient) {
  }

  getData(status: number, first?: number, rows?: number, sortField?: string, sortOrderTabel: number = 1, globalFilter?: string): Observable<ManageDataLoker> {
    rows = rows ? rows : 10;
    first = first ? first / rows : 0;
    sortField = sortField ? sortField : 'idPengajuan';
    let sortOrder = sortOrderTabel >= 0 ? 'asc' : 'desc';
    globalFilter = globalFilter ? globalFilter : '';
    return this.http.get<ManageDataLoker>(`${this.urlApi}?status=${status}&page=${first}&size=${rows}&sort_column=${sortField}&sort_order=${sortOrder}&keyword=${globalFilter}`);
  }

  postData(body: AddDataLokerModel): Observable<ManageDataLoker> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.post<ManageDataLoker>(
      `${this.urlApi}`,
      body,
      headerOption
    );
  }

  getDetailData(id: number): Observable<DetailDataLoker> {
    return this.http.get<DetailDataLoker>(`${this.urlApi}/${id}/detail`);
  }

  updateStatus(id?: number, status?: number, remarkHR?: string, deadline?: Date): Observable<ManageDataLoker> {
    const body = {
      id_transaksi: id,
      status: status,
      remarkHR: remarkHR,
      deadline: deadline,
    }
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.put<ManageDataLoker>(
      `${this.urlApi}/${id}/update_status`,
      body,
      headerOption
    );
  }

  closeJob(id?: number): Observable<ManageDataLoker> {
    const body = {}
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.put<ManageDataLoker>(
      `${this.urlApi}/${id}/close_job`,
      body,
      headerOption
    );
  }

}
