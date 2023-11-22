import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NotFoundPageComponent } from './shared/components/not-found-page/not-found-page.component';
import { authenticatedGuard, roleGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./public/public.module').then(m => m.PublicModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'employee',
    loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule),
  },
  {
    path: 'recruiter',
    canActivate: [authenticatedGuard, roleGuard],
    data: { role: 'recruiter' },
    loadChildren: () => import('./recruiter/recruiter.module').then(m => m.RecruiterModule),
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule {}
