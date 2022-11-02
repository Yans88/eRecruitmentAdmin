import {ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {ListDataLokerComponent} from './list-data-loker.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ManageDataLokerService} from "../manage-data-loker.service";
import {Router} from "@angular/router";

describe('ListDataLokerComponent', () => {
  let component: ListDataLokerComponent;
  let fixture: ComponentFixture<ListDataLokerComponent>;
  let router: Router;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ListDataLokerComponent],
      imports: [HttpClientTestingModule, ConfirmDialogModule, BrowserAnimationsModule],
      providers: [
        ManageDataLokerService
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListDataLokerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("Test title", () => {
    component.ngOnInit();
    if (component.href === 'posted') {
      expect(component.title).toEqual('Posted');
    } else if (component.href === 'reject') {
      expect(component.title).toEqual('Ditolak');
    } else if (component.href === 'closed') {
      expect(component.title).toEqual('Closed');
    } else {
      expect(component.title).toEqual('New');
    }

  });

  it("Test lazy load loadDataLazy", () => {
    let event = {
      first: 1,
      rows: 10,
      globalFilter: '',
      sortField: 'idPengajuan',
      sortOrder: 1
    }
    component.loadDataLazy(event);
    expect(component.first).toBe(event.first);
    expect(component.rows).toBe(event.rows);
    expect(component.globalFilter).toBe(event.globalFilter);
    expect(component.sortField).toBe(event.sortField);
    expect(component.sortOrder).toBe(event.sortOrder);
  });


  it('should call Router.navigateByUrl("data-pengajuan/detail/:id") with the ID of the row selected', inject([Router], (router: Router) => {
    let data = {idPengajuan: 1};
    let event = {
      first: 1,
      rows: 10,
      globalFilter: '',
      sortField: 'idPengajuan',
      sortOrder: 1,
      data: data
    }
    const spy = spyOn(router, 'navigateByUrl');
    component.onRowSelect(event);
    const url = spy.calls.first().args[0];
    expect(url).toBe('data-pengajuan/detail/1');
  }));


});
