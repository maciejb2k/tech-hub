import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';

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
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(catchError(this.formService.handleError));
  }

  /* Recruiter */

  getRecruiterInfo() {
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(
      map(res => {
        return res.recruiter;
      })
    );
  }

  updateRecruiterInfo(id: number, payload: RecruiterPayload) {
    const url = `http://localhost:8000/api/recruiter/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  /* User */

  getUserInfo() {
    const url = `http://localhost:8000/api/profile`;
    return this.http.get<RecruiterProfile>(url).pipe(
      map(res => {
        return res.recruiter.user;
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
}
