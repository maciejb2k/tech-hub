import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrowseEmployeesComponent } from './components/browse-employees/browse-employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SettingsComponent } from './components/settings/settings.component';
import { authenticatedGuard, roleGuard } from '../auth/guards/auth.guard';
import { InvitationsComponent } from './components/invitations/invitations.component';

const routes: Routes = [
  {
    path: 'search',
    component: BrowseEmployeesComponent,
  },
  {
    path: 'account/:id',
    component: ProfileComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [authenticatedGuard, roleGuard],
    data: { role: 'employee' },
  },
  {
    path: 'invitations',
    component: InvitationsComponent,
    canActivate: [authenticatedGuard, roleGuard],
    data: { role: 'employee' },
  },
  {
    path: '',
    redirectTo: 'search',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
