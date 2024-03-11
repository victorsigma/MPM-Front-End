import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectItemComponent } from './components/project-item/project-item.component';
import { ProjectsPageComponent } from './components/projects-page/projects-page.component';
import { RegisterSectionComponent } from './components/register-section/register-section.component';
import { LoginSectionComponent } from './components/login-section/login-section.component';
import { ActivitiesPageComponent } from './components/activities-page/activities-page.component';
import { ActivityItemComponent } from './components/activity-item/activity-item.component';
import { EditorActivityComponent } from './components/editor-activity/editor-activity.component';
import { AddActivityComponent } from './components/add-activity/add-activity.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AddProjectComponent } from './components/add-project/add-project.component';
import { WhiteComponent } from './components/white/white.component';
import { AccountPageComponent } from './components/account-page/account-page.component';
import { ProjectOptionsComponent } from './components/project-options/project-options.component';
import { ProjectMembersComponent } from './components/project-members/project-members.component';
import { MemberItemComponent } from './components/member-item/member-item.component';
import { MoreActivityComponent } from './components/more-activity/more-activity.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DeleteProjectComponent } from './components/delete-project/delete-project.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { ProjectDataService } from './services/project-data.service';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { ActivitiesListComponent } from './components/activities-list/activities-list.component';
import { ActivityDataService } from './services/activity-data.service';
import { AddMemberComponent } from './components/add-member/add-member.component';
import { SecurityAccountComponent } from './components/security-account/security-account.component';
import { InformationAccountComponent } from './components/information-account/information-account.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { PathButtonFullComponent } from './components/path-button-full/path-button-full.component';
import { PathButtonSmallComponent } from './components/path-button-small/path-button-small.component';
import { ProfileComponent } from './components/profile/profile.component';
import { environment } from 'src/environments/environment';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadScreenComponent } from './components/load-screen/load-screen.component';
import { RouterModule } from '@angular/router';
import { BreadcrumbcrumbComponent } from './components/breadcrumb/breadcrumb';
import { SitemapComponent } from './components/sitemap/sitemap.component';
import { PrivacynoticeComponent } from './components/privacynotice/privacynotice.component';
import { RecaptchaModule } from "ng-recaptcha";
import { CarucelComponent } from './components/carucel/carucel.component';


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
    ActivitiesListComponent,
    AddMemberComponent,
    SecurityAccountComponent,
    InformationAccountComponent,
    MembersListComponent,
    PathButtonFullComponent,
    PathButtonSmallComponent,
    ProfileComponent,
    AboutUsComponent,
    FooterComponent,
    LoadScreenComponent,
    BreadcrumbcrumbComponent,
    SitemapComponent,
    PrivacynoticeComponent,
    CarucelComponent
  ],
  imports: [
    BrowserModule,
    RecaptchaModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule, 
    FormsModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
      deps: [ProjectDataService, ActivityDataService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
