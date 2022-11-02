import {TestBed} from '@angular/core/testing';

import {HomeService} from './home.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "../../../environments/environment";
import {DataHomeModel, MasterHomeModel} from "./home-model";

describe('HomeService', () => {
  let service: HomeService;
  let httpTestingController: HttpTestingController;
  const urlApi = environment.capstoneApi + '/dashboard';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(HomeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getData should use GET to retrieve data Summary Dashboard', () => {
    service.getData().subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}`);
    expect(testRequest.request.method).toEqual('GET');
  });

  it('getData should return expected data Pengajuan', (done) => {
    let expectedData: DataHomeModel = {
      totalApplied: 3,
      totalJobPosting: 11,
      totalJobRequest: 33,
      totalNewJobRequest: 88
    };
    let resData: MasterHomeModel = {
      data: expectedData, message: "ok", status: "200"
    }
    service.getData().subscribe((data: MasterHomeModel) => {
      expect(data.data.totalApplied).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne(`${urlApi}`);
    testRequest.flush(resData);
  });

});
