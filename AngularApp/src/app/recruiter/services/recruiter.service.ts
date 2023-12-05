import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FormService } from 'src/app/shared/services/form.service';
import {
  RecruiterPayload,
  RecruiterProfile,
  UserPayload,
} from '../interfaces/recruiter.interfaces';

@Injectable({
  providedIn: 'root',
})
export class RecruiterService {
  constructor(private http: HttpClient, private formService: FormService) {}

  /* Profile */

  getRecruiterProfile() {
    const url = `${environment.apiBaseUrl}/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(catchError(this.formService.handleError));
  }

  /* Recruiter */

  getRecruiterInfo() {
    const url = `${environment.apiBaseUrl}/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(
      map(res => {
        return res.recruiter;
      })
    );
  }

  updateRecruiterInfo(id: number, payload: RecruiterPayload) {
    const url = `${environment.apiBaseUrl}/recruiter/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  /* User */

  getUserInfo() {
    const url = `${environment.apiBaseUrl}/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(
      map(res => {
        return res.recruiter.user;
      })
    );
  }

  updateUserInfo(id: number, payload: UserPayload) {
    const url = `${environment.apiBaseUrl}/user/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  setProfilePicture(id: number, payload: FormData) {
    const url = `${environment.apiBaseUrl}/user/${id}/`;

    return this.http
      .post(url, payload, {
        params: new HttpParams().set('_method', 'PUT'),
      })
      .pipe(catchError(this.formService.handleError));
  }
}
