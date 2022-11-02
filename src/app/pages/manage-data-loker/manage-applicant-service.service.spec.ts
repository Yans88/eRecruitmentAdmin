import {TestBed} from '@angular/core/testing';

import {ManageApplicantServiceService} from './manage-applicant-service.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {DetailDataApplicant, IDataUpdateStatus, ManageDataApplicant} from "./manage-data-applicant";

describe('ManageApplicantServiceService', () => {
  let service: ManageApplicantServiceService;
  let httpTestingController: HttpTestingController;
  const urlApi = environment.capstoneApi + '/hr-selection';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ManageApplicantServiceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getData should return expected data applicant', (done) => {
    let expectedData: ManageDataApplicant = {
      status: "",
      currentPage: 0,
      data: [],
      message: "",
      next: false,
      pageSize: 0,
      previous: false,
      totalPages: 0,
      totalData: 10
    };
    service.getData(1, "SHORTLISTED", 0, 10, "appliedAt", 1).subscribe((data: ManageDataApplicant) => {
      expect(data.totalData).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '/1?status=SHORTLISTED&page=0&size=10&sort_column=appliedAt&sort_order=asc&keyword=');
    testRequest.flush(expectedData);
  });

  it('getData should use GET to retrieve data applicant', () => {
    service.getData(1, "SHORTLISTED", 0, 10, "appliedAt", 1).subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '/1?status=SHORTLISTED&page=0&size=10&sort_column=appliedAt&sort_order=asc&keyword=');
    expect(testRequest.request.method).toEqual('GET');
  });

  it('getData should use GET to retrieve data applicant detail', () => {
    service.getDataApplicantDetail(1).subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '/detail/1');
    expect(testRequest.request.method).toEqual('GET');
  });

  it('create should make a PUT HTTP request on update status applicant', () => {
    let payloadBody: IDataUpdateStatus = {
      description: "", status: "INTERVIEW"
    }
    let response: DetailDataApplicant = {
      message: "",
      status: "",
    }
    service.updateStatusDataApplicantDetail(1, payloadBody).subscribe(res => {
      expect(res.message).toEqual(response.message);
    });
    const req = httpTestingController.expectOne(`${urlApi}/detail/1`, 'post to api');
    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    response.message = 'ok';
    req.flush(response);
    httpTestingController.verify();
  });


});
