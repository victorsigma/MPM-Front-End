import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { ProjectsPageComponent } from './componets/projects-page/projects-page.component';
import { ActivitiesPageComponent } from './componets/activities-page/activities-page.component';
import { WhiteComponent } from './componets/white/white.component';
import { AccountPageComponent } from './componets/account-page/account-page.component';
import { LoginSectionComponent } from './componets/login-section/login-section.component';
import { RegisterSectionComponent } from './componets/register-section/register-section.component';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
import { EditorActivityComponent } from './componets/editor-activity/editor-activity.component';
import { ErrorPageComponent } from './componets/error-page/error-page.component';
import { ActivitiesListComponent } from './componets/activities-list/activities-list.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'project/:idProject',
    component: ActivitiesPageComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: 'unassigned',
        component: ActivitiesListComponent
      },
      {
        path: 'inprogress',
        component: ActivitiesListComponent
      },
      {
        path: 'completed',
        component: ActivitiesListComponent
      },
      {
        path: 'pause',
        component: ActivitiesListComponent
      }
    ]
  },
  {
    path: 'project/:idProject/activity',
    component: LoginSectionComponent,
    canActivate: [LoginGuard],
  },
  {
    path: 'reload',
    component: WhiteComponent
  },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginSectionComponent,
    canActivate: [NoLoginGuard]
  },
  {
    path: 'register',
    component: RegisterSectionComponent,
    canActivate: [NoLoginGuard]
  },
  { path: '**', component: ErrorPageComponent },
  { path: 'error', component: ErrorPageComponent },
  {
    path: 'project/:idProject/error',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
