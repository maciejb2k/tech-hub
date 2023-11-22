import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import {
  SkillPayload,
  EmployeeProfile,
  WorkExperiencePayload,
  EducationPayload,
  LanguagePayload,
  Skill,
  SkillProperties,
  WorkExperienceProperties,
  WorkExperience,
  Education,
  EducationProperties,
  LanguagesProperties,
  Languages,
  EmployeeProperties,
  Employee,
  EmployeePayload,
  UserPayload,
  PreferencesPayload,
  Preferences,
} from '../interfaces/employee.interfaces';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private formService: FormService) {}

  /* Profile */

  getEmployeeProfile(id: number) {
    const url = `http://localhost:8000/api/employees/${id}`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => this.parseProfile(res)),
      catchError(this.formService.handleError)
    );
  }

  /* Skills */

  addSkill(payload: SkillPayload) {
    const url = `http://localhost:8000/api/skill/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getSkill(id: number) {
    const url = `http://localhost:8000/api/skill/${id}`;
    return this.http.get<Skill>(url).pipe(catchError(this.formService.handleError));
  }

  updateSkill(id: number, payload: SkillPayload) {
    const url = `http://localhost:8000/api/skill/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteSkill(id: number) {
    const url = `http://localhost:8000/api/skill/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Work Experience */

  addWorkExperience(payload: WorkExperiencePayload) {
    const url = `http://localhost:8000/api/work-experience/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getWorkExperience(id: number) {
    const url = `http://localhost:8000/api/work-experience/${id}`;
    return this.http.get<WorkExperience>(url).pipe(catchError(this.formService.handleError));
  }

  updateWorkExperience(id: number, payload: WorkExperiencePayload) {
    const url = `http://localhost:8000/api/work-experience/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteWorkExperience(id: number) {
    const url = `http://localhost:8000/api/work-experience/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Education */

  addEducation(payload: EducationPayload) {
    const url = `http://localhost:8000/api/education/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getEducation(id: number) {
    const url = `http://localhost:8000/api/education/${id}`;
    return this.http.get<Education>(url).pipe(catchError(this.formService.handleError));
  }

  updateEducation(id: number, payload: EducationPayload) {
    const url = `http://localhost:8000/api/education/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteEducation(id: number) {
    const url = `http://localhost:8000/api/education/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Languages */

  addLanguage(payload: LanguagePayload) {
    const url = `http://localhost:8000/api/language/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getLanguage(id: number) {
    const url = `http://localhost:8000/api/language/${id}`;
    return this.http.get<Languages>(url).pipe(catchError(this.formService.handleError));
  }

  updateLanguage(id: number, payload: LanguagePayload) {
    const url = `http://localhost:8000/api/language/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteLanguage(id: number) {
    const url = `http://localhost:8000/api/language/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Employee */

  getEmployeeInfo(id: number) {
    const url = `http://localhost:8000/api/employees/${id}`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.employee;
      })
    );
  }

  updateEmployeeInfo(id: number, payload: EmployeePayload) {
    const url = `http://localhost:8000/api/employees/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  /* User */

  getUserInfo(id: number) {
    const url = `http://localhost:8000/api/employees/${id}`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.employee.user;
      })
    );
  }

  updateUserInfo(id: number, payload: UserPayload) {
    const url = `http://localhost:8000/api/user/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  setProfilePicture(id: number, payload: FormData) {
    const url = `http://localhost:8000/api/user/${id}/`;

    return this.http
      .post(url, payload, {
        params: new HttpParams().set('_method', 'PUT'),
      })
      .pipe(catchError(this.formService.handleError));
  }

  /* Preferences */

  addPreferences(payload: PreferencesPayload) {
    const url = `http://localhost:8000/api/preferences/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getPreferences(id: number) {
    const url = `http://localhost:8000/api/preferences/${id}`;
    return this.http.get<Preferences>(url).pipe(catchError(this.formService.handleError));
  }

  updatePreferences(id: number, payload: PreferencesPayload) {
    const url = `http://localhost:8000/api/preferences/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deletePreferences(id: number) {
    const url = `http://localhost:8000/api/preferences/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }

  /* Helpers */

  private parseProfile(response: EmployeeProfile) {
    const employeeFieldNames = Object.keys(EmployeeProperties) as (keyof Employee)[];
    const skillFieldNames = Object.keys(SkillProperties) as (keyof Skill)[];
    const workExperienceFieldNames = Object.keys(
      WorkExperienceProperties
    ) as (keyof WorkExperience)[];
    const educationFieldNames = Object.keys(EducationProperties) as (keyof Education)[];
    const languagesFieldName = Object.keys(LanguagesProperties) as (keyof Languages)[];

    this.setHiddenFields<Employee>(response.employee, employeeFieldNames);

    response.skills.forEach(item => {
      this.setHiddenFields<Skill>(item, skillFieldNames);
    });
    response.work_experiences.forEach(item => {
      this.setHiddenFields<WorkExperience>(item, workExperienceFieldNames);
    });
    response.educations.forEach(item => {
      this.setHiddenFields<Education>(item, educationFieldNames);
    });
    response.languages.forEach(item => {
      this.setHiddenFields<Languages>(item, languagesFieldName);
    });

    return response;
  }

  private setHiddenFields<T>(object: any, keys: (keyof T)[]) {
    keys.forEach(key => {
      if (!(key in object)) {
        object[key] = 'Hidden';
      }
    });
  }
}
