import { Injectable } from '@angular/core';
import { map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  private titleCase = (s: string) =>
    s.replace(/^_*(.)|_+(.)/g, (s: string, c: string, d: string) =>
      c ? c.toUpperCase() : ' ' + d.toUpperCase()
    );

  mockPreferencesFields(): { [key: string]: string[] } {
    return {
      employee: ['views', 'location', 'bio', 'expected_salary', 'portfolio'],
      languages: ['name', 'proficiency'],
      educations: ['university_name', 'field_of_study', 'description', 'start_date', 'end_date'],
      skills: ['name', 'level'],
      work_experiences: ['company_name', 'position', 'description', 'start_date', 'end_date'],
    };
  }

  getPreferencesFields() {
    return of(this.mockPreferencesFields()).pipe(
      map(res => {
        const fields: any = [];

        Object.keys(res).forEach((key: string) => {
          const record: any = {
            data: {
              name: this.titleCase(key),
            },
            children: [],
          };

          res[key].forEach((field: string) => {
            record.children.push({
              data: {
                name: this.titleCase(field),
                key: `${key}.${field}`,
                visibility: 'public',
              },
            });
          });

          fields.push(record);
        });

        console.log(fields);

        return fields;
      })
    );
  }
}
