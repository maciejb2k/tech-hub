import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
  InvitationPaginable,
  InvitationPayload,
  InvitationResponse,
} from '../interfaces/recruiter.interfaces';

import { FormService } from 'src/app/shared/services/form.service';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getInvitations() {
    const url = `${environment.apiBaseUrl}/recruiter/invitations`;
    return this.http.get<InvitationPaginable>(url).pipe(catchError(this.formService.handleError));
  }

  getInvitation(id: number) {
    const url = `${environment.apiBaseUrl}/recruiter/invitations/${id}`;
    return this.http.get<InvitationResponse>(url).pipe(catchError(this.formService.handleError));
  }

  updateInvitation(id: number, payload: InvitationPayload) {
    const url = `${environment.apiBaseUrl}/recruiter/invitations/${id}`;
    return this.http.put(url, payload).pipe(catchError(this.formService.handleError));
  }

  deleteInvitation(id: number) {
    const url = `${environment.apiBaseUrl}/recruiter/invitations/${id}`;
    return this.http.delete(url).pipe(catchError(this.formService.handleError));
  }
}
