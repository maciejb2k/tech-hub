import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProfile, ModalsData, ProfileSections } from '../../interfaces/employee.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileData } from 'src/app/auth/interfaces/auth.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  isEditable = false;

  userData: EmployeeProfile;
  authUserData: ProfileData;

  modals: ProfileSections = {
    user: false,
    summary: false,
    skills: false,
    workExperience: false,
    education: false,
    invitation: false,
  };

  modalsData: any = {
    user: null,
    summary: null,
    skills: null,
    workExperience: null,
    education: null,
    invitation: null,
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

        if (!this.authService.isAuthenticated()) {
          this.onDataLoaded();
          return;
        }

        this.subscriptions.push(
          this.authService.getUser().subscribe(authData => {
            if (!authData) {
              return;
            }

            this.authUserData = authData;

            if (authData.user_id === this.userData.employee.user.id) {
              this.isEditable = true;
            }

            this.onDataLoaded();
          })
        );
      })
    );
  }

  openModal(modalId: string, data?: any) {
    this.modals[modalId] = true;

    if (data) {
      this.modalsData[modalId] = data;
    }
  }

  closeModal(modalId: string) {
    this.modals[modalId] = false;
    this.modalsData[modalId] = null;
  }

  handleProfilePictureClick() {
    if (!this.isEditable) {
      return;
    }

    document.getElementById('uploader').click();
  }

  deleteProfilePicture() {
    const formData: FormData = new FormData();
    formData.append('avatar', '');

    this.employeeService.setProfilePicture(this.userData.employee.user.id, formData).subscribe({
      next: () => {
        this.fetchData();
      },
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files[0]) {
      const formData = new FormData();
      formData.set('avatar', input.files[0]);

      this.employeeService.setProfilePicture(this.userData.employee.user.id, formData).subscribe({
        next: () => {
          this.fetchData();
        },
      });
    }
  }
}
