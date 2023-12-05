import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { FormService } from 'src/app/shared/services/form.service';
import { EmployeePaginable } from '../interfaces/employee.interfaces';

@Injectable({
  providedIn: 'root',
})
export class BrowseService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getEmployees(params: any) {
    const url = `${environment.apiBaseUrl}/employees`;

    const filteredParams = this.filterEmptyParams(params);
    let httpParams = new HttpParams();

    for (const key in filteredParams) {
      if (filteredParams.hasOwnProperty(key)) {
        httpParams = httpParams.set(key, filteredParams[key]);
      }
    }

    return this.http
      .get<EmployeePaginable>(url, { params: httpParams })
      .pipe(catchError(this.formService.handleError));
  }

  private filterEmptyParams(params: any): any {
    const filteredParams: any = {};
    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        filteredParams[key] = params[key];
      }
    }
    return filteredParams;
  }
}
