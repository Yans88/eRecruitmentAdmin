import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MasterSkillRoutingModule} from './master-skill-routing.module';
import {MasterSkillComponent} from './master-skill.component';
import {SkeletonModule} from "primeng/skeleton";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ToastModule} from "primeng/toast";
import {SpeedDialModule} from "primeng/speeddial";
import {FileUploadModule} from "primeng/fileupload";


@NgModule({
  declarations: [
    MasterSkillComponent
  ],
  imports: [
    CommonModule,
    MasterSkillRoutingModule,
    SkeletonModule,
    TableModule, InputTextModule, DialogModule, FormsModule, ConfirmDialogModule, ToastModule, SpeedDialModule, FileUploadModule
  ]
})
export class MasterSkillModule {
}
