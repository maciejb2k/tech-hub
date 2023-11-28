import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FormService } from 'src/app/shared/services/form.service';
import { Waitlist, WaitlistPaginable, WaitlistPayload } from '../interfaces/recruiter.interfaces';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getWaitlist(id?: number) {
    const url = `http://localhost:8000/api/recruiter/wait-lists`;
    const options = id ? { params: new HttpParams().set('employee_id', id) } : {};

    return this.http.get<Waitlist[]>(url, options).pipe(catchError(this.formService.handleError));
  }

  addWaitlist(payload: WaitlistPayload) {
    const url = `http://localhost:8000/api/recruiter/wait-lists`;
    return this.http.post<Waitlist>(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteWaitlist(id: number) {
    const url = `http://localhost:8000/api/recruiter/wait-lists/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }
}
