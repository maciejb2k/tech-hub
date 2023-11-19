import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

import {
  SkillPayload,
  EmployeeProfile,
  WorkExperiencePayload,
} from '../interfaces/employee.interfaces';
import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getEmployeeProfile(id: number) {
    const url = `http://localhost:8000/api/employees/${id}`;
    return this.http.get<EmployeeProfile>(url);
  }

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

  addWorkExperience(payload: WorkExperiencePayload) {
    const url = `http://localhost:8000/api/work-experience/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }
}
