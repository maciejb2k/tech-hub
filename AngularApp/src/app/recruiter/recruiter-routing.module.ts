import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './components/profile/profile.component';
import { InvitiationsComponent } from './components/invitiations/invitiations.component';

const routes: Routes = [
  {
    path: 'account',
    component: ProfileComponent,
  },
  {
    path: 'invitations',
    component: InvitiationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecruiterRoutingModule {}
