import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {AppLayoutComponent} from './layout/app.layout.component';
import {NotfoundComponent} from './pages/notfound/notfound.component';
import {AuthGuard} from "./core/auth.guard";

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: '',
          redirectTo: 'home',
          pathMatch: 'full'
        },
        {
          path: '',
          canActivate: [AuthGuard],
          component: AppLayoutComponent,
          children: [
            {
              path: 'pages',
              //canLoad: [AuthGuard],
              loadChildren: () =>
                import('./pages/pages.module').then((m) => m.PagesModule),
            }, {
              path: 'home',
              loadChildren: () =>
                import('./pages/pages.module').then((m) => m.PagesModule),
            },
            {
              path: 'master-skill',
              loadChildren: () =>
                import('./pages/master-skill/master-skill.module').then((m) => m.MasterSkillModule),
            },
            {
              path: 'data-pengajuan',
              loadChildren: () =>
                import('./pages/manage-data-loker/manage-data-loker.module').then((m) => m.ManageDataLokerModule),
            }
          ],
        },

        {
          path: 'auth',
          loadChildren: () =>
            import('./auth/auth.module').then((m) => m.AuthModule),
        },
        {path: 'pages/notfound', component: NotfoundComponent},
        {path: '**', redirectTo: 'pages/notfound'},
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
