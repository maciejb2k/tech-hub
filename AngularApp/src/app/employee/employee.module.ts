import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { BrowseEmployeesComponent } from './components/browse-employees/browse-employees.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  declarations: [BrowseEmployeesComponent, ProfileComponent],
  imports: [CommonModule, EmployeeRoutingModule],
})
export class EmployeeModule {}
