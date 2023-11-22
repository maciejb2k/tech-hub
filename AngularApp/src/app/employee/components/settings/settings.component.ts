import { Component, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { EmployeeService } from '../../services/employee.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import {
  EmployeeProfile,
  ModalsData,
  Preferences,
  PreferencesPayload,
  ProfileSections,
} from '../../interfaces/employee.interfaces';
import { ParsedFields, SettingsService } from '../../services/settings.service';
import { TreeNode } from 'primeng/api';
import { forkJoin, tap } from 'rxjs';
import { DropdownChangeEvent } from 'primeng/dropdown';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent {
  visibilityOptions = [
    { name: 'Public', key: 'public' },
    { name: 'Private', key: 'private' },
    { name: 'Recruter-Only', key: 'recruter-only' },
  ];

  modals: ProfileSections = {
    preferences: false,
  };

  modalsData: ModalsData = {
    preferences: null,
  };

  fields: TreeNode[];
  parsedFields: ParsedFields;
  selectedOptions: { [key: string]: string } = {};

  constructor(
    protected override loaderService: LoaderService,
    public employeeService: EmployeeService,
    public settingsService: SettingsService,
    public authService: AuthService
  ) {
    super(loaderService);
  }

  ngOnInit() {
    this.fetchData();
  }

  onSettingsChange(key: string, visibility: string) {
    const payload: PreferencesPayload = {
      field_name: this.parsedFields[key].key,
      visibility,
    };

    if (this.parsedFields[key].id) {
      this.settingsService.updatePreferences(this.parsedFields[key].id, payload).subscribe(() => {
        this.parsedFields[key] = {
          ...this.parsedFields[key],
          visibility,
        };
        this.selectedOptions[key] = visibility;
      });

      return;
    }

    this.settingsService.addPreferences(payload).subscribe(res => {
      this.parsedFields[key] = {
        ...this.parsedFields[key],
        id: res.id,
      };
      this.selectedOptions[key] = visibility;
    });
  }

  fetchData() {
    this.subscriptions.push(
      forkJoin([
        this.settingsService.getPreferences(),
        this.settingsService.getPreferencesFields(),
      ]).subscribe(([preferences, fields]) => {
        const parsedFields = this.settingsService.parseFields(fields);
        const parsedFieldsWithData = this.settingsService.updateFieldsData(
          preferences,
          parsedFields
        ); // Helper object for further use

        this.parsedFields = parsedFieldsWithData;
        this.fields = this.settingsService.getTreeNodes(fields, parsedFieldsWithData);
        this.selectedOptions = this.settingsService.getSelectedOptions(parsedFieldsWithData);
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
