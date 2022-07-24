import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componets/home/home.component';
import { ProjectsPageComponent } from './componets/projects-page/projects-page.component';
import { ActivitiesPageComponent } from './componets/activities-page/activities-page.component';
import { WhiteComponent } from './componets/white/white.component';
import { AccountPageComponent } from './componets/account-page/account-page.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'projects',
    component: ProjectsPageComponent
  },
  {
    path: 'activities',
    component: ActivitiesPageComponent
  },
  {
    path: 'reload',
    component: WhiteComponent
  },
  {
    path: 'account',
    component: AccountPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
