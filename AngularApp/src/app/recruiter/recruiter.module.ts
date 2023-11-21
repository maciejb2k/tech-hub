import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ProfileComponent } from './components/profile/profile.component';
import { SkeletonModule } from 'primeng/skeleton';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { RecruiterModalComponent } from './components/recruiter-modal/recruiter-modal.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [ProfileComponent, UserModalComponent, RecruiterModalComponent],
  imports: [CommonModule, RecruiterRoutingModule, SkeletonModule, ButtonModule],
})
export class RecruiterModule {}
