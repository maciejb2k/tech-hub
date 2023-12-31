import { APP_INITIALIZER, NgModule } from '@angular/core';
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

import { LayoutComponent } from './shared/components/layout/layout.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { BaseComponent } from './shared/components/base/base.component';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { FooterComponent } from './shared/components/footer/footer.component';

import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ProgressBarModule } from 'primeng/progressbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SkeletonModule } from 'primeng/skeleton';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './auth/services/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HeaderComponent,
    NotFoundPageComponent,
    BaseComponent,
    SpinnerComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    PublicModule,
    AuthModule,
    RecruiterModule,
    EmployeeModule,
    FormsModule,
    AppRoutingModule,
    ButtonModule,
    ProgressSpinnerModule,
    ProgressBarModule,
    SplitButtonModule,
    ReactiveFormsModule,
    SkeletonModule,
    ToastModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
