import { Component } from '@angular/core';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { RecruiterService } from '../../services/recruiter.service';
import { RecruiterProfile } from '../../interfaces/recruiter.interfaces';
import { ModalsData, ProfileSections } from 'src/app/employee/interfaces/employee.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent extends BaseComponent {
  userData: RecruiterProfile;

  modals: ProfileSections = {
    user: false,
    recruiter: false,
  };

  modalsData: ModalsData = {
    user: null,
    recruiter: null,
  };

  constructor(
    protected override loaderService: LoaderService,
    private recruiterService: RecruiterService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.subscriptions.push(
      this.recruiterService.getRecruiterProfile().subscribe(profile => {
        this.userData = profile;
        this.onDataLoaded();
      })
    );
  }

  openModal(modalId: string, id?: number) {
    this.modals[modalId] = true;

    if (id) {
      this.modalsData[modalId] = id;
    }
  }

  closeModal(modalId: string) {
    this.modals[modalId] = false;
    this.modalsData[modalId] = null;
  }

  addToWaitlist() {}

  handleProfilePictureClick() {
    document.getElementById('uploader').click();
  }

  deleteProfilePicture() {
    const formData: FormData = new FormData();
    formData.append('avatar', '');

    this.recruiterService.setProfilePicture(this.userData.recruiter.user.id, formData).subscribe({
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

      this.recruiterService.setProfilePicture(this.userData.recruiter.user.id, formData).subscribe({
        next: () => {
          this.fetchData();
        },
      });
    }
  }
}
