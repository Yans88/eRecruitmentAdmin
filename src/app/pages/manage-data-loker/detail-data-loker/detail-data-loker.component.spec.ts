import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DetailDataLokerComponent} from './detail-data-loker.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManageDataLokerService} from "../manage-data-loker.service";
import {ActivatedRoute, convertToParamMap} from "@angular/router";

describe('DetailDataLokerComponent', () => {
  let component: DetailDataLokerComponent;
  let fixture: ComponentFixture<DetailDataLokerComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailDataLokerComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }
          }
        },
        ManageDataLokerService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(DetailDataLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
