import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { LoaderService } from '../../services/loader.service';
import { BaseComponent } from '../base/base.component';
import { ProfileData } from 'src/app/auth/interfaces/auth.interfaces';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent extends BaseComponent {
  userData: ProfileData;
  recruiterItems: MenuItem[] = [
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

  employeeItems: MenuItem[] = [
    {
      label: 'Profile',
      icon: 'pi pi-user',
      command: () => {
        this.redirectToProfile();
      },
    },
    {
      label: 'Settings',
      icon: 'pi pi-wrench',
      command: () => {
        this.router.navigate([`/employee/settings`]);
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

  items: MenuItem[] = [];

  constructor(
    protected override loaderService: LoaderService,
    public authService: AuthService,
    private router: Router
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.subscriptions.push(
      this.authService.getUser().subscribe(value => {
        this.userData = value;

        if (this.userData?.role === 'recruiter') {
          this.items = this.recruiterItems;
        } else {
          this.items = this.employeeItems;
        }
      })
    );
  }

  redirectToProfile() {
    if (this.userData.role === 'recruiter') this.router.navigate([`/recruiter/account/`]);
    else {
      this.router.navigate([`/employee/account/${this.userData.id}`]);
    }
  }

  logout() {
    this.subscriptions.push(this.authService.logout().subscribe());
  }
}
