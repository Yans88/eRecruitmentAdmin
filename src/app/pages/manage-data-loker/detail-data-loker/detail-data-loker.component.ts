import {Component, OnInit} from '@angular/core';
import {DetailDataLoker, IDataLokerModel} from "../manage-data-loker";
import {ManageDataLokerService} from "../manage-data-loker.service";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {MySessionService} from "../../../auth/my-session.service";
import {IDataApplicant, ManageDataApplicant} from "../manage-data-applicant";
import {ManageApplicantServiceService} from "../manage-applicant-service.service";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {DetailDataApplicantComponent} from "../detail-data-applicant/detail-data-applicant.component";

@Component({
  selector: 'app-detail-data-loker',
  templateUrl: './detail-data-loker.component.html',
  styleUrls: ['./detail-data-loker.component.scss'],
  providers: [MessageService, ConfirmationService, DialogService]
})
export class DetailDataLokerComponent implements OnInit {
  items!: IDataApplicant[];

  items_applied !: IDataApplicant[];
  items_shorted !: IDataApplicant[];
  items_assessment !: IDataApplicant[];
  items_interview !: IDataApplicant[];
  items_done !: IDataApplicant[];
  items_disqualified !: IDataApplicant[];

  first?: number = 0;
  rows?: number = 10;
  sortField?: string = "";
  sortOrder: number = 1;
  globalFilter: any;
  status: string = "";
  ref!: DynamicDialogRef;

  totalRecords!: number | 0;

  item!: IDataLokerModel;
  isLoading: boolean = false;
  private unsubcribe$ = new Subject();
  submitted: boolean = false;

  minDateValue: Date = new Date();
  conditionValidate: string = "";
  id: number = 0;
  roleName!: string;
  href!: string;


  constructor(private manageDataLokerService: ManageDataLokerService, private activatedRoute: ActivatedRoute,
              private messageService: MessageService, private confirmationService: ConfirmationService,
              private sessionService: MySessionService, private applicantService: ManageApplicantServiceService,
              private router: Router, private dialogService: DialogService) {
    this.sessionService.getRole().subscribe(value => this.roleName = value);
  }

  ngOnInit(): void {
    this.id = parseInt(<string>this.activatedRoute.snapshot.paramMap.get('id'));
    this.getDataDetail(this.id);
    this.minDateValue.setDate(this.minDateValue.getDate() + 7);

    this.href = this.router.url.split('/')[2];

  }

  getDataDetail(id: number) {
    this.isLoading = true;
    setTimeout(() => {
      this.manageDataLokerService.getDetailData(id).pipe(takeUntil(this.unsubcribe$)).subscribe((res: DetailDataLoker) => {
        this.item = res.data;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
  }

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Posting",
      rejectLabel: "Reject",
      acceptIcon: "pi pi-check",
      rejectIcon: "pi pi-times",
      acceptButtonStyleClass: "p-button-success p-button-sm",
      rejectButtonStyleClass: "p-button-danger p-button-sm",
      accept: () => {
        if (this.item.deadline) {
          this.manageDataLokerService.updateStatus(this.item.idPengajuan, 3, this.item.remarkHR, this.item.deadline).subscribe(response => {
            if (response.message === 'ok') {
              const pesan = 'telah diposting';
              this.messageService.add({
                key: 'updateStatusPengajuan',
                severity: 'success',
                summary: 'Successful',
                detail: 'Pengajuan #' + this.item.idPengajuan + ' ' + pesan,
                life: 3000
              });
              setTimeout(() => {
                this.getDataDetail(this.item.idPengajuan);
              }, 1000)
            } else {
              this.messageService.add({
                key: 'updateStatusPengajuan',
                severity: 'error',
                summary: 'Error',
                detail: response.message,
                life: 3000
              });
            }
          });
        } else {
          this.submitted = true;
          this.conditionValidate = "ng-invalid ng-dirty";
        }
      },
      reject: () => {
        this.manageDataLokerService.updateStatus(this.item.idPengajuan, 2, this.item.remarkHR).subscribe(response => {
          if (response.message === 'ok') {
            const pesan = 'ditolak';
            this.messageService.add({
              key: 'updateStatusPengajuan',
              severity: 'warn',
              summary: 'Successful',
              detail: 'Pengajuan #' + this.item.idPengajuan + ' ' + pesan,
              life: 3000
            });
            setTimeout(() => {
              this.getDataDetail(this.item.idPengajuan);
            }, 1000)
          } else {
            this.messageService.add({
              key: 'updateStatusPengajuan',
              severity: 'error',
              summary: 'Error',
              detail: response.message,
              life: 3000
            });
          }
        });
      }
    });
  }

  closeJob(event: Event) {
    this.confirmationService.confirm({
      target: event.target || new EventTarget(),
      message: 'Are you sure that you want to proceed?',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: "Close this post job",
      rejectLabel: "Cancel",
      acceptButtonStyleClass: "p-button-warning p-button-sm",
      rejectButtonStyleClass: "p-button-danger p-button-sm",
      accept: () => {
        this.manageDataLokerService.closeJob(this.item.idPengajuan).subscribe(response => {
          if (response.message === 'ok') {
            const pesan = 'telah ditutup';
            this.messageService.add({
              key: 'updateStatusPengajuan',
              severity: 'info',
              summary: 'Successful',
              detail: 'Pengajuan #' + this.item.idPengajuan + ' ' + pesan,
              life: 3000
            });
            setTimeout(() => {
              this.getDataDetail(this.item.idPengajuan);
            }, 1000)
          } else {
            this.messageService.add({
              key: 'updateStatusPengajuan',
              severity: 'error',
              summary: 'Error',
              detail: response.message,
              life: 3000
            });
          }
        });
      },
      reject: () => {

      }
    });
  }

  loadDataLazy(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    // if (this.href === 'posted') {
    //   this.status = 3;
    // } else if (this.href == 'reject') {
    //   this.status = 2;
    // } else if (this.href == 'closed') {
    //   this.status = 4;
    // } else {
    //   this.status = 1;
    // }
    this.getData()
    return event;
  }

  loadDataLazyApplied(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "APPLIED"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_applied = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  loadDataLazyshorted(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "SHORTLISTED"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_shorted = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  loadDataLazyAssessment(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "ASSESSMENT"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_assessment = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  loadDataLazyInterview(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "INTERVIEW"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_interview = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  loadDataLazyDone(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "DONE"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_done = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  loadDataLazyDisqualified(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.status = "DONE"
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items_disqualified = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
    return event;
  }

  onRowSelect(event: any) {
    // this.getDetailApplicant(id);
    this.applicantService.submissionId = event.data.submissionId;
    this.ref = this.dialogService.open(DetailDataApplicantComponent, {
      header: 'Seleksi pelamar',
      width: '70%',
      contentStyle: {"overflow": "auto"},
      baseZIndex: 10000,
      maximizable: true
    });
  }

  applied(status: string) {
    this.status = status
    console.log(status)
    this.getData()
  }

  getData() {
    this.isLoading = true;
    console.log(this.status)
    setTimeout(() => {
      this.applicantService.getData(this.id, this.status, this.first, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: ManageDataApplicant) => {
        console.log(res.data);
        this.items = res.data;
        this.totalRecords = res.totalData;
        this.isLoading = false;
      }, ((err: Error) => {
        console.log(err);
        this.isLoading = false;
      }))
    }, 1000);
  }
}
