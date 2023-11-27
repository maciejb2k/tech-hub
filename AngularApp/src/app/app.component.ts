import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PrimeNGConfig } from 'primeng/api';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TechHub - Recruitment Platform';
  value: string;

  constructor(
    private primengConfig: PrimeNGConfig,
    private titleService: Title,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.titleService.setTitle(this.title);
    this.authService.getUserData().subscribe();
  }
}
