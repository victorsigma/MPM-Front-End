import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { HomeComponent } from './componets/home/home.component';
import { ProjectItemComponent } from './componets/project-item/project-item.component';
import { ProjectsPageComponent } from './componets/projects-page/projects-page.component';
import { RegisterSectionComponent } from './componets/register-section/register-section.component';
import { LoginSectionComponent } from './componets/login-section/login-section.component';
import { ActivitiesPageComponent } from './componets/activities-page/activities-page.component';
import { ActivityItemComponent } from './componets/activity-item/activity-item.component';
import { EditorActivityComponent } from './componets/editor-activity/editor-activity.component';
import { AddActivityComponent } from './componets/add-activity/add-activity.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddProjectComponent } from './componets/add-project/add-project.component';
import { WhiteComponent } from './componets/white/white.component';
import { AccountPageComponent } from './componets/account-page/account-page.component';
import { ProjectOptionsComponent } from './componets/project-options/project-options.component';
import { ProjectMembersComponent } from './componets/project-members/project-members.component';
import { MemberItemComponent } from './componets/member-item/member-item.component';
import { MoreActivityComponent } from './componets/more-activity/more-activity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DeleteProjectComponent } from './componets/delete-project/delete-project.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProjectDataService } from './services/project-data.service';
import { ErrorPageComponent } from './componets/error-page/error-page.component';
import { ActivitiesListComponent } from './componets/activities-list/activities-list.component';
import { ActivityDataService } from './services/activity-data.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectItemComponent,
    ProjectsPageComponent,
    RegisterSectionComponent,
    LoginSectionComponent,
    ActivitiesPageComponent,
    ActivityItemComponent,
    EditorActivityComponent,
    AddActivityComponent,
    AddProjectComponent,
    WhiteComponent,
    AccountPageComponent,
    ProjectOptionsComponent,
    ProjectMembersComponent,
    MemberItemComponent,
    MoreActivityComponent,
    DeleteProjectComponent,
    ErrorPageComponent,
    ActivitiesListComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [ProjectDataService]
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [ActivityDataService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
