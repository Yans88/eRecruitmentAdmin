import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {IDataSkillModel, MasterDataModel} from "./master-skill-model";

@Injectable({
  providedIn: 'root'
})
export class MasterSkillService {

  urlApi: string = environment.capstoneApi + '/master_skill';

  constructor(private http: HttpClient) {
  }

  getData(first?: number, rows?: number, sortField?: string, sortOrderTabel: number = 1, globalFilter?: string): Observable<MasterDataModel> {
    rows = rows ? rows : 10;
    first = first ? first / rows : 0;
    sortField = sortField ? sortField : 'skillId';
    let sortOrder = sortOrderTabel >= 0 ? 'asc' : 'desc';
    globalFilter = globalFilter ? globalFilter : '';
    return this.http.get<MasterDataModel>(`${this.urlApi}?page=${first}&size=${rows}&sort_column=${sortField}&sort_order=${sortOrder}&keyword=${globalFilter}`);
  }

  postData(body: IDataSkillModel): Observable<MasterDataModel> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.post<MasterDataModel>(
      `${this.urlApi}`,
      body,
      headerOption
    );
  }

  editData(body: IDataSkillModel): Observable<MasterDataModel> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.put<MasterDataModel>(
      `${this.urlApi}/${body.skillId}`,
      body,
      headerOption
    );
  }

  deleteData(id: number | string): Observable<any> {
    return this.http.delete(`${this.urlApi}/${id}`)
  }

  uploadFile(body: File) {
    let formData = new FormData();
    formData.append('file', body);
    return this.http.post(
      `${this.urlApi}/import_skill`,
      formData
    );
  }
}
