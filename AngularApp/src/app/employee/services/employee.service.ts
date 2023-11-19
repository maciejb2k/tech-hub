import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import {
  SkillPayload,
  EmployeeProfile,
  WorkExperiencePayload,
  EducationPayload,
  LanguagePayload,
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
    return this.http.get<EmployeeProfile>(url);
  }

  /* Skills */

  addSkill(payload: SkillPayload) {
    const url = `http://localhost:8000/api/skill/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  getSkill(id: number) {
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.skills.find(skill => skill.id === id);
      })
    );
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
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.work_experiences.find(workExperience => workExperience.id === id);
      })
    );
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
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.educations.find(education => education.id === id);
      })
    );
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
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<EmployeeProfile>(url).pipe(
      map(res => {
        return res.languages.find(language => language.id === id);
      })
    );
  }

  updateLanguage(id: number, payload: LanguagePayload) {
    const url = `http://localhost:8000/api/language/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteLanguage(id: number) {
    const url = `http://localhost:8000/api/language/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }
}
