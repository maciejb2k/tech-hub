import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { BrowseEmployeesComponent } from './components/browse-employees/browse-employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SkillsModalComponent } from './components/skills-modal/skills-modal.component';

@NgModule({
  declarations: [BrowseEmployeesComponent, ProfileComponent, SummaryModalComponent, SkillsModalComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    ReactiveFormsModule,
  ],
})
export class EmployeeModule {}
