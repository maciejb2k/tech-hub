import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Preferences, PreferencesPayload } from '../interfaces/employee.interfaces';
import { TreeNode } from 'primeng/api';
import { FormService } from 'src/app/shared/services/form.service';

type Fields = { [key: string]: string[] };
export type ParsedFields = {
  [key: string]: {
    name: string;
    key: string;
    visibility: string;
    id?: number;
  };
};

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getPreferences() {
    const url = `http://localhost:8000/api/preference/`;
    return this.http.get<Preferences[]>(url).pipe(catchError(this.formService.handleError));
  }

  getPreferencesFields() {
    const url = `http://localhost:8000/api/preference/fields/`;
    return this.http.get<Fields>(url).pipe(catchError(this.formService.handleError));
  }

  addPreferences(payload: PreferencesPayload) {
    const url = `http://localhost:8000/api/preference/`;
    return this.http.post<Preferences>(url, payload).pipe(catchError(this.formService.handleError));
  }

  updatePreferences(id: number, payload: PreferencesPayload) {
    const url = `http://localhost:8000/api/preference/${id}`;
    return this.http.put<Preferences>(url, payload).pipe(catchError(this.formService.handleError));
  }

  deletePreferences(id: number) {
    const url = `http://localhost:8000/api/preference/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Parsing preferences */

  parseFields(fields: Fields) {
    const parsedFields: ParsedFields = {};

    Object.keys(fields).forEach((tableName: string) => {
      fields[tableName].forEach((field: string) => {
        const fieldName = `${tableName}.${field}`;

        parsedFields[fieldName] = {
          name: this.titleCase(field),
          key: fieldName,
          visibility: 'public',
        };
      });
    });

    return parsedFields;
  }

  updateFieldsData(preferences: Preferences[], fields: ParsedFields) {
    preferences.forEach((pref: Preferences) => {
      fields[pref.field_name].visibility = pref.visibility;
      fields[pref.field_name].id = pref.id;
    });

    return fields;
  }

  getSelectedOptions(parsedFields: ParsedFields) {
    return Object.keys(parsedFields).reduce((acc, key) => {
      acc[key] = parsedFields[key].visibility;
      return acc;
    }, {} as { [key: string]: string });
  }

  getTreeNodes(fields: Fields, parsedFields: ParsedFields) {
    const tree: TreeNode[] = [];

    Object.keys(fields).forEach((key: string) => {
      const leaf: TreeNode = {
        data: {
          name: this.titleCase(key),
        },
        children: [],
      };

      fields[key].forEach((field: string) => {
        const fieldName = `${key}.${field}`;

        leaf.children.push({
          data: {
            name: this.titleCase(field),
            key: fieldName,
            visibility: parsedFields[fieldName].visibility,
          },
        });
      });

      tree.push(leaf);
    });

    return tree;
  }

  titleCase = (s: string) =>
    s.replace(/^_*(.)|_+(.)/g, (s: string, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase()
    );
}
