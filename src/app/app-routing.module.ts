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
import { ProfileComponent } from './components/profile/profile.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { enEN, esMX } from "./libs/langs";
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { PrivacynoticeComponent } from './components/privacynotice/privacynotice.component';
import { title } from 'process';
import { PasswordRecoveryFormComponent } from './components/password-recovery-form/password-recovery-form.component';
import { PasswordRecoveryComponent } from './components/password-recovery/password-recovery.component';
import { VerifyAccountComponent } from './components/verify-account/verify-account.component';

const browserLang = navigator.language;

const lang = browserLang.includes('es') ? esMX : enEN;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent, data: { title: lang.pather_home }
  },
  {
    path: 'projects',
    component: ProjectsPageComponent, data: { title: lang.pather_projects },
    canActivate: [LoginGuard]
  },
  {
    path: 'project/:idProject',
    component: ActivitiesPageComponent, data: { title: lang.pather_all, parent: { title: lang.pather_projects, path: '/projects' } },
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: ActivitiesListComponent, data: { title: lang.pather_all, parent: { title: lang.pather_projects, path: '/projects' } }
      },
      {
        path: 'unassigned',
        component: ActivitiesListComponent, data: { title: lang.pather_unassigned, parent: { title: lang.pather_projects, path: '/projects' } },
      },
      {
        path: 'inprogress',
        component: ActivitiesListComponent, data: { title: lang.pather_in_progress, parent: { title: lang.pather_projects, path: '/projects' } },
      },
      {
        path: 'completed',
        component: ActivitiesListComponent, data: { title: lang.pather_completed, parent: { title: lang.pather_projects, path: '/projects' } }
      },
      {
        path: 'pause',
        component: ActivitiesListComponent, data: { title: lang.pather_pause, parent: { title: lang.pather_projects, path: '/projects' } }
      }
    ]
  },
  {
    path: 'project/:idProject/members',
    component: ProjectMembersComponent, data: { title: lang.pather_members, gfather: { title: lang.pather_projects, path: '/projects' }, parent: { title: lang.activities, path: '/..' } },
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: MembersListComponent, data: { title: lang.pather_members, gfather: { title: lang.pather_projects, path: '/projects' }, parent: { title: lang.activities, path: '/..' } },
      },
      {
        path: 'add',
        component: AddMemberComponent, data: { title: lang.pather_add, ggfather: { title: lang.pather_projects, path: 'projects' }, gfather: { title: lang.activities, path: '/projects' }, parent: { title: lang.pather_members, path: '' } }
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
    component: AccountPageComponent, data: { title: lang.pather_information },
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: InformationAccountComponent, data: { title: lang.pather_information }
      },
      {
        path: 'profile',
        component: ProfileComponent, data: { title: lang.pather_profile }
      },
      {
        path: 'security',
        component: SecurityAccountComponent, data: { title: lang.pather_security }
      }
    ]
  },
  {
    path: 'login',
    component: LoginSectionComponent, data: { title: lang.login },
    canActivate: [NoLoginGuard]
  },
  {
    path: 'register',
    component: RegisterSectionComponent, data: { title: lang.register },
    canActivate: [NoLoginGuard]
  },
  {
    path: 'project/:idProject/error', data: { title: lang.pather_error },
    component: ErrorPageComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent, data: { title: lang.pather_projects },
    canActivate: [LoginGuard],
  },
  {
    path: 'about',
    component: AboutUsComponent, data: { title: lang.footer_about_us }
  },
  {
    path: 'sitemap',
    component: SitemapComponent, data: { title: lang.pather_sitemap }
  },
  {
    path: 'privacy',
    component: PrivacynoticeComponent, data: { title: lang.pather_privacy }
  },
  {
    path: 'verify-account/:token',
    component: VerifyAccountComponent, data: { title: lang.verify_account }
  },
  {
    path: 'password-recovery',
    canActivate: [NoLoginGuard],
    children: [
      {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
      },
      {
        path: 'request',
        component: PasswordRecoveryFormComponent, data: { title: lang.password_recovery.request }
      },
      {
        path: 'reset/:token',
        component: PasswordRecoveryComponent, data: { title: lang.password_recovery.reset }
      }
    ]
  },
  { path: '**', component: ErrorPageComponent, data: { title: lang.pather_error }, canActivate: [ErrorGuard] },
  { path: 'error', component: ErrorPageComponent, data: { title: lang.pather_error } },
];

const myRoutes = Object.freeze(JSON.parse(JSON.stringify(routes)));

export const replacePaths = (url: string) => {
  const childRouteNames: string[] = [];

  // Iterar sobre las rutas y agregar nombres de rutas hijas al array
  for (const route of myRoutes) {
    if (route.children) {
      for (const childRoute of route.children) {
        childRouteNames.push(`${childRoute.path}`);
      }
    }
  }

  // Iterar sobre los nombres de las rutas hijas y reemplazar si se encuentran en el input
  for (const childRouteName of childRouteNames) {
    url = url.replace(childRouteName, '');
  }
  return url;
}

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
