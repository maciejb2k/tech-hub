import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { FormService } from 'src/app/shared/services/form.service';
import { InvitationsPaginable } from '../interfaces/employee.interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvitationsService {
  constructor(private http: HttpClient, private formService: FormService) {}

  getInvitations() {
    const url = 'http://localhost:8000/api/invitations';
    return this.http.get<InvitationsPaginable>(url).pipe(catchError(this.formService.handleError));
  }
}