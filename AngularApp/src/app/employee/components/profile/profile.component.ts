import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProfile, ProfileSections } from '../../interfaces/employee.interfaces';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ProfileData } from 'src/app/auth/interfaces/auth.interfaces';
import { combineLatest, finalize } from 'rxjs';
import { WaitlistService } from 'src/app/recruiter/services/waitlist.service';
import { FormBuilder, Validators } from '@angular/forms';
import { WaitlistPayload } from 'src/app/recruiter/interfaces/recruiter.interfaces';
import { ToastService } from 'src/app/shared/services/toast.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  isEditable = false;

  waitListId: number | null;
  waitListForm = this.formBuilder.group({
    description: ['', Validators.required],
  });

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
    private waitlistService: WaitlistService,
    private authService: AuthService,
    private toastService: ToastService,
    private formBuilder: FormBuilder
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscriptions.push(
      combineLatest([
        this.employeeService.getEmployeeProfile(employeeId),
        this.authService.getUser(),
      ]).subscribe(([employeeProfile, authData]) => {
        this.userData = employeeProfile;
        this.authUserData = authData;

        if (!authData || !this.authService.isAuthenticated()) return;

        if (authData.user_id === this.userData.employee.user.id) {
          this.isEditable = true;
        }

        if (authData.role !== 'recruiter') {
          this.onDataLoaded();
          return;
        }

        this.subscriptions.push(
          this.waitlistService
            .getWaitlist(this.userData.employee.id)
            .pipe(finalize(() => this.onDataLoaded()))
            .subscribe({
              next: response => {
                console.log(response);

                if (response.length === 0) return;

                this.waitListId = response[0].id;
              },
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

  addToWaitlist() {
    if (this.waitListForm.invalid) {
      this.waitListForm.markAllAsTouched();
      return;
    }

    const formData: WaitlistPayload = {
      employee_id: this.userData.employee.id,
      description: this.waitListForm.value.description,
    };

    this.waitListForm.disable();

    this.subscriptions.push(
      this.waitlistService.addWaitlist(formData).subscribe({
        next: res => {
          this.waitListForm.enable();
          this.waitListForm.reset();

          this.waitListId = res.id;

          this.toastService.add({
            severity: 'success',
            summary: 'Success',
            detail: "You've successfully added a user to the waitlist.",
          });
        },
        error: error => {
          this.waitListForm.enable();
          this.toastService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.message,
          });
        },
      })
    );
  }

  removeFromWaitlist() {
    this.subscriptions.push(
      this.waitlistService.deleteWaitlist(this.waitListId).subscribe({
        next: () => {
          this.waitListId = null;
          this.toastService.add({
            severity: 'success',
            summary: 'Success',
            detail: "You've successfully removed a user from the waitlist.",
          });
        },
      })
    );
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

  get description() {
    return this.waitListForm.get('description');
  }
}
