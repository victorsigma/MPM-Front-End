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

const browserLang = navigator.language;

const lang = browserLang.includes('es') ? esMX : enEN;

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,data:{titulo:lang.pather_home}
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,data:{titulo:lang.pather_projects},
    canActivate: [LoginGuard]
  },
  {
    path: 'project/:idProject',
    component: ActivitiesPageComponent,data:{titulo:lang.pather_all},
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: ActivitiesListComponent, data:{titulo:lang.pather_all}
      },
      {
        path: 'unassigned',
        component: ActivitiesListComponent, data:{titulo:lang.pather_unassigned},
      },
      {
        path: 'inprogress',
        component: ActivitiesListComponent, data:{titulo:lang.pather_in_progress},
      },
      {
        path: 'completed',
        component: ActivitiesListComponent,data:{titulo:lang.pather_completed}
      },
      {
        path: 'pause',
        component: ActivitiesListComponent, data:{titulo:lang.pather_pause}
      }
    ]
  },
  {
    path: 'project/:idProject/members',
    component: ProjectMembersComponent,data:{titulo:lang.pather_members},
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: MembersListComponent, data:{titulo:lang.pather_members},
      },
      {
        path: 'add',
        component: AddMemberComponent,data:{titulo:lang.pather_add}
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
    component: AccountPageComponent,data:{titulo:lang.pather_information},
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        component: InformationAccountComponent,data:{titulo:lang.pather_information}
      },
      {
        path: 'profile',
        component: ProfileComponent, data:{titulo:lang.pather_profile}
      },
      {
        path: 'security',
        component: SecurityAccountComponent, data:{titulo:lang.pather_security}
      }
    ]
  },
  {
    path: 'login',
    component: LoginSectionComponent,data:{titulo:lang.login},
    canActivate: [NoLoginGuard]
  },
  {
    path: 'register',
    component: RegisterSectionComponent,data:{titulo:lang.register},
    canActivate: [NoLoginGuard]
  },
  {
    path: 'project/:idProject/error',data:{titulo:lang.pather_error},
    component: ErrorPageComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent,data:{titulo:lang.pather_projects},
    canActivate: [LoginGuard],
  },
  {
    path:'about',
    component: AboutUsComponent,data:{titulo:lang.footer_about_us},
    canActivate: [LoginGuard]
  },
  {
    path:'sitemap',
    component: SitemapComponent,data:{titulo:lang.pather_sitemap},
    canActivate: [LoginGuard]
  },
  {
    path:'privacite',
    component: PrivacynoticeComponent,data:{titulo:lang.pather_privacite},
    canActivate: [LoginGuard]
  },
  { path: '**', component: ErrorPageComponent, canActivate: [ErrorGuard] },
  { path: 'error', component: ErrorPageComponent, data:{titulo:lang.pather_error} },
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
