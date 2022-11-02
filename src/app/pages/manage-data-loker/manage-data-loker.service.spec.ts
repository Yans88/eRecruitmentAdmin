import {TestBed} from '@angular/core/testing';

import {ManageDataLokerService} from './manage-data-loker.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {MasterDataModel} from "../master-skill/master-skill-model";
import {AddDataLokerModel, DetailDataLoker, IDataLokerModel, ManageDataLoker} from "./manage-data-loker";

describe('ManageDataLokerService', () => {
  let service: ManageDataLokerService;
  let httpTestingController: HttpTestingController;
  const urlApi = environment.capstoneApi + '/request_sdm';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ManageDataLokerService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getData should return expected data Pengajuan', (done) => {
    let expectedData: MasterDataModel = {
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
    service.getData(1, 0, 10, "idPengajuan", 1).subscribe((data: ManageDataLoker) => {
      expect(data.totalData).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '?status=1&page=0&size=10&sort_column=idPengajuan&sort_order=asc&keyword=');
    testRequest.flush(expectedData);
  });

  it('getData should use GET to retrieve data Pengajuan', () => {
    service.getData(1, 0, 10, "idPengajuan", 1).subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '?status=1&page=0&size=10&sort_column=idPengajuan&sort_order=asc&keyword=');
    expect(testRequest.request.method).toEqual('GET');
  });

  it("should throw error", () => {
    let error: string;
    service.getData(1, 0, 10, "idPengajuan", 1).subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne(`${urlApi}` + '?status=1&page=0&size=10&sort_column=idPengajuan&sort_order=asc&keyword=');
    req.flush("Data not found", {
      status: 404,
      statusText: "Network error"
    });
    expect(error!.toString().indexOf("Data not found") >= 0).toBeFalsy();
  });

  it('create should make a POST HTTP request with resource as body', () => {
    let response: ManageDataLoker = {
      currentPage: 0, data: [], next: false, pageSize: 0, previous: false, totalData: 0, totalPages: 0, status: ''
    }
    let postData: AddDataLokerModel = {
      posisi: "Programmer",
      description: "tesdt",
      remarkStaff: "Urgent",
      numberRequired: 13,
      listSkill: [1, 3, 4]
    }
    service.postData(postData).subscribe(res => {
      expect(res.message).toEqual(response.message);
    });
    const req = httpTestingController.expectOne(`${urlApi}`, 'post to api');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(postData);
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    response.message = 'ok';
    req.flush(response);
    httpTestingController.verify();
  });

  it('create should make a PUT HTTP request on update status', () => {
    let response: ManageDataLoker = {
      currentPage: 0, data: [], next: false, pageSize: 0, previous: false, totalData: 0, totalPages: 0, status: ''
    }
    service.updateStatus(1, 2).subscribe(res => {
      expect(res.message).toEqual(response.message);
    });
    const req = httpTestingController.expectOne(`${urlApi}/1/update_status`, 'post to api');
    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    response.message = 'ok';
    req.flush(response);
    httpTestingController.verify();
  });

  it('create should make a PUT HTTP request on update status given invalid data status 3 & empty dealine', () => {
    let response: ManageDataLoker = {
      currentPage: 0, data: [], next: false, pageSize: 0, previous: false, totalData: 0, totalPages: 0, status: ''
    }
    service.updateStatus(1, 3).subscribe(res => {
      expect(res.status).toEqual(response.status);
    });
    const req = httpTestingController.expectOne(`${urlApi}/1/update_status`, 'post to api');
    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    response.status = '400';
    req.flush(response);
    httpTestingController.verify();
  });

  it('create should make a PUT HTTP request on close job', () => {
    let response: ManageDataLoker = {
      currentPage: 0, data: [], next: false, pageSize: 0, previous: false, totalData: 0, totalPages: 0, status: ''
    }
    service.closeJob(1).subscribe(res => {
      expect(res.message).toEqual(response.message);
    });
    const req = httpTestingController.expectOne(`${urlApi}/1/close_job`, 'post to api');
    expect(req.request.method).toBe('PUT');
    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');
    response.message = 'ok';
    req.flush(response);
    httpTestingController.verify();
  });

  it('getData should return expected data detail Pengajuan', (done) => {
    let data: IDataLokerModel = {
      idPengajuan: 1,
      posisi: "posisi",
      description: "",
      remarkStaff: "",
      remarkHR: "",
      numberRequired: 10,
      status: 3,
      numberApplicant: 0,
      deadline: "",
      createdAt: new Date(),
      userId: 1,
      requestName: "admin",
      listSkill: [7]
    };

    let expectedData: DetailDataLoker = {
      status: "",
      message: "",
      data: data,
    };
    service.getDetailData(1).subscribe((data: DetailDataLoker) => {
      expect(data.status).toBeLessThanOrEqual(200);
      done();
    });
    const testRequest = httpTestingController.expectOne(`${urlApi}/1/detail`);
    testRequest.flush(expectedData);
  });

  it('getData should use GET to retrieve data Pengajuan detail', () => {
    service.getDetailData(1).subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}/1/detail`);
    expect(testRequest.request.method).toEqual('GET');
  });

});
