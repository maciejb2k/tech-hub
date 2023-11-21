import { User } from 'src/app/auth/interfaces/auth.interfaces';

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
