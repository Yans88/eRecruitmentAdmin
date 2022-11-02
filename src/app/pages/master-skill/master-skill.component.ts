import {Component, OnInit, ViewChild} from '@angular/core';
import {ConfirmationService, LazyLoadEvent, MessageService} from "primeng/api";
import {IDataSkillModel, MasterDataModel} from "./master-skill-model";
import {MasterSkillService} from "./master-skill.service";
import {Subject, takeUntil} from "rxjs";
import {MySessionService} from "../../auth/my-session.service";

@Component({
  selector: 'app-master-skill',
  templateUrl: './master-skill.component.html',
  providers: [MessageService, ConfirmationService]
})
export class MasterSkillComponent implements OnInit {


  @ViewChild("dt") dt!: any;

  items!: IDataSkillModel[];
  item!: IDataSkillModel;

  private unsubcribe$ = new Subject();
  first?: number = 0;
  rows?: number = 10;
  sortField?: string = "";
  sortOrder: number = 1;
  globalFilter: any;

  totalRecords!: number | 0;
  isLoading: boolean = false;
  selectedData?: IDataSkillModel;

  formDialog: boolean = false;
  submitted: boolean = false;
  isBtnLoading: boolean = false;

  roleName!: string;
  titleButtonUpload: string = "Import Data";
  titleButtonUploadDisable: boolean = false;

  constructor(private masterSkillService: MasterSkillService, private messageService: MessageService,
              private confirmationService: ConfirmationService, private sessionService: MySessionService) {
    this.sessionService.getRole().subscribe(value => this.roleName = value);
  }

  ngOnInit() {
    this.getData();
  }


  getData() {
    this.isLoading = true;
    setTimeout(() => {
      this.masterSkillService.getData(this.first!, this.rows, this.sortField, this.sortOrder, this.globalFilter).pipe(takeUntil(this.unsubcribe$)).subscribe((res: MasterDataModel) => {
          this.items = res.data;
          this.totalRecords = res.totalData;
          this.isLoading = false;
        }, ((err: Error) => {
          this.items = [];
          this.totalRecords = 0;
          console.log(err);
          this.isLoading = false;
        })
      );
    }, 1000);
  }

  loadDataLazy(event: LazyLoadEvent): LazyLoadEvent {
    this.first = event.first;
    this.rows = event.rows;
    this.globalFilter = event.globalFilter;
    this.sortField = event.sortField;
    this.sortOrder = <number>event.sortOrder;
    this.getData();
    return event;
  }

  searchData(event: any) {
    const res = (event.target as HTMLInputElement)?.value
    this.dt.filterGlobal(res, 'contains');
  }

  openNew() {
    this.item = {};
    this.submitted = false;
    this.formDialog = true;
    this.isBtnLoading = false;
    this.isLoading = false;
  }

  editData(item: IDataSkillModel) {
    this.item = {...item};
    this.formDialog = true;
  }

  deleteData(item: IDataSkillModel) {
    let skillId: number | string = item.skillId ? item.skillId : '';
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + item.skillName + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      rejectButtonStyleClass: 'p-button-warning p-button-sm',
      acceptLabel: 'Delete',
      rejectLabel: 'Cancel',
      accept: () => {
        this.masterSkillService.deleteData(skillId).subscribe(response => {
          this.getData();
        });
      }
    });
  }

  saveData() {
    this.submitted = true;
    if (this.item.skillName?.trim()) {
      this.isLoading = true;
      this.isBtnLoading = true;
      if (this.item.skillId) {
        this.masterSkillService.editData(this.item).subscribe(response => {
          this.getData();
          if (response.message === 'ok') {
            this.messageService.add({
              key: 'notifDataCRUD',
              severity: 'success',
              summary: 'Successful',
              detail: 'Data Skill Updated',
              life: 3000
            });
          }
        });
      } else {
        this.masterSkillService.postData(this.item).subscribe(response => {
          if (response.message === 'ok') {
            this.getData();
            this.messageService.add({
              key: 'notifDataCRUD',
              severity: 'success',
              summary: 'Successful',
              detail: 'New Skill Created',
              life: 3000
            });
          }
        });
      }
      this.item = {};
      this.isLoading = false;
      this.formDialog = false;
      this.isBtnLoading = false;
    }
    this.submitted = false;
  }

  hideDialog() {
    this.item = {};
    this.isBtnLoading = false;
    this.isLoading = false;
    this.formDialog = false;
    this.submitted = false;
  }

  uploadData(event: any) {
    this.titleButtonUpload = "Uploading . . ."
    this.titleButtonUploadDisable = true;
    this.masterSkillService.uploadFile(event[0]).subscribe(res => {
      this.getData();
      this.messageService.add({
        key: 'notifDataCRUD',
        severity: 'success',
        summary: 'Successful',
        detail: 'Data sudah diimport',
        life: 3000
      });
      this.titleButtonUpload = "Import Data"
      this.titleButtonUploadDisable = false;
    });
    //console.log(event.currentFiles);
  }

}
