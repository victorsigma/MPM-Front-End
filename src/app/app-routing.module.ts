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
    path: 'activities',
    component: ActivitiesPageComponent,
    canActivate: [LoginGuard]
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
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
