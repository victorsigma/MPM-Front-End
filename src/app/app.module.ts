import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componets/header/header.component';
import { HomeComponent } from './componets/home/home.component';
import { ProjectsComponent } from './componets/projects/projects.component';
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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProjectsComponent,
    ProjectItemComponent,
    ProjectsPageComponent,
    RegisterSectionComponent,
    LoginSectionComponent,
    ActivitiesPageComponent,
    ActivityItemComponent,
    EditorActivityComponent,
    AddActivityComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
