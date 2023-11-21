import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SkeletonModule } from 'primeng/skeleton';
import { RecruiterUserModalComponent } from './components/recruiter-user-modal/recruiter-user-modal.component';
import { RecruiterModalComponent } from './components/recruiter-modal/recruiter-modal.component';

import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

@NgModule({
  declarations: [ProfileComponent, RecruiterUserModalComponent, RecruiterModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    RecruiterRoutingModule,
    SkeletonModule,
    ButtonModule,
    InputTextareaModule,
    DividerModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
})
export class RecruiterModule {}
