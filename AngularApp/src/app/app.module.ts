import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/interceptors/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RecruiterModule } from './recruiter/recruiter.module';

import { PublicModule } from './public/public.module';

import { EmployeeModule } from './employee/employee.module';

import { ButtonModule } from 'primeng/button';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { SharedModule } from 'primeng/api';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, HeaderComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    SharedModule,
    PublicModule,
    AuthModule,
    RecruiterModule,
    EmployeeModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
