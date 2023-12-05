import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FormService } from 'src/app/shared/services/form.service';
import { Waitlist, WaitlistPayload } from '../interfaces/recruiter.interfaces';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getWaitlist(id?: number) {
    const url = `${environment.apiBaseUrl}/wait-lists`;
    const options = id ? { params: new HttpParams().set('employee_id', id) } : {};

    return this.http.get<Waitlist[]>(url, options).pipe(catchError(this.formService.handleError));
  }

  addWaitlist(payload: WaitlistPayload) {
    const url = `${environment.apiBaseUrl}/wait-lists`;
    return this.http.post<Waitlist>(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteWaitlist(id: number) {
    const url = `${environment.apiBaseUrl}/wait-lists/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }
}
