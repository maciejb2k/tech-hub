import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { InvitiationsComponent } from './components/invitiations/invitiations.component';
import { WaitlistComponent } from './components/waitlist/waitlist.component';

const routes: Routes = [
  {
    path: 'account',
    component: ProfileComponent,
  },
  {
    path: 'invitations',
    component: InvitiationsComponent,
  },
  {
    path: 'wait-lists',
    component: WaitlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
