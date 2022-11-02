import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MasterSkillComponent} from "./master-skill.component";

const routes: Routes = [{path: '', component: MasterSkillComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterSkillRoutingModule {
}
