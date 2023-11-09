// auth.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationModule } from './registration/registration.module';
import { LoginModule } from './login/login.module';
import { AuthLayoutComponent } from './components/auth-layout/auth-layout.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [CommonModule, RouterModule, AuthRoutingModule, RegistrationModule, LoginModule],
  declarations: [AuthLayoutComponent],
})
export class AuthModule {}
