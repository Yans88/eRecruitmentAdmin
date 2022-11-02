import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MasterSkillComponent} from './master-skill.component';
import {MasterSkillService} from "./master-skill.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {IDataSkillModel} from "./master-skill-model";

describe('MasterSkillComponent', () => {
  let component: MasterSkillComponent;
  let fixture: ComponentFixture<MasterSkillComponent>;

  const mockData = {
    skillId: 2,
    skillName: "PHP"
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MasterSkillComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [
        MasterSkillService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(MasterSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.item = mockData;
    expect(component).toBeTruthy();
  });

  it("formDialog should be true", () => {
    component.formDialog = false;
    component.openNew();
    expect(component.formDialog).toEqual(true);
    expect(component.item).toEqual({});
    expect(component.isLoading).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
    expect(component.submitted).toEqual(false);
  });

  it("formDialog should be false when close form dialog", () => {
    component.formDialog = true;
    component.hideDialog();
    expect(component.formDialog).toEqual(false);
    expect(component.item).toEqual({});
    expect(component.isLoading).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
    expect(component.submitted).toEqual(false);
  });

  it("formDialog should be true when submit given skill name empty", () => {
    let saveDataInvalid: IDataSkillModel = {
      skillId: 2,
      skillName: ''
    };
    component.item = saveDataInvalid;
    component.formDialog = true;
    component.submitted = true;
    component.saveData();
    expect(component.formDialog).toEqual(true);
    expect(component.submitted).toEqual(false);
  });

  it("formDialog should be true when edit data", () => {
    component.formDialog = false;
    component.editData(mockData);
    expect(component.formDialog).toEqual(true);
    expect(component.item).toEqual(mockData);
  });

  it("formDialog should be false when submit given valid data", () => {
    component.item = mockData;
    component.formDialog = true;
    component.submitted = true;
    component.isLoading = true;
    component.isBtnLoading = true;
    component.saveData();
    expect(component.formDialog).toEqual(false);
    expect(component.submitted).toEqual(false);
    expect(component.isLoading).toEqual(false);
    expect(component.isBtnLoading).toEqual(false);
    expect(component.item).toEqual({});
  });

  it("get data", () => {
    component.getData();
    expect(component.isLoading).toEqual(true);
  });

  it("Test lazy load loadDataLazy", () => {
    let event = {
      first: 1,
      rows: 10,
      globalFilter: '',
      sortField: 'skillName',
      sortOrder: 1
    }
    component.loadDataLazy(event);
    expect(component.first).toBe(event.first);
    expect(component.rows).toBe(event.rows);
    expect(component.globalFilter).toBe(event.globalFilter);
    expect(component.sortField).toBe(event.sortField);
    expect(component.sortOrder).toBe(event.sortOrder);
  });

});
