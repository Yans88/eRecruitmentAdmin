import {Component, OnInit, ViewChild} from '@angular/core';
import {ManageDataLokerService} from "../manage-data-loker.service";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {IDataLokerModel, ManageDataLoker} from "../manage-data-loker";
import {Subject, takeUntil} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-data-loker',
  templateUrl: './list-data-loker.component.html',
  providers: [ConfirmationService, MessageService]
})
export class ListDataLokerComponent implements OnInit {

  @ViewChild("dt") dt!: any;
  productDialog!: boolean;
  items!: IDataLokerModel[];
  totalRecords!: number | 0;
  isLoading: boolean = false;
  private unsubcribe$ = new Subject();
  item!: IDataLokerModel;

  title: string = "";
  first?: number = 0;
  rows?: number = 10;
  sortField?: string = "";
  sortOrder: number = 1;
  globalFilter: any;
  status: number = 1;

  submitted!: boolean;
  href!: string;

  constructor(private manageDataLokerService: ManageDataLokerService, private messageService: MessageService, private confirmationService: ConfirmationService, private router: Router) {
  }

  ngOnInit(): void {
    this.href = this.router.url.split('/')[2];
    if (this.href === 'posted') {
      this.title = 'Posted';
    } else if (this.href === 'reject') {
      this.title = 'Ditolak';
    } else if (this.href === 'closed') {
      this.title = 'Closed';
    } else {
      this.title = 'New';
    }
    this.getData();
  }

  getData() {
    this.isLoading = true;
    setTimeout(() => {
      this.manageDataLokerService.getData(this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataLoker) => {
        this.items = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
  }

  searchData(event: any) {
    const res = (event.target as HTMLInputElement)?.value
    this.dt.filterGlobal(res, 'contains');
  }

  loadDataLazy(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    if (this.href === 'posted') {
      this.status = 3;
    } else if (this.href == 'reject') {
      this.status = 2;
    } else if (this.href == 'closed') {
      this.status = 4;
    } else {
      this.status = 1;
    }
    this.getData()
    return event;
  }

  onRowSelect(event: any) {
    if (event) {
      const id = event.data.idPengajuan;
      this.router.navigateByUrl(`data-pengajuan/detail/${id}`);
    }
  }

}
