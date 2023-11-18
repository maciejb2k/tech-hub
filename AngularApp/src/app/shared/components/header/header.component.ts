import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { BaseComponent } from '../base/base.component';
import { ProfileData } from 'src/app/auth/interfaces/auth.interfaces';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  userData: ProfileData;
  items: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        this.redirectToProfile();
      },
    },
    {
      label: 'Sign out',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    },
  ];

  constructor(
    protected override loaderService: LoaderService,
    public authService: AuthService,
    private router: Router
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getUserData().subscribe(value => {
        this.userData = value;
      })
    );
  }

  redirectToProfile() {
    this.router.navigate([`/employee/account/${this.userData.id}`]);
  }

  logout() {
    this.subscriptions.push(this.authService.logout().subscribe());
  }
}
