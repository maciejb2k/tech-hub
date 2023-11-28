import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { FormService } from 'src/app/shared/services/form.service';
import { WaitlistPaginable, WaitlistPayload } from '../interfaces/recruiter.interfaces';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WaitlistService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getWaitlist() {
    const url = `http://localhost:8000/api/recruiter/waitlists`;
    return this.http.get<WaitlistPaginable>(url).pipe(catchError(this.formService.handleError));
  }

  addWaitlist(payload: WaitlistPayload) {
    const url = `http://localhost:8000/api/recruiter/waitlists`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteWaitlist(id: number) {
    const url = `http://localhost:8000/api/recruiter/waitlists/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }
}
