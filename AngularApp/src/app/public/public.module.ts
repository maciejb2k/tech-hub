import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NotFoundPageComponent } from '../shared/components/not-found-page/not-found-page.component';
import { PublicRoutingModule } from './public-routing.module';

@NgModule({
  declarations: [HomepageComponent, NotFoundPageComponent],
  imports: [CommonModule, PublicRoutingModule, ButtonModule, RouterModule],
})
export class PublicModule {}
