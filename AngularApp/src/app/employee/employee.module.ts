import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { BrowseEmployeesComponent } from './components/browse-employees/browse-employees.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SummaryModalComponent } from './components/summary-modal/summary-modal.component';
import { SkillsModalComponent } from './components/skills-modal/skills-modal.component';
import { WorkExperienceModalComponent } from './components/work-experience-modal/work-experience-modal.component';

import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { TooltipModule } from 'primeng/tooltip';
import { SkeletonModule } from 'primeng/skeleton';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { BadgeModule } from 'primeng/badge';
import { MessagesModule } from 'primeng/messages';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { DividerModule } from 'primeng/divider';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [
    BrowseEmployeesComponent,
    ProfileComponent,
    SummaryModalComponent,
    SkillsModalComponent,
    WorkExperienceModalComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    EmployeeRoutingModule,
    ButtonModule,
    DialogModule,
    TooltipModule,
    InputTextModule,
    DividerModule,
    ReactiveFormsModule,
    SkeletonModule,
    MessagesModule,
    ToggleButtonModule,
    InputTextareaModule,
    ToastModule,
    BadgeModule,
    CalendarModule,
  ],
})
export class EmployeeModule {}
