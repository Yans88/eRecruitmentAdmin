import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MasterSkillService} from "../../master-skill/master-skill.service";
import {IDataSkillModel, MasterDataModel} from "../../master-skill/master-skill-model";
import {Subject, takeUntil} from "rxjs";
import {MessageService} from "primeng/api";
import {ManageDataLokerService} from "../manage-data-loker.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-add-loker',
  templateUrl: './form-add-loker.component.html',
  styleUrls: ['./form-add-loker.component.scss'],
  providers: [MessageService]
})
export class FormAddLokerComponent implements OnInit {

  formData!: FormGroup;
  dataSKill!: IDataSkillModel[];
  private unsubcribe$ = new Subject();
  isLoading: boolean = false;
  listSkill: any = [];

  get ordersFormArray() {
    return this.formData.controls['listSkill'] as FormArray;
  }

  constructor(private formBuilder: FormBuilder, private manageDataLokerService: ManageDataLokerService,
              private masterSkillService: MasterSkillService, private messageService: MessageService,
              public route: Router) {
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      posisi: ['', Validators.required],
      description: ['', Validators.required],
      numberRequired: [1, Validators.required],
      remarkStaff: [''],
      listSkill: new FormArray([])
    });
    this.addCheckboxesToForm();
  }

  private addCheckboxesToForm() {
    this.isLoading = true;
    this.masterSkillService.getData(0, 1000, "skillName", 1).pipe(takeUntil(this.unsubcribe$)).subscribe((res: MasterDataModel) => {
      this.dataSKill = res.data;
    }, ((err: Error) => {
      this.dataSKill = [];
      this.isLoading = false;
    }));
    setTimeout(() => {
      this.dataSKill.forEach(() => this.ordersFormArray.push(new FormControl(false)));
      this.isLoading = false;
    }, 1500);
  }

  saveData() {
    this.formData.value['listSkill'] = this.listSkill;
    this.manageDataLokerService.postData(this.formData.value).subscribe(response => {
      if (response.message === 'ok') {
        this.messageService.add({
          key: 'addDataPengajuan',
          severity: 'success',
          summary: 'Successful',
          detail: 'Pengajuan telah dibuat',
          life: 3000
        });
        setTimeout(() => {
          this.route.navigateByUrl(`data-pengajuan`);
        }, 1300);
      }

    });
  }

  onChangeData(skill: any, isChecked: any) {
    if (isChecked.checked > 0) {
      this.listSkill.push(skill);
    } else {
      const index = this.listSkill.indexOf(skill);
      this.listSkill.splice(index, 1);
    }
  }
}
