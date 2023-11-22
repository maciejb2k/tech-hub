import { Component } from '@angular/core';
import { forkJoin } from 'rxjs';

import { BaseComponent } from 'src/app/shared/components/base/base.component';
import { LoaderService } from 'src/app/shared/services/loader.service';
import { ParsedFields, SettingsService } from '../../services/settings.service';
import { PreferencesPayload } from '../../interfaces/employee.interfaces';

import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent extends BaseComponent {
  fields: TreeNode[];
  parsedFields: ParsedFields;
  selectedOptions: { [key: string]: string } = {};

  constructor(
    protected override loaderService: LoaderService,
    private settingsService: SettingsService
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
        ); // Base helper object for fields, fields state and tree view

        this.parsedFields = parsedFieldsWithData;
        this.fields = this.settingsService.getTreeNodes(fields, parsedFieldsWithData);
        this.selectedOptions = this.settingsService.getSelectedOptions(parsedFieldsWithData);
      })
    );
  }
}
