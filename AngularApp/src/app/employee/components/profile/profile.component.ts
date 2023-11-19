import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { EmployeeProfile, ModalsData, ProfileSections } from '../../interfaces/employee.interfaces';

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
    private employeeService: EmployeeService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    const employeeId = Number(this.route.snapshot.paramMap.get('id'));

    this.subscriptions.push(
      this.employeeService.getEmployeeProfile(employeeId).subscribe(value => {
        this.onDataLoaded(); // BaseComponent method to disable loader
        this.userData = value;

        if (employeeId === this.userData.employee.id) {
          this.isEditable = true;
        }
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
}
