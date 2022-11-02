import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ManageDataLokerRoutingModule} from './manage-data-loker-routing.module';
import {ListDataLokerComponent} from './list-data-loker/list-data-loker.component';
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {TooltipModule} from "primeng/tooltip";
import {FormAddLokerComponent} from './form-add-loker/form-add-loker.component';
import {CardModule} from "primeng/card";
import {ButtonModule} from "primeng/button";
import {InputTextareaModule} from "primeng/inputtextarea";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {SkeletonModule} from "primeng/skeleton";
import {EditorModule} from "primeng/editor";
import {ToastModule} from "primeng/toast";
import {DetailDataLokerComponent} from './detail-data-loker/detail-data-loker.component';
import {ChipModule} from "primeng/chip";
import {StatusPengajuanPipe} from "../../pipes/status-pengajuan.pipe";
import {BadgeModule} from "primeng/badge";
import {TagSkillPipe} from "../../pipes/tag-skill.pipe";
import {ScrollPanelModule} from "primeng/scrollpanel";
import {TabViewModule} from "primeng/tabview";
import {DialogModule} from "primeng/dialog";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {CalendarModule} from "primeng/calendar";
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {DetailDataApplicantComponent} from './detail-data-applicant/detail-data-applicant.component';
import {ImageModule} from "primeng/image";
import {SplitButtonModule} from "primeng/splitbutton";


@NgModule({
  declarations: [
    ListDataLokerComponent,
    FormAddLokerComponent,
    DetailDataLokerComponent, StatusPengajuanPipe, TagSkillPipe, DetailDataApplicantComponent
  ],
  imports: [
    CommonModule,
    ManageDataLokerRoutingModule,
    TableModule, InputTextModule, TooltipModule, CardModule,
    ButtonModule, InputTextareaModule, FormsModule, InputNumberModule, DividerModule,
    CheckboxModule, ReactiveFormsModule, SkeletonModule, EditorModule, ToastModule, ChipModule, BadgeModule,
    ScrollPanelModule, TabViewModule, DialogModule, ConfirmDialogModule, CalendarModule, ConfirmPopupModule,
    ImageModule, SplitButtonModule,
  ]
})
export class ManageDataLokerModule {
}
