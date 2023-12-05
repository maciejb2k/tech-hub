import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import { FormService } from 'src/app/shared/services/form.service';
import { InvitationsPaginable } from '../interfaces/employee.interfaces';
import { InvitationPayload } from 'src/app/recruiter/interfaces/recruiter.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getInvitations() {
    const url = `${environment.apiBaseUrl}/invitations`;
    return this.http.get<InvitationsPaginable>(url).pipe(catchError(this.formService.handleError));
  }

  addInvitation(payload: InvitationPayload) {
    const url = `${environment.apiBaseUrl}/recruiter/invitations`;
    return this.http.post(url, payload).pipe(catchError(this.formService.handleError));
  }
}
