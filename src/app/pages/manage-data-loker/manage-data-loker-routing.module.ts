import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListDataLokerComponent} from "./list-data-loker/list-data-loker.component";
import {FormAddLokerComponent} from "./form-add-loker/form-add-loker.component";
import {DetailDataLokerComponent} from "./detail-data-loker/detail-data-loker.component";

const routes: Routes = [
  {path: '', component: ListDataLokerComponent},
  {path: 'posted', component: ListDataLokerComponent},
  {path: 'reject', component: ListDataLokerComponent},
  {path: 'closed', component: ListDataLokerComponent},
  {path: 'add', component: FormAddLokerComponent},
  {path: 'detail/:id', component: DetailDataLokerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageDataLokerRoutingModule {
}
