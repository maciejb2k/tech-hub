import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'TechHub - Recruitment Platform';
  value: string;

  constructor(private primengConfig: PrimeNGConfig, private titleService: Title) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.titleService.setTitle(this.title);
  }
}
