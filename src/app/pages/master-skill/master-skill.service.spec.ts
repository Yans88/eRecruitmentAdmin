import {TestBed} from '@angular/core/testing';

import {MasterSkillService} from './master-skill.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MasterDataModel} from "./master-skill-model";
import {environment} from "../../../environments/environment";

describe('MasterSkillService', () => {
  let service: MasterSkillService;
  let httpTestingController: HttpTestingController;
  const urlApi = environment.capstoneApi + '/master_skill';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MasterSkillService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('getData should return expected data Skill', (done) => {
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
    service.getData(0, 10, 'skillId', 1, '').subscribe((data: MasterDataModel) => {
      expect(data.totalData).toBeLessThanOrEqual(10);
      done();
    });
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '?page=0&size=10&sort_column=skillId&sort_order=asc&keyword=');
    testRequest.flush(expectedData);
  });

  it('getData should use GET to retrieve data Skill', () => {
    service.getData(0, 10, 'skillId', 1, '').subscribe();
    const testRequest = httpTestingController.expectOne(`${urlApi}` + '?page=0&size=10&sort_column=skillId&sort_order=asc&keyword=');
    expect(testRequest.request.method).toEqual('GET');
  });

  it("should throw error", () => {
    let error: string;
    service.getData(0, 10, 'skillId', 1, '').subscribe(null, e => {
      error = e;
    });

    let req = httpTestingController.expectOne(`${urlApi}` + '?page=0&size=10&sort_column=skillId&sort_order=asc&keyword=');
    req.flush("Data not found", {
      status: 404,
      statusText: "Network error"
    });
    expect(error!.toString().indexOf("Data not found") >= 0).toBeFalsy();
  });

});
