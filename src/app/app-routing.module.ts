import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { ActivitiesPageComponent } from './components/activities-page/activities-page.component';
import { WhiteComponent } from './components/white/white.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { RegisterSectionComponent } from './components/register-section/register-section.component';
import { LoginGuard } from './guards/login.guard';
import { NoLoginGuard } from './guards/no-login.guard';
import { EditorActivityComponent } from './components/editor-activity/editor-activity.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { ProjectMembersComponent } from './components/project-members/project-members.component';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { ErrorGuard } from './guards/error.guard';
import { SecurityAccountComponent } from './components/security-account/security-account.component';
import { ProjectGuard } from './guards/project.guard';
import { InformationAccountComponent } from './components/information-account/information-account.component';
import { MembersListComponent } from './components/members-list/members-list.component';

export const routes: Routes = [
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
        path: '',
        component: ActivitiesListComponent
      },
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
    path: 'project/:idProject/members',
    component: ProjectMembersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: MembersListComponent
      },
      {
        path: 'add',
        component: AddMemberComponent
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
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: InformationAccountComponent
      },
      {
        path: 'profile',
        component: InformationAccountComponent
      },
      {
        path: 'security',
        component: SecurityAccountComponent
      }
    ]
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
  { path: '**', component: ErrorPageComponent, canActivate: [ErrorGuard] },
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
