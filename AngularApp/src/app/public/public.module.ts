import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PublicRoutingModule } from './public-routing.module';

import { HomepageComponent } from './components/homepage/homepage.component';
import { BrowseTalentsComponent } from './components/browse-talents/browse-talents.component';
import { ContactComponent } from './components/contact/contact.component';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [HomepageComponent, BrowseTalentsComponent, ContactComponent],
  imports: [CommonModule, PublicRoutingModule, RouterModule, ButtonModule],
})
export class PublicModule {}
