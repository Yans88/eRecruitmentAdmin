import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FormAddLokerComponent} from './form-add-loker.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManageDataLokerService} from "../manage-data-loker.service";
import {FormBuilder} from "@angular/forms";

describe('FormAddLokerComponent', () => {
  let component: FormAddLokerComponent;
  let fixture: ComponentFixture<FormAddLokerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormAddLokerComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [
        ManageDataLokerService, FormBuilder
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FormAddLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
