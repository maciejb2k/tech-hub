import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProfile, ModalsData, ProfileSections } from '../../interfaces/employee.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  userData: EmployeeProfile;
  isEditable = false;

  modals: ProfileSections = {
    summary: false,
    skills: false,
    workExperience: false,
    education: false,
  };

  modalsData: ModalsData = {
    summary: null,
    skills: null,
    workExperience: null,
    education: null,
  };

  constructor(
    protected override loaderService: LoaderService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscriptions.push(
      this.employeeService.getEmployeeProfile(employeeId).subscribe(employeeProfile => {
        this.userData = employeeProfile;

        if (this.authService.isAuthenticated()) {
          this.authService.getUserData().subscribe(authData => {
            if (authData.id === this.userData.employee.id) {
              this.isEditable = true;
            }
          });
        }

        this.onDataLoaded();
      })
    );
  }

  openModal(modalId: string, id?: number) {
    if (!this.isEditable) {
      return;
    }

    this.modals[modalId] = true;

    if (id) {
      this.modalsData[modalId] = id;
    }
  }

  closeModal(modalId: string) {
    if (!this.isEditable) {
      return;
    }

    this.modals[modalId] = false;
    this.modalsData[modalId] = null;
  }
}
