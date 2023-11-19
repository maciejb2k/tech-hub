export interface ErrorResponse {
  message: string;
  errors?: {
    [key: string]: string[];
  };
}

export interface EmployeeRegistrationForm {
  first_name: string;
  last_name: string;
  password: string;
  repeat_password: string;
}

export interface RecruiterRegistrationForm extends EmployeeRegistrationForm {
  company_name: string;
  company_url: string;
}

export interface LoginForm {
  email: string;
  password: string;
}

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  role: {
    id: number;
    name: string;
  };
};

export interface AuthResponse {
  token: string;
  user_details: {
    user: User;
  };
}

export interface UserData extends AuthResponse {}

type Roles = 'employee' | 'recruiter';

export type ProfileResponse = {
  [key in Roles]: {
    id: number;
    user: User;
  };
};

export interface ProfileData {
  id: number;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}
