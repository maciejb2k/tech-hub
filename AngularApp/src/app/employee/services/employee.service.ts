import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';

import { AddSkillPayload, EmployeeProfile } from '../interfaces/employee.interfaces';
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

  addNewSkill(payload: AddSkillPayload) {
    const url = `http://localhost:8000/api/skill/`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }
}
