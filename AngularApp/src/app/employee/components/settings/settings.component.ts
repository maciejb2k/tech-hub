import { Component } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { EmployeeProfile, ModalsData, ProfileSections } from '../../interfaces/employee.interfaces';
import { SettingsService } from '../../services/settings.service';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent {
  fields!: TreeNode[];

  visibilityOptions = [
    { name: 'Public', code: 'public' },
    { name: 'Private', code: 'private' },
    { name: 'Recruiter Only', code: 'recruter-only' },
  ];

  modals: ProfileSections = {
    preferences: false,
  };

  modalsData: ModalsData = {
    preferences: null,
  };

  constructor(
    protected override loaderService: LoaderService,
    public employeeService: EmployeeService,
    public settingsService: SettingsService,
    public authService: AuthService
  ) {
    super(loaderService);

    this.subscriptions.push(
      this.settingsService.getPreferencesFields().subscribe((res: any) => {
        console.log(res);
        this.fields = res;
      })
    );
  }

  fetchData() {}

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
