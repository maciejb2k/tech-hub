import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';

import { FormService } from 'src/app/shared/services/form.service';
import { RecruiterProfile } from '../interfaces/recruiter.interfaces';

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
}
