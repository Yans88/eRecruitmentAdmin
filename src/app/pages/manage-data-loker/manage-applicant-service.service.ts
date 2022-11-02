import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {
  DetailDataApplicant,
  IDataDetailApplicant,
  IDataUpdateStatus,
  ManageDataApplicant
} from "./manage-data-applicant";

@Injectable({
  providedIn: 'root'
})
export class ManageApplicantServiceService {

  data !: IDataDetailApplicant;
  submissionId !: number;
  urlApi: string = environment.capstoneApi + '/hr-selection';

  constructor(private http: HttpClient) {
  }

  getData(jobPostingId: number, status: string, first?: number, rows?: number, sortField?: string, sortOrderTabel: number = 1, globalFilter?: string): Observable<ManageDataApplicant> {
    rows = rows ? rows : 10;
    first = first ? first / rows : 0;
    sortField = sortField ? sortField : 'appliedAt';
    let sortOrder = sortOrderTabel >= 0 ? 'asc' : 'desc';
    globalFilter = globalFilter ? globalFilter : '';
    return this.http.get<ManageDataApplicant>(`${this.urlApi}/${jobPostingId}?status=${status}&page=${first}&size=${rows}&sort_column=${sortField}&sort_order=${sortOrder}&keyword=${globalFilter}`);
  }

  getDataApplicantDetail(submissionId: number): Observable<DetailDataApplicant> {
    return this.http.get<DetailDataApplicant>(`${this.urlApi}/detail/${submissionId}`);
  }

  updateStatusDataApplicantDetail(submissionId: number, payload: IDataUpdateStatus): Observable<DetailDataApplicant> {
    const headerOption = {
      headers: new HttpHeaders({
        'Content-type': 'application/json; charset=UTF-8',
      }),
    };
    return this.http.put<DetailDataApplicant>(`${this.urlApi}/detail/${submissionId}`, payload, headerOption);
  }
}
