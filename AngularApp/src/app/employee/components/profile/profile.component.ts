import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProfile, ProfileSections } from '../../interfaces/employee.interfaces';

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

  editSections: ProfileSections = {
    summary: false,
    skills: false,
    workExperience: false,
    education: false,
  };

  constructor(
    protected override loaderService: LoaderService,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscriptions.push(
      this.employeeService.getEmployeeProfile(employeeId).subscribe(value => {
        this.onDataLoaded();

        this.userData = value;

        if (employeeId === this.userData.employee.id) {
          this.isEditable = true;
        }
      })
    );
  }

  toggleEdit(section: string) {
    this.editSections[section] = !this.editSections[section];
  }

  openModal(modalId: string) {
    this.modals[modalId] = true;
  }

  closeModal(modalId: string) {
    this.modals[modalId] = false;
  }
}
