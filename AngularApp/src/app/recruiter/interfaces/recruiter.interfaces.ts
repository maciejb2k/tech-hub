import { User } from 'src/app/auth/interfaces/auth.interfaces';
import { Employee } from 'src/app/employee/interfaces/employee.interfaces';

export interface UserPayload {
  first_name: string;
  last_name: string;
}

export interface Recruiter {
  id: number;
  company_name: string;
  company_url: string;
  company_description: string;
  position: string;
  user: User;
}

export interface RecruiterProfile {
  recruiter: Recruiter;
}

export interface RecruiterPayload {
  company_name: string;
  company_url: string;
  company_description: string;
  position: string;
}

export interface Paginable<T> {
  data: T[];
  links: {
    self: string;
    next: string | null;
    prev: string | null;
  };
  meta: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Invitation {
  id: number;
  employee: Employee;
  recruiter: Recruiter;
  status: string;
  message: string;
  created_at: string;
  updated_at: string;
}

export interface InvitationPaginable extends Paginable<Invitation> {}

export interface InvitationPayload {
  message: string;
  status: string;
}

export interface InvitationResponse {
  data: Invitation;
}
