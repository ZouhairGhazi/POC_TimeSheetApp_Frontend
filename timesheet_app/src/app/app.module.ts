import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './http.interceptor';
import { DatePipe } from '@angular/common';
import { AuthGuard } from './auth_controller/auth.guard';
import { AuthInterceptor } from './auth_controller/auth.interceptor';
import { UserService } from './services/user.service';

import { MatCommonModule } from '@angular/material/core';
import { DateAdapter, NativeDateAdapter, MatNativeDateModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NavbarComponent } from './navbar/navbar.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersListComponent } from './users-list/users-list.component';
import { NavbarUserComponent } from './navbar-user/navbar-user.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { HomePageManagerComponent } from './home-page-manager/home-page-manager.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';
import { UserTimesComponent } from './user-times/user-times.component';
import { PdfExporterComponent } from './pdf-exporter/pdf-exporter.component';
import { UserOwnTimesComponent } from './user-own-times/user-own-times.component';
import { AddUserComponent } from './add-user/add-user.component';
import { AddProjectComponent } from './add-project/add-project.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginFormComponent,
    NavbarComponent,
    HomePageComponent,
    UsersListComponent,
    NavbarUserComponent,
    LandingPageComponent,
    HomePageManagerComponent,
    ProjectsListComponent,
    UserTimesComponent,
    PdfExporterComponent,
    UserOwnTimesComponent,
    AddUserComponent,
    AddProjectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgxMaterialTimepickerModule.setLocale('fr-FR'),
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgbDatepickerModule,
    MatCardModule,
    MatGridListModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule
  ],
  providers: [
    {provide: DateAdapter, useClass: NativeDateAdapter},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    AuthGuard,
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthInterceptor,
      multi: true,
    },
    UserService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
