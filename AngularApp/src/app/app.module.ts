import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent, HomepageComponent, HeaderComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    AuthModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
